import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Badge,
  Form,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  Eye,
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Table, Tag, Space, Image, message } from "antd";
import axiosInstance from "../../utils/AxiosInstance";
import {
  CustomFailedToast,
  CustomSuccessToast,
  CustomToast,
} from "../../components/toast/CustomToast";
import { formatDateVN } from "../../utils/FormatDateVN";
import { formatTimeVN } from "../../utils/FormatTimeVN";

const AdminEventsPending = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // 'approve' or 'reject'
  const [rejectReason, setRejectReason] = useState("");

  // Fetch pending events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/admin/get-pending-event");
      if (response.data.status === "success") {
        setEvents(response.data.events);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      CustomFailedToast("Không thể lấy danh sách sự kiện");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle view event details
  const handleViewDetails = (record) => {
    setSelectedEvent(record);
    setShowDetailModal(true);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "hiring":
        return <Tag color="processing">Đang tuyển</Tag>;
      case "processing":
        return <Tag color="success">Đang diễn ra</Tag>;
      case "completed":
        return <Tag color="default">Đã hoàn thành</Tag>;
      case "cancelled":
        return <Tag color="error">Đã hủy</Tag>;
      default:
        return <Tag color="default">Không xác định</Tag>;
    }
  };

  // Get admin status badge
  const getAdminStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Tag color="success">Đã duyệt</Tag>;
      case "pending":
        return <Tag color="warning">Chờ duyệt</Tag>;
      case "rejected":
        return <Tag color="error">Đã từ chối</Tag>;
      default:
        return <Tag color="default">Không xác định</Tag>;
    }
  };

  // Handle approve event
  const handleApproveEvent = async (eventId) => {
    try {
      const response = await axiosInstance.put(
        `/admin/approve-event-register`,
        {
          eventId: eventId,
        }
      );
      if (response.data.status === "success") {
        message.success("Đã duyệt sự kiện thành công");
        CustomSuccessToast("Đã duyệt sự kiện thành công");
        setShowConfirmModal(false);
        fetchEvents(); // Refresh list
      }
    } catch (error) {
      console.error("Error approving event:", error);
      CustomFailedToast("Không thể duyệt sự kiện");
      message.error("Không thể duyệt sự kiện");
    }
  };

  // Handle reject event
  const handleRejectEvent = async (eventId) => {
    try {
      const response = await axiosInstance.put(`/admin/reject-event-register`, {
        eventId: eventId,
        rejectReason: rejectReason,
      });
      if (response.data.status === "success") {
        message.success("Đã từ chối sự kiện");
        CustomSuccessToast("Đã từ chối sự kiện");
        setShowConfirmModal(false);
        setRejectReason("");
        fetchEvents(); // Refresh list
      }
    } catch (error) {
      console.error("Error rejecting event:", error);
      CustomFailedToast("Không thể từ chối sự kiện");
      message.error("Không thể từ chối sự kiện");
    }
  };

  // Handle confirm action
  const handleConfirmAction = (action, eventId) => {
    setConfirmAction(action);
    setSelectedEvent(events.find((event) => event._id === eventId));
    setShowConfirmModal(true);
  };

  // Handle submit confirmation
  const handleSubmitConfirmation = () => {
    if (confirmAction === "approve") {
      handleApproveEvent(selectedEvent._id);
    } else if (confirmAction === "reject") {
      if (!rejectReason.trim()) {
        message.warning("Vui lòng nhập lý do từ chối");
        return;
      }
      handleRejectEvent(selectedEvent._id);
    }
  };

  // Table columns configuration
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
      width: 100,
      render: (images) => (
        <Image
          src={images?.[0] || "https://via.placeholder.com/100x100"}
          alt="Event"
          width={80}
          height={80}
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
      ),
    },
    {
      title: "Tên sự kiện",
      dataIndex: "title",
      key: "title",
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: "Tổ chức",
      dataIndex: ["organizationId", "name"],
      key: "organization",
    },
    {
      title: "Thời gian",
      dataIndex: "startAt",
      key: "startAt",
      render: (startAt, record) => (
        <Space direction="vertical" size="small">
          <div>{formatDateVN(startAt)}</div>
          <div style={{ color: "#666" }}>
            {formatTimeVN(startAt)} - {formatTimeVN(record.endAt)}
          </div>
        </Space>
      ),
    },
    {
      title: "Địa điểm",
      dataIndex: ["location", "province"],
      key: "location",
      render: (province, record) => (
        <Space>
          <MapPin size={16} style={{ color: "#5DB996" }} />
          {record.location?.fullAddress || province || "Không xác định"}
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusBadge(status),
    },
    {
      title: "Trạng thái duyệt",
      dataIndex: "adminStatus",
      key: "adminStatus",
      render: (status) => getAdminStatusBadge(status),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleViewDetails(record)}
          >
            Chi tiết
          </Button>
          {record.adminStatus === "pending" && (
            <>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => handleConfirmAction("reject", record._id)}
              >
                Từ chối
              </Button>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => handleConfirmAction("approve", record._id)}
              >
                Duyệt
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <CustomToast />

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Quản lý sự kiện</h2>
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
                  placeholder="Tìm kiếm theo tên sự kiện..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6} lg={8} className="d-flex gap-2 mt-3 mt-md-0">
              <Form.Select
                className="w-auto"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="hiring">Đang tuyển</option>
                <option value="processing">Đang diễn ra</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="cancelled">Đã hủy</option>
              </Form.Select>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={events}
            rowKey="_id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng số ${total} sự kiện`,
            }}
          />
        </Card.Body>
      </Card>

      {/* Event Detail Modal */}
      <Modal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết sự kiện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              <div className="text-center mb-4">
                <Image
                  src={
                    selectedEvent.images?.[0] ||
                    "https://via.placeholder.com/400x200"
                  }
                  alt={selectedEvent.title}
                  style={{
                    maxHeight: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </div>

              <h4>{selectedEvent.title}</h4>
              <p className="text-muted">{selectedEvent.description}</p>

              <div className="mt-4">
                <h5>Thông tin sự kiện</h5>
                <div className="d-flex align-items-center mb-2">
                  <Calendar
                    size={18}
                    className="me-2"
                    style={{ color: "#5DB996" }}
                  />
                  <div>
                    <div className="fw-bold">
                      {formatDateVN(selectedEvent.startAt)}
                    </div>
                    <div className="text-muted">
                      {formatTimeVN(selectedEvent.startAt)} -{" "}
                      {formatTimeVN(selectedEvent.endAt)}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-2">
                  <MapPin
                    size={18}
                    className="me-2"
                    style={{ color: "#5DB996" }}
                  />
                  <div>
                    <div className="fw-bold">Địa điểm</div>
                    <div>
                      {selectedEvent.location?.fullAddress || "Không xác định"}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-2">
                  <Users
                    size={18}
                    className="me-2"
                    style={{ color: "#5DB996" }}
                  />
                  <div>
                    <div className="fw-bold">Số người tham gia</div>
                    <div>
                      {selectedEvent.currentParticipants} /{" "}
                      {selectedEvent.maxParticipants} người
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-2">
                  <Building2
                    size={18}
                    className="me-2"
                    style={{ color: "#5DB996" }}
                  />
                  <div>
                    <div className="fw-bold">Tổ chức</div>
                    <div>
                      {selectedEvent.organizationId?.name || "Không xác định"}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-2">
                  <Clock
                    size={18}
                    className="me-2"
                    style={{ color: "#5DB996" }}
                  />
                  <div>
                    <div className="fw-bold">Trạng thái</div>
                    <div>
                      {getStatusBadge(selectedEvent.status)}{" "}
                      {getAdminStatusBadge(selectedEvent.adminStatus)}
                    </div>
                  </div>
                </div>
              </div>

              {selectedEvent.skillNeeds &&
                selectedEvent.skillNeeds.length > 0 && (
                  <div className="mt-4">
                    <h5>Kỹ năng cần thiết</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {selectedEvent.skillNeeds.map((skill, index) => (
                        <Tag key={index} color="blue">
                          {skill}
                        </Tag>
                      ))}
                    </div>
                  </div>
                )}

              {selectedEvent.formData && selectedEvent.formData.questions && (
                <div className="mt-4">
                  <h5>Câu hỏi đăng ký</h5>
                  <div className="list-group">
                    {selectedEvent.formData.questions.map((question, index) => (
                      <div key={index} className="list-group-item">
                        <div className="fw-bold">{question.question}</div>
                        <div className="text-muted">Loại: {question.type}</div>
                        {question.options && question.options.length > 0 && (
                          <div className="mt-2">
                            <div className="fw-bold">Các lựa chọn:</div>
                            <ul className="mb-0">
                              {question.options.map((option, optIndex) => (
                                <li key={optIndex}>{option}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        show={showConfirmModal}
        onHide={() => {
          setShowConfirmModal(false);
          setRejectReason("");
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {confirmAction === "approve"
              ? "Xác nhận duyệt sự kiện"
              : "Xác nhận từ chối sự kiện"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <div>
              <p className="mb-3">
                {confirmAction === "approve"
                  ? "Bạn có chắc chắn muốn duyệt sự kiện này?"
                  : "Bạn có chắc chắn muốn từ chối sự kiện này?"}
              </p>
              <p className="fw-bold mb-2">Thông tin sự kiện:</p>
              <p className="mb-1">Tên: {selectedEvent.title}</p>
              <p className="mb-1">
                Tổ chức: {selectedEvent.organizationId?.name}
              </p>
              <p className="mb-1">
                Thời gian: {formatDateVN(selectedEvent.startAt)}
              </p>

              {confirmAction === "reject" && (
                <Form.Group className="mt-3">
                  <Form.Label>
                    Lý do từ chối <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Nhập lý do từ chối sự kiện..."
                  />
                </Form.Group>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowConfirmModal(false);
              setRejectReason("");
            }}
          >
            Hủy
          </Button>
          <Button
            variant={confirmAction === "approve" ? "success" : "danger"}
            onClick={handleSubmitConfirmation}
          >
            {confirmAction === "approve"
              ? "Xác nhận duyệt"
              : "Xác nhận từ chối"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminEventsPending;
