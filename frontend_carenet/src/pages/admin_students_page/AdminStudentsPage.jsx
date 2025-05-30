"use client"

import { useState } from "react"
import { Card, Table, Button, Badge, Form, InputGroup, Row, Col, Dropdown } from "react-bootstrap"
import { Search, Filter, Download, UserPlus, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"

const AdminStudents = () => {
  // Sample student data
  const [students, setStudents] = useState([
    {
      id: "STD-1001",
      name: "Nguyễn Văn An",
      email: "an.nguyen@example.com",
      phone: "0901234567",
      program: "Công nghệ thông tin",
      enrollmentDate: "2023-09-01",
      status: "active",
    },
    {
      id: "STD-1002",
      name: "Trần Thị Bình",
      email: "binh.tran@example.com",
      phone: "0912345678",
      program: "Quản trị kinh doanh",
      enrollmentDate: "2023-09-01",
      status: "active",
    },
    {
      id: "STD-1003",
      name: "Lê Văn Cường",
      email: "cuong.le@example.com",
      phone: "0923456789",
      program: "Kế toán",
      enrollmentDate: "2023-09-01",
      status: "inactive",
    },
    {
      id: "STD-1004",
      name: "Phạm Thị Dung",
      email: "dung.pham@example.com",
      phone: "0934567890",
      program: "Marketing",
      enrollmentDate: "2023-09-01",
      status: "pending",
    },
    {
      id: "STD-1005",
      name: "Hoàng Văn Em",
      email: "em.hoang@example.com",
      phone: "0945678901",
      program: "Ngôn ngữ Anh",
      enrollmentDate: "2023-09-01",
      status: "active",
    },
  ])

  // Filter state
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [programFilter, setProgramFilter] = useState("all")

  // Get unique programs for filter
  const programs = [...new Set(students.map((student) => student.program))]

  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    // Search term filter
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Status filter
    const matchesStatus = statusFilter === "all" || student.status === statusFilter

    // Program filter
    const matchesProgram = programFilter === "all" || student.program === programFilter

    return matchesSearch && matchesStatus && matchesProgram
  })

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge bg="success">Đang học</Badge>
      case "inactive":
        return <Badge bg="secondary">Đã nghỉ</Badge>
      case "pending":
        return <Badge bg="warning">Chờ xác nhận</Badge>
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
        <h2 className="mb-0">Quản lý học viên</h2>
        <Button variant="primary">
          <UserPlus size={18} className="me-2" />
          Thêm học viên mới
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
                  placeholder="Tìm kiếm theo tên, email, ID..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Col>
            <Col md={6} lg={8} className="d-flex gap-2 mt-3 mt-md-0">
              <Form.Select className="w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang học</option>
                <option value="inactive">Đã nghỉ</option>
                <option value="pending">Chờ xác nhận</option>
              </Form.Select>

              <Form.Select className="w-auto" value={programFilter} onChange={(e) => setProgramFilter(e.target.value)}>
                <option value="all">Tất cả chương trình</option>
                {programs.map((program, index) => (
                  <option key={index} value={program}>
                    {program}
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
                  <th>Họ và tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Chương trình</th>
                  <th>Ngày nhập học</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td className="fw-medium">{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.phone}</td>
                      <td>{student.program}</td>
                      <td>{new Date(student.enrollmentDate).toLocaleDateString("vi-VN")}</td>
                      <td>{getStatusBadge(student.status)}</td>
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
                    <td colSpan="8" className="text-center py-4">
                      <p className="mb-0 text-muted">Không tìm thấy học viên nào phù hợp với điều kiện tìm kiếm</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <span className="text-muted">
                Hiển thị {filteredStudents.length} / {students.length} học viên
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

export default AdminStudents

