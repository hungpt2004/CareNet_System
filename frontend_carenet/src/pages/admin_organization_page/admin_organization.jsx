"use client"

import { useState } from "react"
import { Card, Table, Button, Badge, Form, InputGroup, Row, Col, Dropdown, Modal, Tab, Nav } from "react-bootstrap"
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Users,
  MapPin,
  Calendar,
  Globe,
  Phone,
  Mail,
  Info,
  BarChart2,
} from "lucide-react"

// Sử dụng màu sắc từ AppColors.module.css
const customStyles = {
  primaryColor: "#118b50", // --color-primary
  accentColor: "#5db996", // --color-accent
  accentLightColor: "#e3f0af", // --color-accent-light
  backgroundColor: "#f6f4ef", // --color-background
}

const AdminOrganizations = () => {
  // Dữ liệu mẫu về tổ chức tình nguyện
  const [organizations, setOrganizations] = useState([
    {
      id: "ORG-1001",
      name: "Hội Bảo vệ Môi trường Xanh",
      type: "Môi trường",
      location: "TP. Hồ Chí Minh",
      foundedDate: "2015-05-12",
      members: 145,
      activeProjects: 8,
      status: "active",
      logo: "https://via.placeholder.com/50",
      description:
        "Tổ chức phi lợi nhuận hoạt động trong lĩnh vực bảo vệ môi trường, trồng cây xanh và giáo dục cộng đồng về vấn đề môi trường.",
      contact: {
        email: "info@moitruongxanh.org",
        phone: "028 1234 5678",
        website: "www.moitruongxanh.org",
        address: "123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
      },
      socialMedia: {
        facebook: "facebook.com/moitruongxanh",
        instagram: "instagram.com/moitruongxanh",
        twitter: "twitter.com/moitruongxanh",
      },
      recentEvents: [
        { name: "Ngày hội trồng cây xanh", date: "2023-10-15", participants: 78 },
        { name: "Dọn rác bãi biển Vũng Tàu", date: "2023-09-22", participants: 120 },
        { name: "Hội thảo về biến đổi khí hậu", date: "2023-08-05", participants: 45 },
      ],
    },
    {
      id: "ORG-1002",
      name: "Tình nguyện vì Trẻ em",
      type: "Giáo dục",
      location: "Hà Nội",
      foundedDate: "2010-03-20",
      members: 230,
      activeProjects: 12,
      status: "active",
      logo: "https://via.placeholder.com/50",
      description:
        "Tổ chức hoạt động trong lĩnh vực giáo dục và phát triển trẻ em tại các vùng khó khăn, cung cấp học bổng và xây dựng trường học.",
      contact: {
        email: "contact@tinhnguyenvitreem.org",
        phone: "024 9876 5432",
        website: "www.tinhnguyenvitreem.org",
        address: "45 Trần Duy Hưng, Cầu Giấy, Hà Nội",
      },
      socialMedia: {
        facebook: "facebook.com/tinhnguyenvitreem",
        instagram: "instagram.com/tinhnguyenvitreem",
        twitter: "twitter.com/tinhnguyenvitreem",
      },
      recentEvents: [
        { name: "Xây trường học tại Lào Cai", date: "2023-11-10", participants: 35 },
        { name: "Trao học bổng cho học sinh nghèo", date: "2023-10-05", participants: 50 },
        { name: "Dạy học tình nguyện mùa hè", date: "2023-07-15", participants: 80 },
      ],
    },
    {
      id: "ORG-1003",
      name: "Hỗ trợ Y tế Cộng đồng",
      type: "Y tế",
      location: "Đà Nẵng",
      foundedDate: "2018-09-15",
      members: 95,
      activeProjects: 5,
      status: "active",
      logo: "https://via.placeholder.com/50",
      description:
        "Tổ chức cung cấp dịch vụ y tế miễn phí cho người dân tại các vùng sâu vùng xa, tổ chức khám chữa bệnh và tư vấn sức khỏe.",
      contact: {
        email: "info@ytecongdong.org",
        phone: "0236 7654 321",
        website: "www.ytecongdong.org",
        address: "78 Nguyễn Văn Thoại, Sơn Trà, Đà Nẵng",
      },
      socialMedia: {
        facebook: "facebook.com/ytecongdong",
        instagram: "instagram.com/ytecongdong",
        twitter: "twitter.com/ytecongdong",
      },
      recentEvents: [
        { name: "Khám bệnh miễn phí tại Quảng Nam", date: "2023-11-20", participants: 25 },
        { name: "Tập huấn sơ cấp cứu cơ bản", date: "2023-09-30", participants: 40 },
        { name: "Hiến máu nhân đạo", date: "2023-08-15", participants: 65 },
      ],
    },
    {
      id: "ORG-1004",
      name: "Hỗ trợ Người cao tuổi",
      type: "Xã hội",
      location: "Cần Thơ",
      foundedDate: "2016-11-01",
      members: 75,
      activeProjects: 4,
      status: "inactive",
      logo: "https://via.placeholder.com/50",
      description:
        "Tổ chức hỗ trợ người cao tuổi có hoàn cảnh khó khăn, tổ chức các hoạt động chăm sóc sức khỏe và tinh thần cho người cao tuổi.",
      contact: {
        email: "contact@nguoicaotuoi.org",
        phone: "0292 8765 432",
        website: "www.nguoicaotuoi.org",
        address: "56 Hòa Bình, Ninh Kiều, Cần Thơ",
      },
      socialMedia: {
        facebook: "facebook.com/nguoicaotuoi",
        instagram: "instagram.com/nguoicaotuoi",
        twitter: "twitter.com/nguoicaotuoi",
      },
      recentEvents: [
        { name: "Thăm hỏi người cao tuổi dịp Tết", date: "2023-01-15", participants: 30 },
        { name: "Khám sức khỏe định kỳ", date: "2023-06-10", participants: 45 },
        { name: "Hội thảo về dinh dưỡng cho người cao tuổi", date: "2023-04-22", participants: 35 },
      ],
    },
    {
      id: "ORG-1005",
      name: "Bảo vệ Động vật Hoang dã",
      type: "Động vật",
      location: "Nghệ An",
      foundedDate: "2019-02-28",
      members: 60,
      activeProjects: 3,
      status: "active",
      logo: "https://via.placeholder.com/50",
      description:
        "Tổ chức hoạt động trong lĩnh vực bảo vệ động vật hoang dã, chống buôn bán trái phép và bảo tồn các loài động vật quý hiếm.",
      contact: {
        email: "info@dongvathoangda.org",
        phone: "0238 5432 109",
        website: "www.dongvathoangda.org",
        address: "34 Lê Lợi, Vinh, Nghệ An",
      },
      socialMedia: {
        facebook: "facebook.com/dongvathoangda",
        instagram: "instagram.com/dongvathoangda",
        twitter: "twitter.com/dongvathoangda",
      },
      recentEvents: [
        { name: "Giải cứu động vật hoang dã", date: "2023-10-05", participants: 15 },
        { name: "Tuyên truyền bảo vệ động vật", date: "2023-09-12", participants: 50 },
        { name: "Trồng rừng tạo môi trường sống", date: "2023-07-20", participants: 40 },
      ],
    },
  ])

  // State cho filter và search
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // State cho modal chi tiết
  const [showModal, setShowModal] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState(null)

  // Lấy danh sách các loại tổ chức duy nhất
  const types = [...new Set(organizations.map((org) => org.type))]

  // Lọc tổ chức dựa trên tìm kiếm và bộ lọc
  const filteredOrganizations = organizations.filter((org) => {
    // Lọc theo từ khóa tìm kiếm
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.location.toLowerCase().includes(searchTerm.toLowerCase())

    // Lọc theo loại tổ chức
    const matchesType = typeFilter === "all" || org.type === typeFilter

    // Lọc theo trạng thái
    const matchesStatus = statusFilter === "all" || org.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  // Xử lý thay đổi tìm kiếm
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Lấy badge trạng thái
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge bg="success">Đang hoạt động</Badge>
      case "inactive":
        return <Badge bg="secondary">Tạm ngưng</Badge>
      case "pending":
        return <Badge bg="warning">Chờ duyệt</Badge>
      default:
        return (
          <Badge bg="light" text="dark">
            Không xác định
          </Badge>
        )
    }
  }

  // Xem chi tiết tổ chức
  const viewOrganizationDetails = (organization) => {
    setSelectedOrganization(organization)
    setShowModal(true)
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" }
    return new Date(dateString).toLocaleDateString("vi-VN", options)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Quản lý tổ chức tình nguyện</h2>
        <Button
          variant="primary"
          style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
        >
          <Users size={18} className="me-2" />
          Thêm tổ chức mới
        </Button>
      </div>

      {/* Thống kê tổng quan */}
      <Row className="mb-4">
        <Col md={3} className="mb-3 mb-md-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div
                className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: `${customStyles.accentLightColor}`,
                  color: customStyles.primaryColor,
                }}
              >
                <Users size={24} />
              </div>
              <div>
                <h3 className="mb-0 fw-bold">605</h3>
                <p className="text-muted mb-0">Tổng thành viên</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3 mb-md-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div
                className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: `${customStyles.accentLightColor}`,
                  color: customStyles.primaryColor,
                }}
              >
                <Globe size={24} />
              </div>
              <div>
                <h3 className="mb-0 fw-bold">5</h3>
                <p className="text-muted mb-0">Tổ chức</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3 mb-md-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div
                className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: `${customStyles.accentLightColor}`,
                  color: customStyles.primaryColor,
                }}
              >
                <BarChart2 size={24} />
              </div>
              <div>
                <h3 className="mb-0 fw-bold">32</h3>
                <p className="text-muted mb-0">Dự án đang hoạt động</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3 mb-md-0">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div
                className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: `${customStyles.accentLightColor}`,
                  color: customStyles.primaryColor,
                }}
              >
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="mb-0 fw-bold">5</h3>
                <p className="text-muted mb-0">Khu vực hoạt động</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="mb-3">
            <Col md={6} lg={4}>
              <InputGroup>
                <InputGroup.Text className="bg-light">
                  <Search size={18} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Tìm kiếm theo tên, ID, địa điểm..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Col>
            <Col md={6} lg={8} className="d-flex gap-2 mt-3 mt-md-0">
              <Form.Select className="w-auto" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="all">Tất cả loại tổ chức</option>
                {types.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>

              <Form.Select className="w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Tạm ngưng</option>
                <option value="pending">Chờ duyệt</option>
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
                  <th>Tên tổ chức</th>
                  <th>Loại</th>
                  <th>Địa điểm</th>
                  <th>Ngày thành lập</th>
                  <th>Thành viên</th>
                  <th>Dự án</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrganizations.length > 0 ? (
                  filteredOrganizations.map((org) => (
                    <tr key={org.id}>
                      <td>{org.id}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={org.logo || "/placeholder.svg"}
                            alt={org.name}
                            className="rounded-circle me-2"
                            width="40"
                            height="40"
                          />
                          <div className="fw-medium">{org.name}</div>
                        </div>
                      </td>
                      <td>{org.type}</td>
                      <td>{org.location}</td>
                      <td>{formatDate(org.foundedDate)}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Users size={16} className="me-1 text-muted" />
                          <span>{org.members}</span>
                        </div>
                      </td>
                      <td>{org.activeProjects}</td>
                      <td>{getStatusBadge(org.status)}</td>
                      <td>
                        <Dropdown align="end">
                          <Dropdown.Toggle variant="light" size="sm" className="border-0">
                            <MoreHorizontal size={18} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => viewOrganizationDetails(org)}>
                              <Eye size={16} className="me-2" />
                              Xem chi tiết
                            </Dropdown.Item>
                            <Dropdown.Item href="#edit">
                              <Edit size={16} className="me-2" />
                              Chỉnh sửa
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#delete" className="text-danger">
                              <Trash2 size={16} className="me-2" />
                              Xóa
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      <p className="mb-0 text-muted">Không tìm thấy tổ chức nào phù hợp với điều kiện tìm kiếm</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <span className="text-muted">
                Hiển thị {filteredOrganizations.length} / {organizations.length} tổ chức
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

      {/* Modal Chi tiết tổ chức */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" backdrop="static">
        {selectedOrganization && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="d-flex align-items-center">
                  <img
                    src={selectedOrganization.logo || "/placeholder.svg"}
                    alt={selectedOrganization.name}
                    className="rounded-circle me-2"
                    width="40"
                    height="40"
                  />
                  {selectedOrganization.name}
                  <div className="ms-2">{getStatusBadge(selectedOrganization.status)}</div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Container defaultActiveKey="info">
                <Nav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="info">Thông tin chung</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="members">
                      Thành viên{" "}
                      <Badge bg="primary" className="ms-1">
                        {selectedOrganization.members}
                      </Badge>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="events">
                      Sự kiện gần đây{" "}
                      <Badge bg="primary" className="ms-1">
                        {selectedOrganization.recentEvents.length}
                      </Badge>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="info">
                    <div className="mb-4">
                      <h5 className="mb-3">Mô tả</h5>
                      <p>{selectedOrganization.description}</p>
                    </div>

                    <Row>
                      <Col md={6}>
                        <h5 className="mb-3">Thông tin liên hệ</h5>
                        <div className="mb-2 d-flex align-items-center">
                          <Mail size={18} className="me-2 text-muted" />
                          <span>{selectedOrganization.contact.email}</span>
                        </div>
                        <div className="mb-2 d-flex align-items-center">
                          <Phone size={18} className="me-2 text-muted" />
                          <span>{selectedOrganization.contact.phone}</span>
                        </div>
                        <div className="mb-2 d-flex align-items-center">
                          <Globe size={18} className="me-2 text-muted" />
                          <span>{selectedOrganization.contact.website}</span>
                        </div>
                        <div className="mb-2 d-flex align-items-center">
                          <MapPin size={18} className="me-2 text-muted" />
                          <span>{selectedOrganization.contact.address}</span>
                        </div>
                      </Col>
                      <Col md={6}>
                        <h5 className="mb-3">Thông tin khác</h5>
                        <div className="mb-2 d-flex align-items-center">
                          <Calendar size={18} className="me-2 text-muted" />
                          <span>Ngày thành lập: {formatDate(selectedOrganization.foundedDate)}</span>
                        </div>
                        <div className="mb-2 d-flex align-items-center">
                          <Users size={18} className="me-2 text-muted" />
                          <span>Số thành viên: {selectedOrganization.members}</span>
                        </div>
                        <div className="mb-2 d-flex align-items-center">
                          <BarChart2 size={18} className="me-2 text-muted" />
                          <span>Dự án đang hoạt động: {selectedOrganization.activeProjects}</span>
                        </div>
                        <div className="mb-2 d-flex align-items-center">
                          <Info size={18} className="me-2 text-muted" />
                          <span>Loại tổ chức: {selectedOrganization.type}</span>
                        </div>
                      </Col>
                    </Row>

                    <div className="mt-4">
                      <h5 className="mb-3">Mạng xã hội</h5>
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm">
                          Facebook
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          Instagram
                        </Button>
                        <Button variant="outline-info" size="sm">
                          Twitter
                        </Button>
                      </div>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="members">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">Danh sách thành viên</h5>
                      <div className="d-flex gap-2">
                        <InputGroup size="sm" style={{ width: "250px" }}>
                          <InputGroup.Text className="bg-light">
                            <Search size={14} />
                          </InputGroup.Text>
                          <Form.Control placeholder="Tìm kiếm thành viên..." />
                        </InputGroup>
                        <Button variant="outline-primary" size="sm">
                          Xuất danh sách
                        </Button>
                      </div>
                    </div>

                    <div className="text-center py-5">
                      <Users size={48} className="text-muted mb-3" />
                      <h5>Chức năng đang phát triển</h5>
                      <p className="text-muted">Danh sách chi tiết thành viên sẽ được hiển thị tại đây</p>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="events">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">Sự kiện gần đây</h5>
                      <Button variant="outline-primary" size="sm">
                        Xem tất cả sự kiện
                      </Button>
                    </div>

                    <Table hover>
                      <thead className="bg-light">
                        <tr>
                          <th>Tên sự kiện</th>
                          <th>Ngày tổ chức</th>
                          <th>Số người tham gia</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrganization.recentEvents.map((event, index) => (
                          <tr key={index}>
                            <td>{event.name}</td>
                            <td>{formatDate(event.date)}</td>
                            <td>{event.participants}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                Đóng
              </Button>
              <Button
                variant="primary"
                style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
              >
                <Edit size={16} className="me-2" />
                Chỉnh sửa
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  )
}

export default AdminOrganizations

