"use client"

import { useState } from "react"
import { Card, Table, Button, Badge, Form, InputGroup, Row, Col, Dropdown, ProgressBar } from "react-bootstrap"
import { Search, Filter, Download, MoreHorizontal, Edit, Trash2, Eye, Plus, Users, Clock } from "lucide-react"

const AdminCourses = () => {
  // Sample course data
  const [courses, setCourses] = useState([
    {
      id: "CRS-1001",
      name: "Lập trình Web với React",
      category: "Công nghệ thông tin",
      instructor: "Nguyễn Văn Giảng",
      students: 45,
      maxStudents: 50,
      duration: "12 tuần",
      startDate: "2023-10-01",
      endDate: "2023-12-24",
      status: "active",
      progress: 65,
    },
    {
      id: "CRS-1002",
      name: "Marketing Số",
      category: "Marketing",
      instructor: "Trần Thị Hướng",
      students: 38,
      maxStudents: 40,
      duration: "8 tuần",
      startDate: "2023-09-15",
      endDate: "2023-11-10",
      status: "active",
      progress: 75,
    },
    {
      id: "CRS-1003",
      name: "Kế toán cơ bản",
      category: "Kế toán",
      instructor: "Lê Văn Minh",
      students: 25,
      maxStudents: 30,
      duration: "10 tuần",
      startDate: "2023-11-01",
      endDate: "2024-01-10",
      status: "upcoming",
      progress: 0,
    },
    {
      id: "CRS-1004",
      name: "Tiếng Anh giao tiếp",
      category: "Ngoại ngữ",
      instructor: "Phạm Thị Anh",
      students: 20,
      maxStudents: 25,
      duration: "16 tuần",
      startDate: "2023-08-01",
      endDate: "2023-11-20",
      status: "active",
      progress: 85,
    },
    {
      id: "CRS-1005",
      name: "Quản trị nhân sự",
      category: "Quản trị kinh doanh",
      instructor: "Hoàng Văn Quản",
      students: 15,
      maxStudents: 30,
      duration: "8 tuần",
      startDate: "2023-07-15",
      endDate: "2023-09-10",
      status: "completed",
      progress: 100,
    },
  ])

  // Filter state
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Get unique categories for filter
  const categories = [...new Set(courses.map((course) => course.category))]

  // Filter courses based on search and filters
  const filteredCourses = courses.filter((course) => {
    // Search term filter
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "all" || course.status === statusFilter

    // Category filter
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge bg="success">Đang diễn ra</Badge>
      case "upcoming":
        return <Badge bg="info">Sắp diễn ra</Badge>
      case "completed":
        return <Badge bg="secondary">Đã kết thúc</Badge>
      default:
        return (
          <Badge bg="light" text="dark">
            Không xác định
          </Badge>
        )
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Quản lý khóa học</h2>
        <Button variant="primary">
          <Plus size={18} className="me-2" />
          Thêm khóa học mới
        </Button>
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
                  placeholder="Tìm kiếm theo tên, giảng viên, ID..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Col>
            <Col md={6} lg={8} className="d-flex gap-2 mt-3 mt-md-0">
              <Form.Select className="w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang diễn ra</option>
                <option value="upcoming">Sắp diễn ra</option>
                <option value="completed">Đã kết thúc</option>
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
                  <th>Tên khóa học</th>
                  <th>Danh mục</th>
                  <th>Giảng viên</th>
                  <th>Học viên</th>
                  <th>Thời gian</th>
                  <th>Tiến độ</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <tr key={course.id}>
                      <td>{course.id}</td>
                      <td className="fw-medium">{course.name}</td>
                      <td>{course.category}</td>
                      <td>{course.instructor}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Users size={16} className="me-1 text-muted" />
                          <span>
                            {course.students}/{course.maxStudents}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Clock size={16} className="me-1 text-muted" />
                          <span>{course.duration}</span>
                        </div>
                        <small className="text-muted">
                          {new Date(course.startDate).toLocaleDateString("vi-VN")} -{" "}
                          {new Date(course.endDate).toLocaleDateString("vi-VN")}
                        </small>
                      </td>
                      <td style={{ width: "150px" }}>
                        <ProgressBar
                          now={course.progress}
                          label={`${course.progress}%`}
                          variant={
                            course.progress >= 75
                              ? "success"
                              : course.progress >= 50
                                ? "info"
                                : course.progress >= 25
                                  ? "warning"
                                  : "danger"
                          }
                          style={{ height: "10px" }}
                        />
                      </td>
                      <td>{getStatusBadge(course.status)}</td>
                      <td>
                        <Dropdown align="end">
                          <Dropdown.Toggle variant="light" size="sm" className="border-0">
                            <MoreHorizontal size={18} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item href="#view">
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
                      <p className="mb-0 text-muted">Không tìm thấy khóa học nào phù hợp với điều kiện tìm kiếm</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <span className="text-muted">
                Hiển thị {filteredCourses.length} / {courses.length} khóa học
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
    </div>
  )
}

export default AdminCourses

