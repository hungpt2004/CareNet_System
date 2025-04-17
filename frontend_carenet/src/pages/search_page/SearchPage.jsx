"use client"

import { useState, useEffect, use } from "react"
import { Container, Row, Col, Form, Button, Card, Dropdown, InputGroup, Badge, FormCheck, Spinner, Alert } from "react-bootstrap"
import { Search, Calendar, MapPin, Filter, ArrowUpDown, Users } from "lucide-react"
import CustomNavbar from "../../components/navbar/CustomNavbar"
import MapComponent from "../../components/map/MapComponent"
import { Footer } from "../../components/footer/Footer"
import { formatDateVN } from "../../utils/FormatDateVN"
import { useNavigate } from "react-router-dom"
import styles from '../../css/AppColors.module.css'
import useAuthStore from "../../hooks/authStore"
import { BsStarFill, BsStar } from 'react-icons/bs';
import { Sparkles } from "lucide-react"
import searchStyles from '../../css/SearchPage.module.css'
import EventCard from "../../components/component_page/card/EventCard"
import axiosInstance from "../../utils/AxiosInstance"
import { CustomFailedToast, CustomSuccessToast } from "../../components/toast/CustomToast"
import EventCardSlider from "../../components/component_page/card/EventCardSlider"
import CareNetLoading from "../../components/loading/CareNetLoading"

// Custom CSS variables for the color scheme
const customStyles = {
  primaryColor: "#5DB996",
  secondaryColor: "#FBF6E9",
}

// Mock data for demonstration
const categories = [
  "Giáo dục",
  "Môi trường",
  "Y tế",
  "Động vật",
  "Cộng đồng",
  "Cứu trợ thiên tai",
  "Nghệ thuật & Văn hóa",
  "Thể thao",
]

const mockEvents = [
  {
    id: 1,
    name: "Chiến dịch dọn dẹp bãi biển",
    location: "Công viên bãi biển Coastal",
    startDate: "2025-04-15",
    endDate: "2025-04-15",
    category: "Môi trường",
    description: "Tham gia cùng chúng tôi để dọn dẹp bãi biển, bảo vệ sinh vật biển và giữ cho bãi biển luôn đẹp.",
    organizer: "Nhóm Bảo tồn Đại dương",
    participants: 45,
    coordinates: { lat: 10.762622, lng: 106.660172 },
  },
  {
    id: 2,
    name: "Dạy kỹ năng máy tính",
    location: "Trung tâm cộng đồng",
    startDate: "2025-04-20",
    endDate: "2025-05-20",
    category: "Giáo dục",
    description: "Hỗ trợ người lớn tuổi và thanh thiếu niên khó khăn học các kỹ năng máy tính cơ bản.",
    organizer: "Tổ chức Học vấn Số",
    participants: 12,
    coordinates: { lat: 10.772622, lng: 106.670172 },
  },
  {
    id: 3,
    name: "Hỗ trợ ngân hàng thực phẩm",
    location: "Ngân hàng thực phẩm trung tâm",
    startDate: "2025-04-10",
    endDate: "2025-04-30",
    category: "Cộng đồng",
    description: "Giúp phân loại và phân phát thực phẩm cho các gia đình có hoàn cảnh khó khăn trong thành phố.",
    organizer: "Mạng lưới Thực phẩm Thành phố",
    participants: 30,
    coordinates: { lat: 10.782622, lng: 106.650172 },
  },
  {
    id: 4,
    name: "Trồng cây xanh trong công viên",
    location: "Công viên Rừng Đô thị",
    startDate: "2025-05-01",
    endDate: "2025-05-02",
    category: "Môi trường",
    description: "Hãy cùng chúng tôi tăng cường không gian xanh đô thị bằng cách trồng cây bản địa trong công viên.",
    organizer: "Sáng kiến Thành phố Xanh",
    participants: 60,
    coordinates: { lat: 10.752622, lng: 106.680172 },
  },
  {
    id: 5,
    name: "Chương trình tình nguyện tại bệnh viện",
    location: "Bệnh viện Đa khoa",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    category: "Y tế",
    description: "Mang lại sự an ủi và hỗ trợ cho bệnh nhân và nhân viên bệnh viện.",
    organizer: "Hiệp hội Tình nguyện Y tế",
    participants: 25,
    coordinates: { lat: 10.792622, lng: 106.690172 },
  },
]

