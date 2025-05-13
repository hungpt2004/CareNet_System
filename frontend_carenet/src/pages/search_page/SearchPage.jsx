"use client"

import { useState, useEffect, use, useRef } from "react"
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
import { CustomFailedToast, CustomSuccessToast, CustomToast } from "../../components/toast/CustomToast"
import EventCardSlider from "../../components/component_page/card/EventCardSlider"
import CareNetLoading from "../../components/loading/CareNetLoading"
import axios from "axios"
import CustomSpinner from "../../components/spinner/CustomSpinner"

// Custom CSS variables for the color scheme
const customStyles = {
  primaryColor: "#5DB996",
  secondaryColor: "#FBF6E9",
}

const locationApi = axios.create({
  baseURL: 'https://provinces.open-api.vn/api/',
  timeout: 5000
})

export default function VolunteerEventSearch() {

  // Current user
  const { currentUser } = useAuthStore();

  // State for search filters
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    province: "",
    provinceName: "",
    district: "",
    districtName: "",
    ward: "",
    wardName: "",
    startDate: "",
    endDate: "",
    category: "",
  })

  // State for events and filtered events
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [aiFilterEvents, setAiFilterEvents] = useState([]);
  const [aiFilterShowed, setAiFilterShowed] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [searchRating, setSearchRating] = useState(0);

  // Use Ref
  const searchFilterRef = useRef(searchFilters);

  // Location 
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])

  // Category
  const [categories, setCategories] = useState([])

  console.log(categories.length)

  // Get category in select
  const getAllCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search/all-category`);
      if (response.data && response.data.mapCategory) {
        setCategories(response.data.mapCategory);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }
  // API get location in VN
  const fetchProvinces = async () => {
    try {
      const response = await locationApi.get('p/')
      setProvinces(response.data)
    } catch (error) {
      console.error('Error fetching provinces:', error)
    }
  }

  const fetchDistricts = async (provinceCode) => {
    try {
      const response = await locationApi.get(`p/${provinceCode}?depth=2`)
      setDistricts(response.data.districts || [])
    } catch (error) {
      console.error('Error fetching districts:', error)
    }
  }

  const fetchWards = async (districtCode) => {
    try {
      const response = await locationApi.get(`d/${districtCode}?depth=2`)
      setWards(response.data.wards || [])
    } catch (error) {
      console.error('Error fetching wards:', error)
    }
  }

  // Get name location
  const extractLocationName = (fullName) => {
    return fullName
      .replace(/^Tỉnh\s*/i, '')
      .replace(/^Thành phố\s*/i, '')
      .replace(/^Quận\s*/i, '')
      .replace(/^Huyện\s*/i, '')
      .replace(/^Phường\s*/i, '')
      .replace(/^Xã\s*/i, '')
      .trim();
  }

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

  const handleSearchByRating = async () => {
    // Kiểm tra nếu searchRating là 0 (chưa chọn mức đánh giá)
    if (searchRating === 0) {
      // Không làm gì khi searchRating là 0, tránh gửi yêu cầu không cần thiết
      return;
    }
  
    try {
      setIsLoading(true);
      setFilteredEvents([]);
  
      const response = await axios.get(`http://localhost:5000/search/rating-search`, {
        params: { rating: searchRating } // Gửi rating như một tham số rõ ràng
      });
  
      if (response.data.status === 'success' && response.data.mapEvents) {
        setFilteredEvents(response.data.mapEvents);
        if (response.data.mapEvents.length === 0) {
          console.log("Không tìm thấy sự kiện phù hợp với mức đánh giá này!");
        } else {
          console.log(response.data.message);
        }
      } else {
        setFilteredEvents([]);
        CustomFailedToast(response.data.message || "Không tìm thấy sự kiện!");
      }
    } catch (error) {
      console.error("Lỗi ở hàm handleSearchByRating:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      setEvents([]);
      CustomFailedToast("Đã xảy ra lỗi khi tìm kiếm theo đánh giá!");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  console.log(JSON.stringify(searchFilters, null, 2))

  console.log(aiFilterEvents.length)

  // State for sort option
  const [sortOption, setSortOption] = useState("startDate")

  // State for selected map area (simplified for demo)
  const [mapArea, setMapArea] = useState(null)

  // State for loading
  const [isLoading, setIsLoading] = useState(false)

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Nếu là provinceName thì xử lý lại giá trị
    if (name === "province") {
      setSearchFilters(prev => ({
        ...prev,
        province: extractLocationName(value),  // Lưu tên tỉnh đã được xử lý
        provinceName: value
      }));
    } else if (name === 'district') {
      setSearchFilters(prev => ({
        ...prev,
        district: extractLocationName(value),  // Lưu tên tỉnh đã được xử lý
        districtName: value
      }));
    } else if (name === 'ward') {
      setSearchFilters(prev => ({
        ...prev,
        ward: extractLocationName(value),  // Lưu tên tỉnh đã được xử lý
        wardName: value
      }));
    } else {
      setSearchFilters(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  console.log(`Length filter event: ${filteredEvents.length}`)

  useEffect(() => {
    getAllCategory();
  }, [])

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault()
    filterEvents()
  }

  // Filter events based on search criteria
  const filterEvents = async () => {
    try {
      setIsLoading(true);

      const params = {};

      if (searchFilters.name) params.name = searchFilters.name;
      if (searchFilters.province) params.province = searchFilters.province;
      if (searchFilters.district) params.district = searchFilters.district;
      if (searchFilters.ward) params.ward = searchFilters.ward;
      if (searchFilters.startDate) params.startDate = searchFilters.startDate;
      if (searchFilters.endDate) params.endDate = searchFilters.endDate;
      if (searchFilters.category) params.category = searchFilters.category;

      if (Object.keys(params).length === 0) {
        CustomFailedToast("Vui lòng điền ít nhất một tiêu chí tìm kiếm!");
        setIsLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:5000/search/e-search`, {
        params: params
      })

      if (response.data && response.data.events) {
        setFilteredEvents(response.data.events);
      } 

    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000)
    }
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
      province: "",
      provinceName: "",
      district: "",
      districtName: "",
      ward: "",
      wardName: "",
      startDate: "",
      endDate: "",
      category: "",
      rating: ""
    })
    setFilteredEvents(events)
    setSortOption("startDate")
  }

  const handleNavigate = (path, eventId) => {
    console.log(`Navigating to ${path} for event ${eventId}`)
    // In a real app with React Router, you would use:
    // navigate(path, { state: { eventId } })
  }


  useEffect(() => {
    if (searchFilters.provinceName) {
      const selectedProvince = provinces.find(p => p.name === searchFilters.provinceName);
      if (selectedProvince) {
        fetchDistricts(selectedProvince.code); // Gửi đúng code
      }

      setSearchFilters(prev => ({
        ...prev,
        district: '',
        ward: ''
      }));
      setWards([]);
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [searchFilters.province, provinces]); // <-- thêm 'provinces' để đảm bảo có dữ liệu


  // Fetch wards when district changes
  useEffect(() => {
    if (searchFilters.districtName) {
      const selectedDistrict = districts.find(d => d.name === searchFilters.districtName);
      if (selectedDistrict) {
        fetchWards(selectedDistrict.code);
      }

      setSearchFilters(prev => ({
        ...prev,
        ward: ''
      }));
    } else {
      setWards([]);
    }
  }, [searchFilters.district, districts]); // <-- thêm 'districts' để đảm bảo có dữ liệu



  // Effect to filter events when search filters change
  useEffect(() => {
    filterEvents()
  }, [sortOption, mapArea])

  // Fetch provinces on component mount
  useEffect(() => {
    fetchProvinces()
  }, [])

  // Cập nhật ref mỗi lần searchFilters thay đổi
  useEffect(() => {
    searchFilterRef.current = searchFilters;
  }, [searchFilters]);

  useEffect(() => {
    handleSearchByRating();
  }, [searchRating])

  return (
    <>
    <CustomToast/>
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

            <div className={searchStyles.selectGroup}>
              <div className={searchStyles.iconWrapper}>
                <Filter className={searchStyles.icon} />
              </div>
              <select
                name="province"
                value={searchFilters.provinceName}  // Đảm bảo giá trị province được lưu dưới dạng tên đã xử lý
                onChange={handleInputChange}
                className={searchStyles.select}
              >
                <option value="">Thành phố / Tỉnh</option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={searchStyles.selectGroup}>
              <div className={searchStyles.iconWrapper}>
                <Filter className={searchStyles.icon} />
              </div>
              <select
                name="district"
                value={searchFilters.districtName}  // Đảm bảo giá trị district được lưu dưới dạng tên đã xử lý
                onChange={handleInputChange}
                className={searchStyles.select}
                disabled={!searchFilters.province}
              >
                <option value="">Quận</option>
                {districts.map((district) => (
                  <option key={district.code} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            <div className={searchStyles.selectGroup}>
              <div className={searchStyles.iconWrapper}>
                <Filter className={searchStyles.icon} />
              </div>
              <select
                name="ward"
                value={searchFilters.wardName}  // Đảm bảo giá trị ward được lưu dưới dạng tên đã xử lý
                onChange={handleInputChange}
                className={searchStyles.select}
                disabled={!searchFilters.district}
              >
                <option value="">Phường / Xã</option>
                {wards.map((ward) => (
                  <option key={ward.code} value={ward.name}>
                    {ward.name}
                  </option>
                ))}
              </select>
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
                  <MapComponent
                    province={searchFilters.province}
                    district={searchFilters.district}
                    ward={searchFilters.ward}
                  />
                  {/* Simplified map markers for demonstration */}
                  {filteredEvents.map((event, index) => (
                    <div
                      key={index}
                      className="position-absolute rounded-circle"
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: customStyles.primaryColor,
                        cursor: "pointer",
                      }}
                      title={event.name}
                    />
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Rating */}
            <form onSubmit={handleSearchByRating}>
              <Card className="mt-3 shadow">
                <Card.Header className="text-center fw-bold fs-5">
                  Tìm kiếm theo đánh giá tổ chức
                </Card.Header>
                <Card.Body>
                  {/* 5 sao */}
                  <FormCheck
                    type="radio"
                    name="rating"
                    id="rating-5"
                    value={5}
                    checked={searchRating === 5}
                    onChange={(e) => setSearchRating(Number(e.target.value))}
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
                    name="rating"
                    id="rating-4"
                    value={4}
                    checked={searchRating === 4}
                    onChange={(e) => setSearchRating(Number(e.target.value))}
                    label={
                      <span>
                        {[...Array(4)].map((_, i) => (
                          <BsStarFill key={i} color="#ffc107" />
                        ))}
                        <BsStar color="#ccc" /> <span> (4.0 trở lên)</span>
                      </span>
                    }
                  />

                  {/* 3 sao trở lên */}
                  <FormCheck
                    type="radio"
                    name="rating"
                    id="rating-3"
                    value={3}
                    checked={searchRating === 3}
                    onChange={(e) => setSearchRating(Number(e.target.value))}
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
                    name="rating"
                    id="rating-2"
                    value={2}
                    checked={searchRating === 2}
                    onChange={(e) => setSearchRating(Number(e.target.value))}
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

                  {/* 1 sao trở lên */}
                  <FormCheck
                    type="radio"
                    name="rating"
                    id="rating-1"
                    value={1}
                    checked={searchRating === 1}
                    onChange={(e) => setSearchRating(Number(e.target.value))}
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
            </form>

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
              <CustomSpinner/>
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

