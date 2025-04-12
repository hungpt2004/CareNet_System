"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Form, Button, Card, Dropdown, InputGroup, Badge, FormCheck, Spinner, Alert } from "react-bootstrap"
import { Search, Calendar, MapPin, Filter, ArrowUpDown, Users } from "lucide-react"
import CustomNavbar from "../../components/navbar/CustomNavbar"
import MapComponent from "../../components/map/MapComponent"
import { Footer } from "../../components/footer/Footer"
import { formatDateVN } from "../../utils/FormatDateVN"
import { useNavigate } from "react-router-dom"
import styles from '../../css/AppColors.module.css'
import useAuthStore from "../../hooks/authStore"

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
  const {currentUser} = useAuthStore();

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

  // Effect to filter events when search filters change
  useEffect(() => {
    filterEvents()
  }, [sortOption, mapArea])


  return (
    <>
      <Container fluid className={`py-4 p-5 mt-4`}>
        <h1 className="mb-4 text-center" style={{ color: customStyles.primaryColor }}>
          Tìm kiếm dịch vụ thiện nguyện
        </h1>

        {/* Search Form */}
        <Form onSubmit={handleSearch} className="mb-4 border-bottom-1 rounded shadow-sm" style={{ backgroundColor: "white" }}>
          <Row className="g-3">
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <Search size={16} />
                </InputGroup.Text>
                <Form.Control
                  name="name"
                  value={searchFilters.name}
                  onChange={handleInputChange}
                  placeholder="Event name"
                />
              </InputGroup>
            </Col>

            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>
                  <MapPin size={16} />
                </InputGroup.Text>
                <Form.Control
                  name="location"
                  value={searchFilters.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                />
              </InputGroup>
            </Col>

            <Col md={4}>
              <Form.Select name="category" value={searchFilters.category} onChange={handleInputChange}>
                <option value="">Tất cả các lĩnh vực</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Col>

            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>
                  <Calendar size={16} />
                </InputGroup.Text>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={searchFilters.startDate}
                  onChange={handleInputChange}
                  placeholder="Start Date"
                />
              </InputGroup>
            </Col>

            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>
                  <Calendar size={16} />
                </InputGroup.Text>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={searchFilters.endDate}
                  onChange={handleInputChange}
                  placeholder="End Date"
                />
              </InputGroup>
            </Col>

            <Col md={6} className="d-flex gap-2">
              <Button
                type="submit"
                className="flex-grow-1"
                style={{
                  backgroundColor: customStyles.primaryColor,
                  borderColor: customStyles.primaryColor,
                }}
              >
                Tìm kiếm sự kiện
              </Button>
              <Button variant="outline-secondary" onClick={resetFilters}>
                Tải lại
              </Button>
            </Col>
          </Row>
        </Form>

        <Row>
          {/* Map Filter (Left Side) */}
          <Col lg={3} className="mb-4">
            <Card className="">
              <Card.Header style={{ backgroundColor: customStyles.primaryColor, color: "white" }}>
                <h5 className="text-center mb-0">Chọn từ Map</h5>
              </Card.Header>
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

            {/* Position */}
            <Card className="mt-3">
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
                  <Card key={event.id} className="hover-shadow shadow mb-2 bg-white rounded" style={{ borderColor: "#e0e0e0" }}>
                    <Card.Header className={`${styles.backgroundPrimary}`}></Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={8}>
                          <h5 className="card-title">{event.name}</h5>
                          <h6 className="text-muted mb-2">
                            <MapPin size={16} className="me-1" />
                            {event.location}
                          </h6>
                          <p className="mb-2">{event.description}</p>
                          <p className="mb-2 text-muted">Được tổ chức bởi: {event.organizer}</p>
                          <Badge
                            className="me-2"
                            style={{
                              backgroundColor: customStyles.primaryColor,
                              color: "white",
                            }}
                          >
                            {event.category}
                          </Badge>
                        </Col>
                        <Col md={4} className="border-start">
                          <div className="d-flex flex-column h-100 justify-content-between">
                            <div>
                              <div className="d-flex align-items-center mb-2">
                                <Calendar size={16} className="me-2" style={{ color: customStyles.primaryColor }} />
                                <div>
                                  <div>
                                    <strong>Bắt đầu:</strong> {formatDateVN(event.startDate)}
                                  </div>
                                  <div>
                                    <strong>Kết thúc:</strong> {formatDateVN(event.endDate)}
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex align-items-center mb-3">
                                <Users size={16} className="me-2" style={{ color: customStyles.primaryColor }} />
                                <div>{event.participants} thành viên</div>
                              </div>
                            </div>
                            {currentUser ? <Button
                              className="button w-100"
                              onClick={() => handleGoToDetail()}
                              style={{
                                backgroundColor: "white",
                                color: customStyles.primaryColor,
                                borderColor: customStyles.primaryColor,
                              }}
                            >
                              Xem thông tin
                            </Button> : <Alert className="text-center alert alert-warning">Vui lòng đăng nhập</Alert>}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
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