export default function VolunteerEventSearch() {

  // Current user
  const { currentUser } = useAuthStore();

  // State for search filters
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    category: "",
  })

  const navigate = useNavigate();

  // State for events and filtered events
  const [events, setEvents] = useState(mockEvents)
  const [filteredEvents, setFilteredEvents] = useState(mockEvents)
  const [aiFilterEvents, setAiFilterEvents] = useState([]);
  const [aiFilterShowed, setAiFilterShowed] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // API request event from AI
  const geminiSuggestionRequest = async () => {
    setAiLoading(true)
    setAiFilterShowed(true);
    try {
      const response = await axiosInstance.get('/search/ai-search');
      if (response.status && response.data.matchedEvents) {
        setAiFilterEvents(response.data.matchedEvents);
        CustomSuccessToast(response.data.message);
      }
    } catch (error) {
      CustomFailedToast(error.response.data.message);
    } finally {
      setTimeout(() => {
        setAiLoading(false);
      }, 10000);
    }
  }

  console.log(aiFilterEvents.length)

  // State for sort option
  const [sortOption, setSortOption] = useState("startDate")

  // State for selected map area (simplified for demo)
  const [mapArea, setMapArea] = useState(null)

  // State for loading
  const [isLoading, setIsLoading] = useState(false)

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchFilters({
      ...searchFilters,
      [name]: value,
    })
  }

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault()
    filterEvents()
  }

  // Filter events based on search criteria
  const filterEvents = () => {
    setIsLoading(true) // Bắt đầu loading

    setTimeout(() => { // Giả lập thời gian xử lý
      const filtered = events.filter((event) => {
        // Filter by name
        if (searchFilters.name && !event.name.toLowerCase().includes(searchFilters.name.toLowerCase())) {
          return false
        }

        // Filter by location
        if (searchFilters.location && !event.location.toLowerCase().includes(searchFilters.location.toLowerCase())) {
          return false
        }

        // Filter by start date
        if (searchFilters.startDate && new Date(event.startDate) < new Date(searchFilters.startDate)) {
          return false
        }

        // Filter by end date
        if (searchFilters.endDate && new Date(event.endDate) > new Date(searchFilters.endDate)) {
          return false
        }

        // Filter by category
        if (searchFilters.category && event.category !== searchFilters.category) {
          return false
        }

        // Filter by map area (simplified)
        if (mapArea) {
          // In a real implementation, check if event coordinates are within the map bounds
          // This is just a placeholder
          return true
        }

        return true
      })

      // Sort the filtered events
      sortEvents(filtered, sortOption)
      setIsLoading(false) // Kết thúc loading
    }, 1000) // Giả lập trễ 1 giây (tùy chỉnh)
  }

  // Sort events based on selected option
  const sortEvents = (eventsToSort = filteredEvents, option = sortOption) => {
    const sorted = [...eventsToSort]

    switch (option) {
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "startDate":
        sorted.sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
        break
      case "endDate":
        sorted.sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
        break
      case "participants":
        sorted.sort((a, b) => b.participants - a.participants)
        break
      default:
        break
    }

    setFilteredEvents(sorted)
    setSortOption(option)
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchFilters({
      name: "",
      location: "",
      startDate: "",
      endDate: "",
      category: "",
    })
    setFilteredEvents(events)
    setSortOption("startDate")
  }

  const handleGoToDetail = () => {
    navigate('/event-detail');
  }

  const handleNavigate = (path, eventId) => {
    console.log(`Navigating to ${path} for event ${eventId}`)
    // In a real app with React Router, you would use:
    // navigate(path, { state: { eventId } })
  }

  // Effect to filter events when search filters change
  useEffect(() => {
    filterEvents()
  }, [sortOption, mapArea])

  return (
    <>
      <Container fluid className={`py-4 p-5 mt-4`}>

        {/* AI gợi ý */}
        {
          aiFilterShowed ? (aiLoading ? (
            <CareNetLoading />
          ) : aiFilterEvents.length > 0 ? (
            <EventCardSlider
              events={aiFilterEvents}
              title="Sự kiện được gợi ý bởi AI CareNet"
              subtitle="Khám phá các sự kiện phù hợp với bạn"
              customStyles={customStyles}
              currentUser={currentUser}
              onNavigate={handleNavigate}
            />
          ) : (
            <div className="text-center p-5 rounded" style={{ backgroundColor: "white" }}>
                <Filter size={48} className="mb-3 text-muted" />
                <h4>Không sự kiện phù hợp nào được tìm thấy</h4>
                <p className="text-muted">Hãy thử tìm kiếm theo những tiêu chí khác</p>
                <Button
                  onClick={resetFilters}
                  style={{
                    backgroundColor: customStyles.primaryColor,
                    borderColor: customStyles.primaryColor,
                  }}
                >
                  Reset tìm kiếm
                </Button>
              </div>
          ))
          : null
        }

        {/* Search Form */}
        <form onSubmit={handleSearch} className={searchStyles.searchForm}>
          <div className={searchStyles.formGrid}>
            <div className={searchStyles.inputGroup}>
              <div className={searchStyles.iconWrapper}>
                <Search className={searchStyles.icon} />
              </div>
              <input
                type="text"
                name="name"
                value={searchFilters.name}
                onChange={handleInputChange}
                placeholder="Tên sự kiện"
                className={searchStyles.input}
              />
            </div>

            <div className={searchStyles.inputGroup}>
              <div className={searchStyles.iconWrapper}>
                <MapPin className={searchStyles.icon} />
              </div>
              <input
                type="text"
                name="location"
                value={searchFilters.location}
                onChange={handleInputChange}
                placeholder="Địa điểm"
                className={searchStyles.input}
              />
            </div>

            <div className={searchStyles.selectGroup}>
              <div className={searchStyles.iconWrapper}>
                <Filter className={searchStyles.icon} />
              </div>
              <select name="category" value={searchFilters.category} onChange={handleInputChange} className={searchStyles.select}>
                <option value="">Tất cả các lĩnh vực</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className={searchStyles.inputGroup}>
              <div className={searchStyles.iconWrapper}>
                <Calendar className={searchStyles.icon} />
              </div>
              <input
                type="date"
                name="startDate"
                value={searchFilters.startDate}
                onChange={handleInputChange}
                placeholder="Ngày bắt đầu"
                className={searchStyles.input}
              />
            </div>

            <div className={searchStyles.inputGroup}>
              <div className={searchStyles.iconWrapper}>
                <Calendar className={searchStyles.icon} />
              </div>
              <input
                type="date"
                name="endDate"
                value={searchFilters.endDate}
                onChange={handleInputChange}
                placeholder="Ngày kết thúc"
                className={searchStyles.input}
              />
            </div>

            <div className={searchStyles.buttonGroup}>
              <button type="submit" className={searchStyles.searchButton}>
                <Search className={searchStyles.buttonIcon} />
                Tìm kiếm sự kiện
              </button>
            </div>

            <div className={searchStyles.buttonGroup}>
              <button type="button" className={searchStyles.aiButton} onClick={() => geminiSuggestionRequest()}>
                <Sparkles className={searchStyles.buttonIcon} />
                CareNet tìm giúp
              </button>
            </div>
          </div>
        </form>

        <Row>
          {/* Map Filter (Left Side) */}
          <Col lg={3} className="mb-4">
            <Card className="">

              <Card.Body className="p-0">
                {/* Placeholder for map - in a real implementation, you would integrate a map library here */}
                <div>
                  <MapComponent />
                  {/* Simplified map markers for demonstration */}
                  {filteredEvents.map((event, index) => (
                    <div
                      key={index}
                      className="position-absolute rounded-circle"
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: customStyles.primaryColor,
                        left: `${(event.coordinates.lng - 106.65) * 500}px`,
                        top: `${(10.8 - event.coordinates.lat) * 500}px`,
                        cursor: "pointer",
                      }}
                      title={event.name}
                    />
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Rating */}
            <Card className="mt-3 shadow">
              <Card.Header className="text-center fw-bold fs-5">Tìm kiếm theo đánh giá</Card.Header>
              <Card.Body>
                {/* 5 sao */}
                <FormCheck
                  type="radio"
                  id="rating-5"
                  label={
                    <span>
                      {[...Array(5)].map((_, i) => (
                        <BsStarFill key={i} color="#ffc107" />
                      ))}
                      <span> (5.0)</span>
                    </span>
                  }
                />

                {/* 4 sao trở lên */}
                <FormCheck
                  type="radio"
                  id="rating-4"
                  label={
                    <span>
                      {[...Array(4)].map((_, i) => (
                        <BsStarFill key={i} color="#ffc107" />
                      ))}
                      <span><BsStar color="#ccc" /> (4.0 trở lên)</span>
                    </span>
                  }
                />

                {/* 3 sao trở lên */}
                <FormCheck
                  type="radio"
                  id="rating-3"
                  label={
                    <span>
                      {[...Array(3)].map((_, i) => (
                        <BsStarFill key={i} color="#ffc107" />
                      ))}
                      {[...Array(2)].map((_, i) => (
                        <BsStar key={i} color="#ccc" />
                      ))}
                      <span> (3.0 trở lên)</span>
                    </span>
                  }
                />

                {/* 2 sao trở lên */}
                <FormCheck
                  type="radio"
                  id="rating-2"
                  label={
                    <span>
                      {[...Array(2)].map((_, i) => (
                        <BsStarFill key={i} color="#ffc107" />
                      ))}
                      {[...Array(3)].map((_, i) => (
                        <BsStar key={i} color="#ccc" />
                      ))}
                      <span> (2.0 trở lên)</span>
                    </span>
                  }
                />

                <FormCheck
                  type="radio"
                  id="rating-1"
                  label={
                    <span>
                      {[...Array(1)].map((_, i) => (
                        <BsStarFill key={i} color="#ffc107" />
                      ))}
                      {[...Array(4)].map((_, i) => (
                        <BsStar key={i} color="#ccc" />
                      ))}
                      <span> (1.0 trở lên)</span>
                    </span>
                  }
                />
              </Card.Body>
            </Card>


            {/* Position */}
            <Card className="mt-3 shadow">
              <Card.Header className="text-center fw-bold fs-5">Vị trí bạn muốn </Card.Header>
              <Card.Body>
                <FormCheck // prettier-ignore
                  id={`default`}
                  label={`Đầu bếp`}
                />
                <FormCheck // prettier-ignore
                  id={`default`}
                  label={`Ban Hậu cần`}
                />
                <FormCheck // prettier-ignore
                  id={`default`}
                  label={`Người Hướng dẫn`}
                />
                <FormCheck // prettier-ignore
                  id={`default`}
                  label={`Đầu bếp`}
                />

              </Card.Body>
            </Card>

            {/* AI gợi ý */}

          </Col>

          {/* Event Results (Right Side) */}
          <Col lg={9}>
            {/* Sort Options */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="mb-0">
                <strong>{filteredEvents.length}</strong> sự kiện phù hợp đã tìm thấy
              </p>

              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-sort"
                  style={{ borderColor: customStyles.primaryColor, color: customStyles.primaryColor }}
                >
                  <ArrowUpDown size={16} className="me-2" />
                  Sắp xếp theo:{" "}
                  {sortOption === "name"
                    ? "Name"
                    : sortOption === "startDate"
                      ? "Start Date"
                      : sortOption === "endDate"
                        ? "End Date"
                        : "Popularity"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => sortEvents(undefined, "name")}>Tên</Dropdown.Item>
                  <Dropdown.Item onClick={() => sortEvents(undefined, "startDate")}>Ngày bắt đầu</Dropdown.Item>
                  <Dropdown.Item onClick={() => sortEvents(undefined, "endDate")}>Ngày kết thúc</Dropdown.Item>
                  <Dropdown.Item onClick={() => sortEvents(undefined, "participants")}>Độ phổ biến</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Event Cards */}
            {isLoading ? (
              <div className="text-center">
                <Spinner animation="border" color="primary" size="sm" role="status" />
              </div>
            ) : (filteredEvents.length > 0 ? (
              <div className="d-grid gap-3">
                {filteredEvents.map((event) => (
                  <EventCard
                    event={event}
                    currentUser={currentUser}
                    customStyles={customStyles}
                    formatDateVN={formatDateVN}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center p-5 rounded" style={{ backgroundColor: "white" }}>
                <Filter size={48} className="mb-3 text-muted" />
                <h4>Không sự kiện phù hợp nào được tìm thấy</h4>
                <p className="text-muted">Hãy thử tìm kiếm theo những tiêu chí khác</p>
                <Button
                  onClick={resetFilters}
                  style={{
                    backgroundColor: customStyles.primaryColor,
                    borderColor: customStyles.primaryColor,
                  }}
                >
                  Reset tìm kiếm
                </Button>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  )
}

