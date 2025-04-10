"use client"

import { useState, useEffect } from "react"
import {
  Card,
  Table,
  Button,
  Badge,
  Form,
  InputGroup,
  Row,
  Col,
  Dropdown,
  Alert,
  ProgressBar,
  Modal,
} from "react-bootstrap"
import {
  Search,
  Filter,
  Download,
  Calendar,
  MapPin,
  Users,
  UserCheck,
  UserX,
  Eye,
  MoreHorizontal,
  FileText,
  Send,
} from "lucide-react"

// Sử dụng màu sắc từ AppColors.module.css
const customStyles = {
  primaryColor: "#118b50", // --color-primary
  accentColor: "#5db996", // --color-accent
  accentLightColor: "#e3f0af", // --color-accent-light
  backgroundColor: "#f6f4ef", // --color-background
}

const OrganizationEventAttendance = () => {
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
    },
  ])

  // State cho sự kiện đã chọn
  const [selectedEventId, setSelectedEventId] = useState("")
  const [selectedEvent, setSelectedEvent] = useState(null)

  // State cho filter và search
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // State cho modal chi tiết
  const [showModal, setShowModal] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState(null)
  const [participantNote, setParticipantNote] = useState("")

  // State cho thông báo
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertVariant, setAlertVariant] = useState("success")

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
      participant.phone.toLowerCase().includes(searchTerm.toLowerCase())

    // Lọc theo trạng thái điểm danh
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "checked-in" && participant.checkedIn) ||
      (statusFilter === "not-checked-in" && !participant.checkedIn)

    return matchesSearch && matchesStatus
  })

  // Xử lý thay đổi tìm kiếm
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Xử lý điểm danh
  const handleCheckIn = (participantId) => {
    const updatedParticipants = participants.map((participant) => {
      if (participant.id === participantId) {
        // Nếu chưa điểm danh, thì điểm danh
        if (!participant.checkedIn) {
          // Cập nhật số lượng người đã điểm danh trong sự kiện
          const updatedEvents = events.map((event) => {
            if (event.id === participant.eventId) {
              return {
                ...event,
                checkedInCount: event.checkedInCount + 1,
              }
            }
            return event
          })
          setEvents(updatedEvents)

          // Hiển thị thông báo
          setAlertVariant("success")
          setAlertMessage(`Đã điểm danh thành công cho ${participant.name}`)
          setShowAlert(true)

          // Tự động ẩn thông báo sau 3 giây
          setTimeout(() => {
            setShowAlert(false)
          }, 3000)

          return {
            ...participant,
            checkedIn: true,
            checkedInTime: new Date().toISOString(),
          }
        }
        // Nếu đã điểm danh, thì hủy điểm danh
        else {
          // Cập nhật số lượng người đã điểm danh trong sự kiện
          const updatedEvents = events.map((event) => {
            if (event.id === participant.eventId) {
              return {
                ...event,
                checkedInCount: event.checkedInCount - 1,
              }
            }
            return event
          })
          setEvents(updatedEvents)

          // Hiển thị thông báo
          setAlertVariant("warning")
          setAlertMessage(`Đã hủy điểm danh cho ${participant.name}`)
          setShowAlert(true)

          // Tự động ẩn thông báo sau 3 giây
          setTimeout(() => {
            setShowAlert(false)
          }, 3000)

          return {
            ...participant,
            checkedIn: false,
            checkedInTime: null,
          }
        }
      }
      return participant
    })

    setParticipants(updatedParticipants)
  }

  // Xem chi tiết người tham gia
  const viewParticipantDetails = (participant) => {
    setSelectedParticipant(participant)
    setParticipantNote(participant.notes || "")
    setShowModal(true)
  }

  // Lưu ghi chú cho người tham gia
  const saveParticipantNote = () => {
    const updatedParticipants = participants.map((participant) => {
      if (participant.id === selectedParticipant.id) {
        return {
          ...participant,
          notes: participantNote,
        }
      }
      return participant
    })

    setParticipants(updatedParticipants)
    setSelectedParticipant({
      ...selectedParticipant,
      notes: participantNote,
    })

    // Hiển thị thông báo
    setAlertVariant("success")
    setAlertMessage("Đã lưu ghi chú thành công")
    setShowAlert(true)

    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
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

  // Điểm danh hàng loạt
  const bulkCheckIn = () => {
    if (!selectedEventId) return

    // Lấy danh sách người chưa điểm danh
    const notCheckedInParticipants = participants.filter(
      (participant) => participant.eventId === selectedEventId && !participant.checkedIn,
    )

    if (notCheckedInParticipants.length === 0) {
      setAlertVariant("warning")
      setAlertMessage("Tất cả người tham gia đã được điểm danh")
      setShowAlert(true)

      setTimeout(() => {
        setShowAlert(false)
      }, 3000)

      return
    }

    // Cập nhật trạng thái điểm danh
    const updatedParticipants = participants.map((participant) => {
      if (participant.eventId === selectedEventId && !participant.checkedIn) {
        return {
          ...participant,
          checkedIn: true,
          checkedInTime: new Date().toISOString(),
        }
      }
      return participant
    })

    // Cập nhật số lượng người đã điểm danh trong sự kiện
    const updatedEvents = events.map((event) => {
      if (event.id === selectedEventId) {
        return {
          ...event,
          checkedInCount: event.registeredCount,
        }
      }
      return event
    })

    setParticipants(updatedParticipants)
    setEvents(updatedEvents)

    // Hiển thị thông báo
    setAlertVariant("success")
    setAlertMessage(`Đã điểm danh cho ${notCheckedInParticipants.length} người tham gia`)
    setShowAlert(true)

    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }

  // Xuất dữ liệu điểm danh
  const exportAttendanceData = () => {
    if (!selectedEventId) return

    // Trong thực tế, đây sẽ là chức năng xuất file CSV hoặc Excel
    // Ở đây chỉ mô phỏng bằng cách hiển thị thông báo
    setAlertVariant("success")
    setAlertMessage("Đã xuất dữ liệu điểm danh thành công")
    setShowAlert(true)

    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Quản lý điểm danh sự kiện</h2>
        <div>
          <Button variant="outline-primary" className="me-2" onClick={exportAttendanceData} disabled={!selectedEventId}>
            <Download size={18} className="me-2" />
            Xuất dữ liệu
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
            onClick={bulkCheckIn}
            disabled={!selectedEventId}
          >
            <UserCheck size={18} className="me-2" />
            Điểm danh tất cả
          </Button>
        </div>
      </div>

      {/* Thông báo */}
      {showAlert && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible className="mb-4">
          {alertMessage}
        </Alert>
      )}

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
                    <UserCheck size={18} className="me-2 text-muted" />
                    <div>
                      <strong>Số người đã điểm danh:</strong> {selectedEvent.checkedInCount} (
                      {Math.round((selectedEvent.checkedInCount / selectedEvent.registeredCount) * 100)}%)
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
              </div>
              <div className="mt-2 text-end">
                <span className="me-2">{getEventStatusBadge(selectedEvent.status)}</span>
                <span className="text-muted">ID: {selectedEvent.id}</span>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Danh sách người tham gia */}
      {selectedEventId ? (
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body>
            <h5 className="mb-3">Danh sách người tham gia</h5>
            <Row className="mb-3">
              <Col md={6} lg={4}>
                <InputGroup>
                  <InputGroup.Text className="bg-light">
                    <Search size={18} />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Tìm kiếm theo tên, email, số điện thoại..."
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
                    <th>Ngày đăng ký</th>
                    <th>Trạng thái</th>
                    <th>Thời gian điểm danh</th>
                    <th>Ghi chú</th>
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
                        <td>{formatDate(participant.registrationDate)}</td>
                        <td>
                          {participant.checkedIn ? (
                            <Badge bg="success">Đã điểm danh</Badge>
                          ) : (
                            <Badge bg="warning">Chưa điểm danh</Badge>
                          )}
                        </td>
                        <td>{formatDate(participant.checkedInTime)}</td>
                        <td>
                          {participant.notes ? (
                            <span className="text-truncate d-inline-block" style={{ maxWidth: "150px" }}>
                              {participant.notes}
                            </span>
                          ) : (
                            <span className="text-muted">Không có</span>
                          )}
                        </td>
                        <td>
                          <div className="d-flex gap-1">
                            <Button
                              variant={participant.checkedIn ? "outline-success" : "success"}
                              size="sm"
                              onClick={() => handleCheckIn(participant.id)}
                              title={participant.checkedIn ? "Hủy điểm danh" : "Điểm danh"}
                            >
                              {participant.checkedIn ? <UserX size={18} /> : <UserCheck size={18} />}
                            </Button>

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
                                <Dropdown.Item>
                                  <FileText size={16} className="me-2" />
                                  Thêm ghi chú
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <Send size={16} className="me-2" />
                                  Gửi email
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
            <p className="text-muted">Chọn một sự kiện từ danh sách để xem và quản lý điểm danh</p>
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
                    <strong>ID:</strong> {selectedParticipant.id}
                  </div>
                </Col>
                <Col md={6}>
                  <h5 className="mb-3">Thông tin đăng ký</h5>
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
                </Col>
              </Row>

              <hr className="my-3" />

              <h5 className="mb-3">Ghi chú</h5>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={participantNote}
                  onChange={(e) => setParticipantNote(e.target.value)}
                  placeholder="Nhập ghi chú về người tham gia này..."
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                Đóng
              </Button>
              <Button variant="success" onClick={() => handleCheckIn(selectedParticipant.id)}>
                {selectedParticipant.checkedIn ? (
                  <>
                    <UserX size={16} className="me-2" />
                    Hủy điểm danh
                  </>
                ) : (
                  <>
                    <UserCheck size={16} className="me-2" />
                    Điểm danh
                  </>
                )}
              </Button>
              <Button
                variant="primary"
                onClick={saveParticipantNote}
                style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
              >
                <FileText size={16} className="me-2" />
                Lưu ghi chú
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  )
}

export default OrganizationEventAttendance

