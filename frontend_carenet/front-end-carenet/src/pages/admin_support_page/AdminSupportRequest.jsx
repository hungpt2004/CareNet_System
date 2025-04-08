"use client"

import { useState } from "react"
import { Card, Table, Button, Badge, Form, InputGroup, Row, Col, Modal, Tab, Nav } from "react-bootstrap"
import { Search, Filter, Download, Eye, MessageSquare, CheckCircle, Calendar, User, AlertCircle } from "lucide-react"

const AdminSupportRequests = () => {
  // Sample support requests data
  const [requests, setRequests] = useState([
    {
      id: "REQ-1001",
      subject: "Vấn đề về đăng ký khóa học",
      category: "Khóa học & Chương trình đào tạo",
      name: "Nguyễn Văn An",
      email: "an.nguyen@example.com",
      date: "2023-11-15T10:30:00",
      status: "pending",
      priority: "medium",
      message:
        "Tôi không thể đăng ký khóa học Lập trình Web với React. Hệ thống báo lỗi khi tôi nhấn nút đăng ký. Mong được hỗ trợ sớm.",
      responses: [],
    },
    {
      id: "REQ-1002",
      subject: "Yêu cầu hoàn tiền khóa học",
      category: "Học phí & Tài chính",
      name: "Trần Thị Bình",
      email: "binh.tran@example.com",
      date: "2023-11-14T14:45:00",
      status: "in-progress",
      priority: "high",
      message:
        "Tôi muốn yêu cầu hoàn tiền cho khóa học Marketing Số vì lý do cá nhân không thể tham gia. Tôi đã đăng ký và thanh toán vào ngày 10/11/2023.",
      responses: [
        {
          staff: "Lê Thị Hỗ Trợ",
          date: "2023-11-14T15:30:00",
          message:
            "Chào bạn, chúng tôi đã nhận được yêu cầu hoàn tiền của bạn. Vui lòng cung cấp thêm thông tin về phương thức thanh toán và mã giao dịch để chúng tôi xử lý nhanh hơn.",
        },
      ],
    },
    {
      id: "REQ-1003",
      subject: "Không thể truy cập tài liệu khóa học",
      category: "Hỗ trợ kỹ thuật",
      name: "Lê Văn Cường",
      email: "cuong.le@example.com",
      date: "2023-11-13T09:15:00",
      status: "resolved",
      priority: "medium",
      message:
        "Tôi không thể truy cập tài liệu của khóa học Tiếng Anh giao tiếp. Khi tôi nhấp vào phần tài liệu, trang hiển thị lỗi 404. Mong được hỗ trợ để tôi có thể tiếp tục học.",
      responses: [
        {
          staff: "Phạm Văn Kỹ Thuật",
          date: "2023-11-13T10:20:00",
          message:
            "Chào bạn, chúng tôi đã kiểm tra và phát hiện lỗi đường dẫn tài liệu. Vấn đề đã được khắc phục, bạn có thể truy cập lại bình thường.",
        },
        {
          staff: "Lê Văn Cường",
          date: "2023-11-13T11:05:00",
          message: "Cảm ơn đội ngũ hỗ trợ, tôi đã truy cập được tài liệu bình thường.",
        },
      ],
    },
    {
      id: "REQ-1004",
      subject: "Thắc mắc về lịch học",
      category: "Thông tin chung",
      name: "Phạm Thị Dung",
      email: "dung.pham@example.com",
      date: "2023-11-12T16:30:00",
      status: "pending",
      priority: "low",
      message:
        "Tôi muốn biết thêm thông tin về lịch học của khóa Kế toán cơ bản. Liệu có lịch học vào cuối tuần không?",
      responses: [],
    },
    {
      id: "REQ-1005",
      subject: "Yêu cầu cấp lại chứng chỉ",
      category: "Vấn đề khác",
      name: "Hoàng Văn Em",
      email: "em.hoang@example.com",
      date: "2023-11-10T11:45:00",
      status: "resolved",
      priority: "medium",
      message:
        "Tôi đã hoàn thành khóa học Quản trị nhân sự nhưng chưa nhận được chứng chỉ qua email. Mong được hỗ trợ cấp lại.",
      responses: [
        {
          staff: "Nguyễn Thị Hành Chính",
          date: "2023-11-10T14:20:00",
          message:
            "Chào bạn, chúng tôi đã kiểm tra và gửi lại chứng chỉ qua email của bạn. Vui lòng kiểm tra cả thư mục spam.",
        },
        {
          staff: "Hoàng Văn Em",
          date: "2023-11-10T15:10:00",
          message: "Tôi đã nhận được chứng chỉ. Cảm ơn đội ngũ hỗ trợ rất nhiều.",
        },
      ],
    },
  ])

  // Filter state
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [replyText, setReplyText] = useState("")

  // Get unique categories for filter
  const categories = [...new Set(requests.map((request) => request.category))]

  // Filter requests based on search and filters
  const filteredRequests = requests.filter((request) => {
    // Search term filter
    const matchesSearch =
      request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "all" || request.status === statusFilter

    // Category filter
    const matchesCategory = categoryFilter === "all" || request.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge bg="warning">Chờ xử lý</Badge>
      case "in-progress":
        return <Badge bg="info">Đang xử lý</Badge>
      case "resolved":
        return <Badge bg="success">Đã giải quyết</Badge>
      case "closed":
        return <Badge bg="secondary">Đã đóng</Badge>
      default:
        return (
          <Badge bg="light" text="dark">
            Không xác định
          </Badge>
        )
    }
  }

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge bg="danger">Cao</Badge>
      case "medium":
        return <Badge bg="warning">Trung bình</Badge>
      case "low":
        return <Badge bg="info">Thấp</Badge>
      default:
        return (
          <Badge bg="light" text="dark">
            Không xác định
          </Badge>
        )
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("vi-VN", options)
  }

  // View request details
  const viewRequestDetails = (request) => {
    setSelectedRequest(request)
    setShowModal(true)
  }

  // Handle reply submission
  const handleReplySubmit = (e) => {
    e.preventDefault()

    if (!replyText.trim()) return

    // Update the request with the new response
    const updatedRequests = requests.map((req) => {
      if (req.id === selectedRequest.id) {
        const updatedRequest = {
          ...req,
          status: "in-progress",
          responses: [
            ...req.responses,
            {
              staff: "Nhân viên hỗ trợ",
              date: new Date().toISOString(),
              message: replyText,
            },
          ],
        }
        setSelectedRequest(updatedRequest)
        return updatedRequest
      }
      return req
    })

    setRequests(updatedRequests)
    setReplyText("")
  }

  // Mark request as resolved
  const markAsResolved = () => {
    const updatedRequests = requests.map((req) => {
      if (req.id === selectedRequest.id) {
        const updatedRequest = {
          ...req,
          status: "resolved",
        }
        setSelectedRequest(updatedRequest)
        return updatedRequest
      }
      return req
    })

    setRequests(updatedRequests)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Quản lý yêu cầu hỗ trợ</h2>
        <div>
          <Button variant="outline-success" className="me-2">
            <CheckCircle size={18} className="me-2" />
            Báo cáo
          </Button>
          <Button variant="primary">
            <MessageSquare size={18} className="me-2" />
            Gửi thông báo
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="mb-3">
            <Col md={6} lg={4}>
              <InputGroup>
                <InputGroup.Text className="bg-light">
                  <Search size={18} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Tìm kiếm theo tiêu đề, người gửi, ID..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Col>
            <Col md={6} lg={8} className="d-flex gap-2 mt-3 mt-md-0">
              <Form.Select className="w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xử lý</option>
                <option value="in-progress">Đang xử lý</option>
                <option value="resolved">Đã giải quyết</option>
                <option value="closed">Đã đóng</option>
              </Form.Select>

              <Form.Select
                className="w-auto"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">Tất cả danh mục</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>

              <Button variant="outline-secondary">
                <Filter size={18} className="me-2" />
                Lọc nâng cao
              </Button>

              <Button variant="outline-secondary">
                <Download size={18} className="me-2" />
                Xuất dữ liệu
              </Button>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead className="bg-light">
                <tr>
                  <th>ID</th>
                  <th>Tiêu đề</th>
                  <th>Danh mục</th>
                  <th>Người gửi</th>
                  <th>Ngày gửi</th>
                  <th>Độ ưu tiên</th>
                  <th>Trạng thái</th>
                  <th>Phản hồi</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.id}</td>
                      <td className="fw-medium">{request.subject}</td>
                      <td>{request.category}</td>
                      <td>
                        <div>{request.name}</div>
                        <small className="text-muted">{request.email}</small>
                      </td>
                      <td>{formatDate(request.date)}</td>
                      <td>{getPriorityBadge(request.priority)}</td>
                      <td>{getStatusBadge(request.status)}</td>
                      <td>{request.responses.length}</td>
                      <td>
                        <Button
                          variant="light"
                          size="sm"
                          className="border-0"
                          onClick={() => viewRequestDetails(request)}
                        >
                          <Eye size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      <p className="mb-0 text-muted">
                        Không tìm thấy yêu cầu hỗ trợ nào phù hợp với điều kiện tìm kiếm
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
                Hiển thị {filteredRequests.length} / {requests.length} yêu cầu
              </span>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" size="sm" disabled>
                Trước
              </Button>
              <Button variant="primary" size="sm">
                1
              </Button>
              <Button variant="outline-secondary" size="sm" disabled>
                Tiếp
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Request Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" backdrop="static">
        {selectedRequest && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="d-flex align-items-center">
                  {selectedRequest.id}: {selectedRequest.subject}
                  <div className="ms-2">{getStatusBadge(selectedRequest.status)}</div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Container defaultActiveKey="details">
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="details">Chi tiết yêu cầu</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="conversation">
                      Cuộc hội thoại{" "}
                      <Badge bg="primary" className="ms-1">
                        {selectedRequest.responses.length}
                      </Badge>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="details">
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <h6 className="text-muted mb-1">Người gửi</h6>
                          <div className="d-flex align-items-center">
                            <User size={18} className="me-2 text-primary" />
                            <div>
                              <div className="fw-medium">{selectedRequest.name}</div>
                              <div className="text-muted">{selectedRequest.email}</div>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <h6 className="text-muted mb-1">Thời gian gửi</h6>
                          <div className="d-flex align-items-center">
                            <Calendar size={18} className="me-2 text-primary" />
                            <div>{formatDate(selectedRequest.date)}</div>
                          </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <h6 className="text-muted mb-1">Danh mục</h6>
                          <div>{selectedRequest.category}</div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <h6 className="text-muted mb-1">Độ ưu tiên</h6>
                          <div>{getPriorityBadge(selectedRequest.priority)}</div>
                        </div>
                      </Col>
                    </Row>

                    <div className="mb-3">
                      <h6 className="text-muted mb-1">Nội dung yêu cầu</h6>
                      <Card className="bg-light">
                        <Card.Body>
                          <p className="mb-0">{selectedRequest.message}</p>
                        </Card.Body>
                      </Card>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="conversation">
                    <div className="conversation-container mb-3">
                      <div className="initial-message mb-3">
                        <div className="d-flex">
                          <div className="message-avatar me-2">
                            <div
                              className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                              style={{ width: "40px", height: "40px" }}
                            >
                              <User size={20} />
                            </div>
                          </div>
                          <div className="message-content">
                            <div className="message-header d-flex align-items-center mb-1">
                              <span className="fw-medium">{selectedRequest.name}</span>
                              <small className="text-muted ms-2">{formatDate(selectedRequest.date)}</small>
                            </div>
                            <div className="message-body p-3 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                              {selectedRequest.message}
                            </div>
                          </div>
                        </div>
                      </div>

                      {selectedRequest.responses.length > 0 ? (
                        <div className="responses">
                          {selectedRequest.responses.map((response, index) => (
                            <div key={index} className="response-message mb-3">
                              <div className="d-flex">
                                <div className="message-avatar me-2">
                                  <div
                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      backgroundColor: response.staff === "Nhân viên hỗ trợ" ? "#5DB996" : "#f8f9fa",
                                      color: response.staff === "Nhân viên hỗ trợ" ? "white" : "#212529",
                                    }}
                                  >
                                    {response.staff === "Nhân viên hỗ trợ" ? (
                                      <MessageSquare size={20} />
                                    ) : (
                                      <User size={20} />
                                    )}
                                  </div>
                                </div>
                                <div className="message-content">
                                  <div className="message-header d-flex align-items-center mb-1">
                                    <span className="fw-medium">{response.staff}</span>
                                    <small className="text-muted ms-2">{formatDate(response.date)}</small>
                                  </div>
                                  <div
                                    className="message-body p-3 rounded"
                                    style={{
                                      backgroundColor: response.staff === "Nhân viên hỗ trợ" ? "#e6f7f0" : "#f8f9fa",
                                    }}
                                  >
                                    {response.message}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <AlertCircle size={40} className="text-muted mb-2" />
                          <p className="text-muted">Chưa có phản hồi nào cho yêu cầu này</p>
                        </div>
                      )}
                    </div>

                    {selectedRequest.status !== "resolved" && selectedRequest.status !== "closed" && (
                      <Form onSubmit={handleReplySubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phản hồi</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Nhập nội dung phản hồi..."
                          />
                        </Form.Group>
                        <div className="d-flex justify-content-between">
                          <Button variant="primary" type="submit" disabled={!replyText.trim()}>
                            <MessageSquare size={18} className="me-2" />
                            Gửi phản hồi
                          </Button>
                          <Button
                            variant="success"
                            onClick={markAsResolved}
                            disabled={selectedRequest.status === "resolved"}
                          >
                            <CheckCircle size={18} className="me-2" />
                            Đánh dấu đã giải quyết
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Đóng
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  )
}

export default AdminSupportRequests

