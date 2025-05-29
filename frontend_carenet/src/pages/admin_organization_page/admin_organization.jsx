"use client";

import { useState, useEffect } from "react";
import axios from '../../utils/AxiosInstance';
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
  Modal,
  Tab,
  Nav,
} from "react-bootstrap";
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
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

const customStyles = {
  primaryColor: "#118b50",
  accentColor: "#5db996",
  accentLightColor: "#e3f0af",
  backgroundColor: "#f6f4ef",
};

const AdminOrganizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [organizationLevels, setOrganizationLevels] = useState([]);
  const [newLevelId, setNewLevelId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        console.log("Token:", token ? "Present" : "Missing");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        const [orgResponse, levelsResponse] = await Promise.all([
          axios.get("/organization/get-all-organizations", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/organization/get-all-levels", {
            headers: { Authorization: `Bearer ${token}` },
          }).catch((err) => {
            console.error("Error fetching levels:", err);
            return { data: { data: [] } };
          }),
        ]);
        console.log("API Response (Organizations):", JSON.stringify(orgResponse.data, null, 2));
        const orgData = orgResponse.data.data || [];
        const levelsData = levelsResponse.data.data || [];
        console.log("Organizations data:", orgData);
        setOrganizations(orgData);
        setOrganizationLevels(levelsData);
        if (levelsData.length === 0) {
          console.warn("No organization levels fetched. Check if the backend endpoint is working or if the database has data.");
        }
        setLoading(false);
      } catch (err) {
        console.error("API Error:", {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
          response: err.response ? JSON.stringify(err.response.data, null, 2) : "No response data",
        });
        let errorMessage = err.response?.data?.message || "Không thể tải danh sách tổ chức";
        if (err.response?.status === 401) errorMessage = "Vui lòng đăng nhập lại";
        else if (err.response?.status === 403) errorMessage = "Bạn không có quyền truy cập";
        else if (err.response?.status === 404) errorMessage = "API không tồn tại";
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const fetchMembers = async (organizationId) => {
    try {
      const token = localStorage.getItem("token");
      console.log(`Fetching members for organizationId: ${organizationId}`);
      const response = await axios.get(`/organization/get-members?organizationId=${organizationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API Response (Members):", JSON.stringify(response.data, null, 2));
      const fetchedMembers = response.data.data || [];
      setMembers(fetchedMembers);
      if (fetchedMembers.length === 0) {
        console.warn(`No members found for organizationId: ${organizationId}`);
      }
    } catch (err) {
      console.error("Error fetching members:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      setMembers([]);
      alert("Lỗi khi tải danh sách thành viên: " + (err.response?.data?.message || err.message));
    }
  };

  const fetchEvents = async (organizationId) => {
    try {
      const token = localStorage.getItem("token");
      console.log(`Fetching events for organizationId: ${organizationId}`);
      const response = await axios.get(`/event/events-by-organization?organizationId=${organizationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API Response (Events):", JSON.stringify(response.data, null, 2));
      const fetchedEvents = response.data.data || [];
      setEvents(fetchedEvents);
      if (fetchedEvents.length === 0) {
        console.warn(`No events found for organizationId: ${organizationId}`);
      }
    } catch (err) {
      console.error("Error fetching events:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      setEvents([]);
      alert("Lỗi khi tải danh sách sự kiện: " + (err.response?.data?.message || err.message));
    }
  };

  const updateOrganizationStatus = async (organizationId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "/organization/update-status",
        { organizationId, status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Update status response:", response.data);

      setOrganizations((prev) =>
        prev.map((org) =>
          org._id === organizationId
            ? { ...org, organizationStatus: newStatus }
            : org
        )
      );
      alert("Cập nhật trạng thái thành công!");
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Lỗi khi cập nhật trạng thái: " + (err.response?.data?.message || err.message));
    }
  };

  const updateOrganizationLevel = async () => {
    if (!selectedOrganization || !newLevelId) {
      alert("Vui lòng chọn loại tổ chức mới!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "/organization/update-level",
        { organizationId: selectedOrganization._id, levelId: newLevelId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Update level response:", response.data);

      setOrganizations((prev) =>
        prev.map((org) =>
          org._id === selectedOrganization._id
            ? { ...org, levelId: organizationLevels.find(level => level._id === newLevelId) }
            : org
        )
      );
      alert("Cập nhật loại tổ chức thành công!");
      setNewLevelId("");
      setShowModal(false);
    } catch (err) {
      console.error("Error updating level:", err);
      alert("Lỗi khi cập nhật loại tổ chức: " + (err.response?.data?.message || err.message));
    }
  };

  const openEditModal = (org) => {
  setSelectedOrganization(org);
  setNewLevelId(org.levelId?._id || "");
  setShowModal(true);
};

  const viewOrganizationDetails = (organization) => {
    setSelectedOrganization(organization);
    setMembers([]);
    setEvents([]);
    console.log("Opening details for organization:", organization._id);
    fetchMembers(organization._id);
    fetchEvents(organization._id);
    setShowModal(true);
  };

  const types = [...new Set(organizations
    .filter(org => org.levelId && org.levelId.name)
    .map((org) => org.levelId.name)
  )];
  console.log("Organization types:", types);

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (org.userId?.address?.province && org.userId.address.province.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = typeFilter === "all" || (org.levelId && org.levelId.name === typeFilter);

    const matchesStatus =
      statusFilter === "all" || org.organizationStatus === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });
  console.log("Filtered organizations:", filteredOrganizations);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge bg="success">Đang hoạt động</Badge>;
      case "inactive":
        return <Badge bg="secondary">Tạm ngưng</Badge>;
      case "pending":
        return <Badge bg="warning">Chờ duyệt</Badge>;
      case "hiring":
        return <Badge bg="info">Đang tuyển</Badge>;
      case "processing":
        return <Badge bg="primary">Đang thực hiện</Badge>;
      case "completed":
        return <Badge bg="success">Hoàn thành</Badge>;
      case "cancelled":
        return <Badge bg="danger">Đã hủy</Badge>;
      default:
        return (
          <Badge bg="light" text="dark">
            Không xác định
          </Badge>
        );
    }
  };

  const formatDate = (dateString) => {
    try {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return new Date(dateString).toLocaleDateString("vi-VN", options);
    } catch {
      return "N/A";
    }
  };

  const formatLocation = (location) => {
    if (!location || typeof location !== 'object') return "N/A";
    const { fullAddress } = location;
    return fullAddress || "N/A";
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
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
                <h3 className="mb-0 fw-bold">
                  {organizations.reduce((sum, org) => sum + (org.staffCount || 0), 0)}
                </h3>
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
                  width: "40px",
                  height: "40px",
                  backgroundColor: `${customStyles.accentLightColor}`,
                  color: customStyles.primaryColor,
                }}
              >
                <Globe size={24} />
              </div>
              <div>
                <h3 className="mb-0 fw-bold">{organizations.length}</h3>
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
                  width: "40px",
                  height: "40px",
                  backgroundColor: `${customStyles.accentLightColor}`,
                  color: customStyles.primaryColor,
                }}
              >
                <BarChart2 size={24} />
              </div>
              <div>
                <h3 className="mb-0 fw-bold">
                  {organizations.reduce((sum, org) => sum + (org.eventCount || 0), 0)}
                </h3>
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
                  width: "40px",
                  height: "40px",
                  backgroundColor: `${customStyles.accentLightColor}`,
                  color: customStyles.primaryColor,
                }}
              >
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="mb-0 fw-bold">
                  {[...new Set(organizations
                    .filter(org => org.userId && typeof org.userId === 'object' && org.userId.address && org.userId.address.province)
                    .map((org) => org.userId.address.province)
                  )].length}
                </h3>
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
                  placeholder="Tìm kiếm theo tên, tỉnh/thành..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Col>
            <Col md={6} lg={8} className="d-flex gap-2 mt-3 mt-md-0">
              <Form.Select
                className="w-auto"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">Tất cả loại tổ chức</option>
                {types.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>

              <Form.Select
                className="w-auto"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
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
                  <th>STT</th>
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
                  filteredOrganizations.map((org, index) => {
                    console.log("Rendering organization:", {
                      id: org._id,
                      name: org.name,
                      userId: org.userId,
                      avatar: typeof org.userId === 'object' ? org.userId?.avatar : 'userId is string',
                      staffCount: org.staffCount,
                      eventCount: org.eventCount,
                      status: org.organizationStatus
                    });
                    return (
                      <tr key={org._id}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={typeof org.userId === 'object' && org.userId?.avatar ? org.userId.avatar : "https://via.placeholder.com/50"}
                              alt={org.name || "Organization"}
                              className="rounded-circle me-2"
                              width="40"
                              height="40"
                              onError={(e) => console.log("Image load error for:", typeof org.userId === 'object' ? org.userId?.avatar : 'userId is string', e)}
                            />
                            <div className="fw-medium">{org.name || "N/A"}</div>
                          </div>
                        </td>
                        <td>{org.levelId?.name || "N/A"}</td>
                        <td>{formatLocation(org.userId)}</td>
                        <td>{typeof org.userId === 'object' && org.userId?.dob ? formatDate(org.userId.dob) : "N/A"}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <Users size={16} className="me-1 text-muted" />
                            <span>{org.staffCount || 0}</span>
                          </div>
                        </td>
                        <td>{org.eventCount || 0}</td>
                        <td>{getStatusBadge(org.organizationStatus)}</td>
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
                              <Dropdown.Item onClick={() => openEditModal(org)}>
                                <Edit size={16} className="me-2" />
                                Chỉnh sửa
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => updateOrganizationStatus(org._id, org.organizationStatus)}
                              >
                                {org.organizationStatus === "active" ? (
                                  <>
                                    <ToggleLeft size={16} className="me-2" />
                                    Tạm ngưng
                                  </>
                                ) : (
                                  <>
                                    <ToggleRight size={16} className="me-2" />
                                    Kích hoạt
                                  </>
                                )}
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
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      <p className="mb-0 text-muted">
                        {error || "Không có tổ chức nào để hiển thị"}
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

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" backdrop="static">
        {selectedOrganization && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="d-flex align-items-center">
                  <img
                    src={typeof selectedOrganization.userId === 'object' && selectedOrganization.userId?.avatar ? selectedOrganization.userId.avatar : "https://via.placeholder.com/50"}
                    alt={selectedOrganization.name || "Organization"}
                    className="rounded-circle me-2"
                    width="40"
                    height="40"
                    onError={(e) => console.log("Image load error for:", typeof selectedOrganization.userId === 'object' ? selectedOrganization.userId?.avatar : 'userId is string', e)}
                  />
                  {selectedOrganization.name || "N/A"}
                  <div className="ms-2">{getStatusBadge(selectedOrganization.organizationStatus)}</div>
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
                    <Nav.Link eventKey="edit">Chỉnh sửa</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="members">
                      Thành viên{" "}
                      <Badge bg="primary" className="ms-1">
                        {members.length}
                      </Badge>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="events">
                      Sự kiện gần đây{" "}
                      <Badge bg="primary" className="ms-1">
                        {events.length}
                      </Badge>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content>
                  <Tab.Pane eventKey="info">
                    <div className="mb-4">
                      <h5 className="mb-3">Mô tả</h5>
                      <p>{selectedOrganization.description || "Chưa có mô tả"}</p>
                    </div>

                    <Row>
                      <Col md={6}>
                        <h5 className="mb-3">Thông tin liên hệ</h5>
                        <div className="mb-2 d-flex align-items-center">
                          <Mail size={18} className="me-2 text-muted" />
                          <span>{selectedOrganization.contact?.email || "N/A"}</span>
                        </div>
                        <div className="mb-2 d-flex align-items-center">
                          <Phone size={18} className="me-2 text-muted" />
                          <span>{selectedOrganization.phone || "N/A"}</span>
                        </div>
                        <div className="mb-2 d-flex align-items-center">
                          <Globe size={18} className="me-2 text-muted" />
                          <span>{selectedOrganization.contact?.website || "N/A"}</span>
                        </div>
                        <div className="mb-2 d-flex align-items-center">
                          <MapPin size={18} className="me-2 text-muted" />
                          <span>{formatLocation(selectedOrganization.userId)}</span>
                        </div>
                      </Col>
                      <Col md={6}>
                        <h5 className="mb-3">Thông tin khác</h5>
                        <div className="mb-2 d-flex align-items-center">
                          <Calendar size={18} className="me-2 text-muted" />
                          <span>
                            Ngày thành lập: {typeof selectedOrganization.userId === 'object' && selectedOrganization.userId?.dob ? formatDate(selectedOrganization.userId.dob) : "N/A"}
                          </span>
                        </div>
                        <div className="mb-2 d-flex align-items-center">
                          <Users size={18} className="me-2 text-muted" />
                          <span>Số thành viên: {selectedOrganization.staffCount || 0}</span>
                        </div>
                        <div className="mb-2 d-flex align-items-center">
                          <BarChart2 size={18} className="me-2 text-muted" />
                          <span>Dự án đang hoạt động: {selectedOrganization.eventCount || 0}</span>
                        </div>
                        <div className="mb-2 d-flex align-items-center">
                          <Info size={18} className="me-2 text-muted" />
                          <span>Loại tổ chức: {selectedOrganization.levelId?.name || "N/A"}</span>
                        </div>
                      </Col>
                    </Row>

                    <div className="mt-4">
                      <h5 className="mb-3">Mạng xã hội</h5>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          disabled={!selectedOrganization.socialMedia?.facebook}
                        >
                          Facebook
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          disabled={!selectedOrganization.socialMedia?.instagram}
                        >
                          Instagram
                        </Button>
                        <Button
                          variant="outline-info"
                          size="sm"
                          disabled={!selectedOrganization.socialMedia?.twitter}
                        >
                          Twitter
                        </Button>
                      </div>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="edit">
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Loại tổ chức</Form.Label>
                        <Form.Select
  value={newLevelId}
  onChange={(e) => setNewLevelId(e.target.value)}
>
  <option value="">Chọn loại tổ chức</option>
  {organizationLevels.length > 0 ? (
    organizationLevels.map((level) => (
      <option key={level._id} value={level._id}>
        {level.name} ({level.description})
      </option>
    ))
  ) : (
    <option disabled>Không có loại tổ chức nào</option>
  )}
</Form.Select>
                      </Form.Group>
                      <Button
                        variant="primary"
                        style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
                        onClick={updateOrganizationLevel}
                        disabled={!newLevelId}
                      >
                        Lưu thay đổi
                      </Button>
                    </Form>
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

                    <Table hover>
                      <thead className="bg-light">
                        <tr>
                          <th>STT</th>
                          <th>Hình ảnh</th>
                          <th>Tên</th>
                          <th>Email</th>
                          <th>Vai trò</th>
                        </tr>
                      </thead>
                      <tbody>
                        {members.length > 0 ? (
                          members.map((member, index) => {
                            console.log("Rendering member:", {
                              _id: member._id,
                              fullname: member.fullname,
                              email: member.email,
                              avatar: member.avatar,
                              role: member.role
                            });
                            return (
                              <tr key={member._id}>
                                <td>{index + 1}</td>
                                <td>
                                  <img
                                    src={member.avatar || "https://via.placeholder.com/40"}
                                    alt={member.fullname || "Member"}
                                    className="rounded-circle"
                                    width="40"
                                    height="40"
                                    onError={(e) => console.log("Image load error for:", member.avatar, e)}
                                  />
                                </td>
                                <td>{member.fullname || "N/A"}</td>
                                <td>{member.email || "N/A"}</td>
                                <td>{member.role || "N/A"}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center py-4">
                              <p className="text-muted">Không có thành viên nào</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </Tab.Pane>

                  <Tab.Pane eventKey="events">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">Danh sách sự kiện</h5>
                      <Button variant="outline-primary" size="sm">
                        Xem tất cả sự kiện
                      </Button>
                    </div>

                    <Table hover>
                      <thead className="bg-light">
                        <tr>
                          <th>STT</th>
                          <th>Tiêu đề</th>
                          <th>Trạng thái</th>
                          <th>Ngày bắt đầu</th>
                          <th>Ngày kết thúc</th>
                          <th>Địa điểm</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.length > 0 ? (
                          events.map((event, index) => (
                            <tr key={event._id}>
                              <td>{index + 1}</td>
                              <td>{event.title || "N/A"}</td>
                              <td>{getStatusBadge(event.status)}</td>
                              <td>{event.startAt ? formatDate(event.startAt) : "N/A"}</td>
                              <td>{event.endAt ? formatDate(event.endAt) : "N/A"}</td>
                              <td>{formatLocation(event.location)}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center py-4">
                              <p className="text-muted">Không có sự kiện nào</p>
                            </td>
                          </tr>
                        )}
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
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default AdminOrganizations;