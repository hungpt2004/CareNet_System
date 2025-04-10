"use client"

import { useState, useEffect } from "react"
import { Card, Table, Button, Badge, Form, InputGroup, Row, Col, Dropdown, Modal, ProgressBar } from "react-bootstrap"
import {
  Search,
  Filter,
  Download,
  Calendar,
  MapPin,
  Users,
  Eye,
  MoreHorizontal,
  Printer,
  Mail,
  Phone,
  User,
  Info,
} from "lucide-react"
import { useToast } from "../../components/toast/ToastNotification"

// Sử dụng màu sắc từ AppColors.module.css
const customStyles = {
  primaryColor: "#118b50", // --color-primary
  accentColor: "#5db996", // --color-accent
  accentLightColor: "#e3f0af", // --color-accent-light
  backgroundColor: "#f6f4ef", // --color-background
}

const AdminEventParticipants = () => {
  // Sử dụng toast
  const { showSuccess, showError, showWarning, showInfo } = useToast()

  // Dữ liệu mẫu về các sự kiện thiện nguyện
  const [events, setEvents] = useState([
    {
      id: "EVT-1001",
      name: "Chiến dịch trồng cây xanh tại Cần Giờ",
      organization: "Hội Bảo vệ Môi trường Xanh",
      date: "2023-11-25T07:00:00",
      location: "Khu dự trữ sinh quyển Cần Giờ, TP. Hồ Chí Minh",
      registeredCount: 200,
      checkedInCount: 145,
      status: "ongoing",
      description:
        "Chiến dịch trồng cây xanh nhằm phục hồi hệ sinh thái rừng ngập mặn và nâng cao nhận thức cộng đồng về bảo vệ môi trường.",
      organizerContact: {
        name: "Nguyễn Văn Bảo Vệ",
        phone: "0901234567",
        email: "baove@moitruongxanh.org",
      },
    },
    {
      id: "EVT-1002",
      name: "Chương trình tặng sách cho trẻ em vùng cao",
      organization: "Tình nguyện vì Trẻ em",
      date: "2023-12-10T08:00:00",
      location: "Các trường học tại huyện Sa Pa và Bắc Hà, tỉnh Lào Cai",
      registeredCount: 120,
      checkedInCount: 0,
      status: "upcoming",
      description:
        "Chương trình tặng sách nhằm cung cấp tài liệu học tập cho các em học sinh vùng cao, góp phần nâng cao chất lượng giáo dục.",
      organizerContact: {
        name: "Trần Thị Tình Nguyện",
        phone: "0912345678",
        email: "tinhnguyen@vitreem.org",
      },
    },
    {
      id: "EVT-1003",
      name: "Khám bệnh miễn phí cho người dân tại Quảng Nam",
      organization: "Hỗ trợ Y tế Cộng đồng",
      date: "2023-12-01T08:00:00",
      location: "Trạm y tế xã Trà Mai, huyện Nam Trà My, tỉnh Quảng Nam",
      registeredCount: 50,
      checkedInCount: 0,
      status: "upcoming",
      description:
        "Chương trình khám bệnh miễn phí cho người dân có hoàn cảnh khó khăn tại vùng sâu vùng xa của tỉnh Quảng Nam.",
      organizerContact: {
        name: "Lê Văn Y Tế",
        phone: "0923456789",
        email: "yte@hotro.org",
      },
    },
    {
      id: "EVT-1004",
      name: "Chương trình thăm hỏi và tặng quà cho người cao tuổi",
      organization: "Hỗ trợ Người cao tuổi",
      date: "2024-01-25T08:30:00",
      location: "Các phường thuộc quận Ninh Kiều và Cái Răng, TP. Cần Thơ",
      registeredCount: 80,
      checkedInCount: 0,
      status: "upcoming",
      description:
        "Chương trình thăm hỏi và tặng quà cho người cao tuổi có hoàn cảnh khó khăn nhân dịp Tết Nguyên đán.",
      organizerContact: {
        name: "Phạm Thị Hỗ Trợ",
        phone: "0934567890",
        email: "hotro@nguoicaotuoi.org",
      },
    },
    {
      id: "EVT-1005",
      name: "Chiến dịch giải cứu động vật hoang dã",
      organization: "Bảo vệ Động vật Hoang dã",
      date: "2023-11-30T07:30:00",
      location: "Vườn Quốc gia Pù Mát, tỉnh Nghệ An",
      registeredCount: 35,
      checkedInCount: 0,
      status: "upcoming",
      description:
        "Chiến dịch giải cứu và tái thả động vật hoang dã về môi trường tự nhiên, kết hợp tuyên truyền bảo vệ động vật hoang dã.",
      organizerContact: {
        name: "Hoàng Văn Bảo Vệ",
        phone: "0945678901",
        email: "baove@dongvathoangda.org",
      },
    },
    {
      id: "EVT-1006",
      name: "Dọn rác bãi biển Vũng Tàu",
      organization: "Hội Bảo vệ Môi trường Xanh",
      date: "2023-09-22T06:30:00",
      location: "Bãi Sau, Thành phố Vũng Tàu",
      registeredCount: 150,
      checkedInCount: 120,
      status: "completed",
      description:
        "Chiến dịch dọn rác bãi biển nhằm bảo vệ môi trường biển và nâng cao ý thức của cộng đồng về bảo vệ môi trường.",
      organizerContact: {
        name: "Nguyễn Văn Bảo Vệ",
        phone: "0901234567",
        email: "baove@moitruongxanh.org",
      },
    },
    {
      id: "EVT-1007",
      name: "Hội thảo về biến đổi khí hậu",
      organization: "Hội Bảo vệ Môi trường Xanh",
      date: "2023-08-05T14:00:00",
      location: "Trung tâm Hội nghị, TP. Hồ Chí Minh",
      registeredCount: 80,
      checkedInCount: 65,
      status: "completed",
      description:
        "Hội thảo chia sẻ kiến thức và giải pháp về biến đổi khí hậu, thu hút sự tham gia của các chuyên gia và người quan tâm.",
      organizerContact: {
        name: "Nguyễn Văn Bảo Vệ",
        phone: "0901234567",
        email: "baove@moitruongxanh.org",
      },
    },
  ])

  // Dữ liệu mẫu về người tham gia sự kiện
  const [participants, setParticipants] = useState([
    // Sự kiện EVT-1001
    {
      id: "PAR-1001",
      eventId: "EVT-1001",
      name: "Nguyễn Văn An",
      email: "an.nguyen@example.com",
      phone: "0901234567",
      registrationDate: "2023-11-10T10:30:00",
      checkedIn: true,
      checkedInTime: "2023-11-25T06:45:00",
      notes: "Đã tham gia trồng 5 cây xanh",
      age: 28,
      gender: "Nam",
      address: "123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
      emergencyContact: "Nguyễn Thị Hoa - 0912345678",
      skills: ["Trồng cây", "Sơ cứu cơ bản"],
      previousEvents: 3,
    },
    {
      id: "PAR-1002",
      eventId: "EVT-1001",
      name: "Trần Thị Bình",
      email: "binh.tran@example.com",
      phone: "0912345678",
      registrationDate: "2023-11-11T14:20:00",
      checkedIn: true,
      checkedInTime: "2023-11-25T06:50:00",
      notes: "",
      age: 35,
      gender: "Nữ",
      address: "456 Lê Văn Lương, Quận 7, TP. Hồ Chí Minh",
      emergencyContact: "Trần Văn Nam - 0923456789",
      skills: ["Chụp ảnh", "Truyền thông"],
      previousEvents: 5,
    },
    {
      id: "PAR-1003",
      eventId: "EVT-1001",
      name: "Lê Văn Cường",
      email: "cuong.le@example.com",
      phone: "0923456789",
      registrationDate: "2023-11-12T09:15:00",
      checkedIn: false,
      checkedInTime: null,
      notes: "Đã thông báo không thể tham gia vì lý do cá nhân",
      age: 42,
      gender: "Nam",
      address: "789 Nguyễn Hữu Thọ, Quận 7, TP. Hồ Chí Minh",
      emergencyContact: "Lê Thị Mai - 0934567890",
      skills: ["Lái xe", "Hậu cần"],
      previousEvents: 2,
    },
    {
      id: "PAR-1004",
      eventId: "EVT-1001",
      name: "Phạm Thị Dung",
      email: "dung.pham@example.com",
      phone: "0934567890",
      registrationDate: "2023-11-13T16:40:00",
      checkedIn: true,
      checkedInTime: "2023-11-25T07:10:00",
      notes: "",
      age: 23,
      gender: "Nữ",
      address: "101 Nguyễn Thị Thập, Quận 7, TP. Hồ Chí Minh",
      emergencyContact: "Phạm Văn Hùng - 0945678901",
      skills: ["Giáo dục môi trường", "Tiếng Anh"],
      previousEvents: 1,
    },
    {
      id: "PAR-1005",
      eventId: "EVT-1001",
      name: "Hoàng Văn Em",
      email: "em.hoang@example.com",
      phone: "0945678901",
      registrationDate: "2023-11-14T11:25:00",
      checkedIn: true,
      checkedInTime: "2023-11-25T07:05:00",
      notes: "",
      age: 31,
      gender: "Nam",
      address: "202 Huỳnh Tấn Phát, Quận 7, TP. Hồ Chí Minh",
      emergencyContact: "Hoàng Thị Lan - 0956789012",
      skills: ["Trồng cây", "Quản lý nhóm"],
      previousEvents: 7,
    },
    // Sự kiện EVT-1002
    {
      id: "PAR-2001",
      eventId: "EVT-1002",
      name: "Lý Thị Hoa",
      email: "hoa.ly@example.com",
      phone: "0956789012",
      registrationDate: "2023-11-20T08:30:00",
      checkedIn: false,
      checkedInTime: null,
      notes: "",
      age: 27,
      gender: "Nữ",
      address: "303 Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh",
      emergencyContact: "Lý Văn Minh - 0967890123",
      skills: ["Giáo dục", "Kể chuyện"],
      previousEvents: 4,
    },
    {
      id: "PAR-2002",
      eventId: "EVT-1002",
      name: "Vũ Đình Hùng",
      email: "hung.vu@example.com",
      phone: "0967890123",
      registrationDate: "2023-11-21T13:45:00",
      checkedIn: false,
      checkedInTime: null,
      notes: "",
      age: 45,
      gender: "Nam",
      address: "404 Lê Lợi, Quận 1, TP. Hồ Chí Minh",
      emergencyContact: "Vũ Thị Hương - 0978901234",
      skills: ["Lái xe", "Hậu cần", "Sơ cứu"],
      previousEvents: 10,
    },
    {
      id: "PAR-2003",
      eventId: "EVT-1002",
      name: "Đặng Thị Lan",
      email: "lan.dang@example.com",
      phone: "0978901234",
      registrationDate: "2023-11-22T10:15:00",
      checkedIn: false,
      checkedInTime: null,
      notes: "",
      age: 29,
      gender: "Nữ",
      address: "505 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
      emergencyContact: "Đặng Văn Phúc - 0989012345",
      skills: ["Giáo dục", "Tiếng Anh", "Tổ chức sự kiện"],
      previousEvents: 6,
    },
    // Sự kiện EVT-1006 (đã hoàn thành)
    {
      id: "PAR-6001",
      eventId: "EVT-1006",
      name: "Trương Văn Minh",
      email: "minh.truong@example.com",
      phone: "0989012345",
      registrationDate: "2023-09-10T09:20:00",
      checkedIn: true,
      checkedInTime: "2023-09-22T06:25:00",
      notes: "Đã tham gia tích cực",
      age: 33,
      gender: "Nam",
      address: "606 Bạch Đằng, Vũng Tàu",
      emergencyContact: "Trương Thị Hà - 0990123456",
      skills: ["Dọn rác", "Bơi lội", "Lặn biển"],
      previousEvents: 8,
    },
    {
      id: "PAR-6002",
      eventId: "EVT-1006",
      name: "Ngô Thị Nga",
      email: "nga.ngo@example.com",
      phone: "0990123456",
      registrationDate: "2023-09-11T14:30:00",
      checkedIn: true,
      checkedInTime: "2023-09-22T06:40:00",
      notes: "",
      age: 25,
      gender: "Nữ",
      address: "707 Thùy Vân, Vũng Tàu",
      emergencyContact: "Ngô Văn Bình - 0901234567",
      skills: ["Truyền thông", "Chụp ảnh", "Thiết kế"],
      previousEvents: 3,
    },
    {
      id: "PAR-6003",
      eventId: "EVT-1006",
      name: "Đinh Văn Phúc",
      email: "phuc.dinh@example.com",
      phone: "0901234567",
      registrationDate: "2023-09-12T11:45:00",
      checkedIn: false,
      checkedInTime: null,
      notes: "Không tham gia, không thông báo",
      age: 38,
      gender: "Nam",
      address: "808 Trưng Nhị, Vũng Tàu",
      emergencyContact: "Đinh Thị Hồng - 0912345678",
      skills: ["Quản lý nhóm", "Hậu cần"],
      previousEvents: 5,
    },
  ])

  // State cho sự kiện đã chọn
  const [selectedEventId, setSelectedEventId] = useState("")
  const [selectedEvent, setSelectedEvent] = useState(null)

  // State cho filter và search
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")

  // State cho modal chi tiết
  const [showModal, setShowModal] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState(null)

  // State cho modal thông tin sự kiện
  const [showEventModal, setShowEventModal] = useState(false)

  // Cập nhật sự kiện đã chọn khi selectedEventId thay đổi
  useEffect(() => {
    if (selectedEventId) {
      const event = events.find((event) => event.id === selectedEventId)
      setSelectedEvent(event)
    } else {
      setSelectedEvent(null)
    }
  }, [selectedEventId, events])

  // Lọc người tham gia dựa trên sự kiện đã chọn, tìm kiếm và bộ lọc
  const filteredParticipants = participants.filter((participant) => {
    // Lọc theo sự kiện đã chọn
    if (!selectedEventId || participant.eventId !== selectedEventId) {
      return false
    }

    // Lọc theo từ khóa tìm kiếm
    const matchesSearch =
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (participant.address && participant.address.toLowerCase().includes(searchTerm.toLowerCase()))

    // Lọc theo trạng thái điểm danh
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "checked-in" && participant.checkedIn) ||
      (statusFilter === "not-checked-in" && !participant.checkedIn)

    // Lọc theo giới tính
    const matchesGender =
      genderFilter === "all" || (participant.gender && participant.gender.toLowerCase() === genderFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesGender
  })

  // Xử lý thay đổi tìm kiếm
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Xem chi tiết người tham gia
  const viewParticipantDetails = (participant) => {
    setSelectedParticipant(participant)
    setShowModal(true)
  }

  // Xem chi tiết sự kiện
  const viewEventDetails = () => {
    setShowEventModal(true)
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const options = { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleDateString("vi-VN", options)
  }

  // Lấy badge trạng thái sự kiện
  const getEventStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return <Badge bg="info">Sắp diễn ra</Badge>
      case "ongoing":
        return <Badge bg="success">Đang diễn ra</Badge>
      case "completed":
        return <Badge bg="secondary">Đã hoàn thành</Badge>
      default:
        return (
          <Badge bg="light" text="dark">
            Không xác định
          </Badge>
        )
    }
  }

  // Xuất dữ liệu người tham gia
  const exportParticipantsData = () => {
    if (!selectedEventId) return

    // Trong thực tế, đây sẽ là chức năng xuất file CSV hoặc Excel
    // Ở đây chỉ mô phỏng bằng cách hiển thị thông báo
    showSuccess("Đã xuất dữ liệu người tham gia thành công")
  }

  // Gửi email cho tất cả người tham gia
  const sendEmailToAll = () => {
    if (!selectedEventId) return

    // Trong thực tế, đây sẽ là chức năng gửi email
    // Ở đây chỉ mô phỏng bằng cách hiển thị thông báo
    showInfo(`Đã gửi email đến ${filteredParticipants.length} người tham gia`)
  }

  // In danh sách người tham gia
  const printParticipantsList = () => {
    if (!selectedEventId) return

    // Trong thực tế, đây sẽ là chức năng in
    // Ở đây chỉ mô phỏng bằng cách hiển thị thông báo
    showInfo("Đang chuẩn bị in danh sách người tham gia")
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Danh sách người tham gia sự kiện</h2>
        <div>
          <Button
            variant="outline-primary"
            className="me-2"
            onClick={exportParticipantsData}
            disabled={!selectedEventId}
          >
            <Download size={18} className="me-2" />
            Xuất dữ liệu
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
            onClick={sendEmailToAll}
            disabled={!selectedEventId}
          >
            <Mail size={18} className="me-2" />
            Gửi email
          </Button>
        </div>
      </div>

      {/* Chọn sự kiện */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-3">Chọn sự kiện</h5>
          <Row>
            <Col md={6}>
              <Form.Select
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="mb-3"
              >
                <option value="">-- Chọn sự kiện --</option>
                <optgroup label="Sự kiện đang diễn ra">
                  {events
                    .filter((event) => event.status === "ongoing")
                    .map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Sự kiện sắp diễn ra">
                  {events
                    .filter((event) => event.status === "upcoming")
                    .map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))}
                </optgroup>
                <optgroup label="Sự kiện đã hoàn thành">
                  {events
                    .filter((event) => event.status === "completed")
                    .map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.name}
                      </option>
                    ))}
                </optgroup>
              </Form.Select>
            </Col>
          </Row>

          {selectedEvent && (
            <div className="bg-light p-3 rounded">
              <Row>
                <Col md={6}>
                  <div className="mb-2 d-flex align-items-center">
                    <Calendar size={18} className="me-2 text-muted" />
                    <div>
                      <strong>Ngày diễn ra:</strong> {formatDate(selectedEvent.date)}
                    </div>
                  </div>
                  <div className="mb-2 d-flex align-items-center">
                    <MapPin size={18} className="me-2 text-muted" />
                    <div>
                      <strong>Địa điểm:</strong> {selectedEvent.location}
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-2 d-flex align-items-center">
                    <Users size={18} className="me-2 text-muted" />
                    <div>
                      <strong>Số người đăng ký:</strong> {selectedEvent.registeredCount}
                    </div>
                  </div>
                  <div className="mb-2 d-flex align-items-center">
                    <Info size={18} className="me-2 text-muted" />
                    <div>
                      <strong>Tổ chức:</strong> {selectedEvent.organization}
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="mt-2">
                <ProgressBar
                  now={(selectedEvent.checkedInCount / selectedEvent.registeredCount) * 100}
                  variant="success"
                  style={{ height: "10px" }}
                />
                <div className="d-flex justify-content-between mt-1">
                  <small className="text-muted">{selectedEvent.checkedInCount} người đã điểm danh</small>
                  <small className="text-muted">{selectedEvent.registeredCount} người đăng ký</small>
                </div>
              </div>
              <div className="mt-2 d-flex justify-content-between align-items-center">
                <Button
                  variant="link"
                  className="p-0 text-decoration-none"
                  onClick={viewEventDetails}
                  style={{ color: customStyles.primaryColor }}
                >
                  Xem chi tiết sự kiện
                </Button>
                <span className="me-2">{getEventStatusBadge(selectedEvent.status)}</span>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Danh sách người tham gia */}
      {selectedEventId ? (
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Danh sách người tham gia</h5>
              <Button variant="outline-secondary" size="sm" onClick={printParticipantsList}>
                <Printer size={16} className="me-2" />
                In danh sách
              </Button>
            </div>
            <Row className="mb-3">
              <Col md={6} lg={4}>
                <InputGroup>
                  <InputGroup.Text className="bg-light">
                    <Search size={18} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Tìm kiếm theo tên, email, số điện thoại, địa chỉ..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </InputGroup>
              </Col>
              <Col md={6} lg={8} className="d-flex gap-2 mt-3 mt-md-0">
                <Form.Select className="w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">Tất cả trạng thái</option>
                  <option value="checked-in">Đã điểm danh</option>
                  <option value="not-checked-in">Chưa điểm danh</option>
                </Form.Select>

                <Form.Select className="w-auto" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                  <option value="all">Tất cả giới tính</option>
                  <option value="nam">Nam</option>
                  <option value="nữ">Nữ</option>
                  <option value="khác">Khác</option>
                </Form.Select>

                <Button variant="outline-secondary">
                  <Filter size={18} className="me-2" />
                  Lọc nâng cao
                </Button>
              </Col>
            </Row>

            <div className="table-responsive">
              <Table hover className="align-middle">
                <thead className="bg-light">
                  <tr>
                    <th>ID</th>
                    <th>Họ và tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Giới tính</th>
                    <th>Tuổi</th>
                    <th>Ngày đăng ký</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParticipants.length > 0 ? (
                    filteredParticipants.map((participant) => (
                      <tr key={participant.id}>
                        <td>{participant.id}</td>
                        <td className="fw-medium">{participant.name}</td>
                        <td>{participant.email}</td>
                        <td>{participant.phone}</td>
                        <td>{participant.gender || "N/A"}</td>
                        <td>{participant.age || "N/A"}</td>
                        <td>{formatDate(participant.registrationDate)}</td>
                        <td>
                          {participant.checkedIn ? (
                            <Badge bg="success">Đã điểm danh</Badge>
                          ) : (
                            <Badge bg="warning">Chưa điểm danh</Badge>
                          )}
                        </td>
                        <td>
                          <div className="d-flex gap-1">
                            <Button
                              variant="light"
                              size="sm"
                              className="border-0"
                              onClick={() => viewParticipantDetails(participant)}
                              title="Xem chi tiết"
                            >
                              <Eye size={18} />
                            </Button>

                            <Dropdown align="end">
                              <Dropdown.Toggle variant="light" size="sm" className="border-0">
                                <MoreHorizontal size={18} />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => viewParticipantDetails(participant)}>
                                  <Eye size={16} className="me-2" />
                                  Xem chi tiết
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    showSuccess(`Đã gửi email cho ${participant.name}`)
                                  }}
                                >
                                  <Mail size={16} className="me-2" />
                                  Gửi email
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    showInfo(`Đang gọi ${participant.phone}`)
                                  }}
                                >
                                  <Phone size={16} className="me-2" />
                                  Gọi điện
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-4">
                        <p className="mb-0 text-muted">
                          Không tìm thấy người tham gia nào phù hợp với điều kiện tìm kiếm
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <span className="text-muted">
                  Hiển thị {filteredParticipants.length} /{" "}
                  {participants.filter((p) => p.eventId === selectedEventId).length} người tham gia
                </span>
              </div>
              <div className="d-flex gap-2">
                <Button variant="outline-secondary" size="sm" disabled>
                  Trước
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
                >
                  1
                </Button>
                <Button variant="outline-secondary" size="sm" disabled>
                  Tiếp
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body className="text-center py-5">
            <Calendar size={48} className="text-muted mb-3" />
            <h4>Vui lòng chọn một sự kiện</h4>
            <p className="text-muted">Chọn một sự kiện từ danh sách để xem thông tin người tham gia</p>
          </Card.Body>
        </Card>
      )}

      {/* Modal Chi tiết người tham gia */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" backdrop="static">
        {selectedParticipant && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="d-flex align-items-center">
                  Chi tiết người tham gia
                  <div className="ms-2">
                    {selectedParticipant.checkedIn ? (
                      <Badge bg="success">Đã điểm danh</Badge>
                    ) : (
                      <Badge bg="warning">Chưa điểm danh</Badge>
                    )}
                  </div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <h5 className="mb-3">Thông tin cá nhân</h5>
                  <div className="mb-2">
                    <strong>Họ và tên:</strong> {selectedParticipant.name}
                  </div>
                  <div className="mb-2">
                    <strong>Email:</strong> {selectedParticipant.email}
                  </div>
                  <div className="mb-2">
                    <strong>Số điện thoại:</strong> {selectedParticipant.phone}
                  </div>
                  <div className="mb-2">
                    <strong>Giới tính:</strong> {selectedParticipant.gender || "N/A"}
                  </div>
                  <div className="mb-2">
                    <strong>Tuổi:</strong> {selectedParticipant.age || "N/A"}
                  </div>
                  <div className="mb-2">
                    <strong>Địa chỉ:</strong> {selectedParticipant.address || "N/A"}
                  </div>
                  <div className="mb-2">
                    <strong>Liên hệ khẩn cấp:</strong> {selectedParticipant.emergencyContact || "N/A"}
                  </div>
                </Col>
                <Col md={6}>
                  <h5 className="mb-3">Thông tin đăng ký</h5>
                  <div className="mb-2">
                    <strong>ID:</strong> {selectedParticipant.id}
                  </div>
                  <div className="mb-2">
                    <strong>Ngày đăng ký:</strong> {formatDate(selectedParticipant.registrationDate)}
                  </div>
                  <div className="mb-2">
                    <strong>Trạng thái điểm danh:</strong>{" "}
                    {selectedParticipant.checkedIn ? "Đã điểm danh" : "Chưa điểm danh"}
                  </div>
                  {selectedParticipant.checkedIn && (
                    <div className="mb-2">
                      <strong>Thời gian điểm danh:</strong> {formatDate(selectedParticipant.checkedInTime)}
                    </div>
                  )}
                  <div className="mb-2">
                    <strong>Số sự kiện đã tham gia trước đây:</strong> {selectedParticipant.previousEvents || 0}
                  </div>
                  <div className="mb-2">
                    <strong>Kỹ năng:</strong>{" "}
                    {selectedParticipant.skills && selectedParticipant.skills.length > 0
                      ? selectedParticipant.skills.join(", ")
                      : "Không có"}
                  </div>
                </Col>
              </Row>

              <hr className="my-3" />

              <h5 className="mb-3">Ghi chú</h5>
              <p className="bg-light p-3 rounded">{selectedParticipant.notes || "Không có ghi chú"}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                Đóng
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setShowModal(false)
                  showSuccess(`Đã gửi email cho ${selectedParticipant.name}`)
                }}
              >
                <Mail size={16} className="me-2" />
                Gửi email
              </Button>
              <Button
                variant="primary"
                style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
                onClick={() => {
                  setShowModal(false)
                  showInfo(`Đang gọi ${selectedParticipant.phone}`)
                }}
              >
                <Phone size={16} className="me-2" />
                Gọi điện
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* Modal Chi tiết sự kiện */}
      <Modal show={showEventModal} onHide={() => setShowEventModal(false)} size="lg" backdrop="static">
        {selectedEvent && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="d-flex align-items-center">
                  Chi tiết sự kiện
                  <div className="ms-2">{getEventStatusBadge(selectedEvent.status)}</div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4 className="mb-3">{selectedEvent.name}</h4>

              <Row className="mb-4">
                <Col md={6}>
                  <div className="mb-2 d-flex align-items-center">
                    <Calendar size={18} className="me-2 text-muted" />
                    <div>
                      <strong>Ngày diễn ra:</strong> {formatDate(selectedEvent.date)}
                    </div>
                  </div>
                  <div className="mb-2 d-flex align-items-center">
                    <MapPin size={18} className="me-2 text-muted" />
                    <div>
                      <strong>Địa điểm:</strong> {selectedEvent.location}
                    </div>
                  </div>
                  <div className="mb-2 d-flex align-items-center">
                    <Users size={18} className="me-2 text-muted" />
                    <div>
                      <strong>Số người đăng ký:</strong> {selectedEvent.registeredCount}
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-2 d-flex align-items-center">
                    <Info size={18} className="me-2 text-muted" />
                    <div>
                      <strong>Tổ chức:</strong> {selectedEvent.organization}
                    </div>
                  </div>
                  <div className="mb-2 d-flex align-items-center">
                    <User size={18} className="me-2 text-muted" />
                    <div>
                      <strong>Người phụ trách:</strong> {selectedEvent.organizerContact?.name || "N/A"}
                    </div>
                  </div>
                  <div className="mb-2 d-flex align-items-center">
                    <Phone size={18} className="me-2 text-muted" />
                    <div>
                      <strong>Liên hệ:</strong> {selectedEvent.organizerContact?.phone || "N/A"}
                    </div>
                  </div>
                </Col>
              </Row>

              <h5 className="mb-2">Mô tả sự kiện</h5>
              <p className="bg-light p-3 rounded mb-4">{selectedEvent.description || "Không có mô tả"}</p>

              <h5 className="mb-2">Thống kê tham gia</h5>
              <div className="mb-4">
                <ProgressBar
                  now={(selectedEvent.checkedInCount / selectedEvent.registeredCount) * 100}
                  variant="success"
                  style={{ height: "10px" }}
                />
                <div className="d-flex justify-content-between mt-1">
                  <small className="text-muted">{selectedEvent.checkedInCount} người đã điểm danh</small>
                  <small className="text-muted">{selectedEvent.registeredCount} người đăng ký</small>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={() => setShowEventModal(false)}>
                Đóng
              </Button>
              <Button
                variant="primary"
                style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
                onClick={() => {
                  setShowEventModal(false)
                  showSuccess("Đã xuất thông tin sự kiện")
                }}
              >
                <Download size={16} className="me-2" />
                Xuất thông tin
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  )
}

export default AdminEventParticipants

