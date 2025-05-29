"use client";

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
  Download,
  UserPlus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Building2,
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

const AdminOrganizationsPending = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null); // 'approve' or 'reject'
  const [rejectReason, setRejectReason] = useState("");

  // Fetch organizations
  const fetchOrganizations = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/admin/get-pending-organization"
      );
      if (response.data.status === "success") {
        setOrganizations(response.data.organizations);
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
      CustomFailedToast("Không thể lấy danh sách tổ chức");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  // Handle view organization details
  const handleViewDetails = (record) => {
    setSelectedOrg(record);
    setShowDetailModal(true);
  };

  // Handle approve organization
  const handleApproveOrganization = async (orgId) => {
    try {
      const response = await axiosInstance.put(
        `/admin/approve-organization-register`,
        {
          organizationId: orgId,
        }
      );
      if (response.data.status === "success") {
        message.success("Đã duyệt tổ chức thành công");
        setShowConfirmModal(false);
        fetchOrganizations(); // Refresh list
        CustomSuccessToast("Đã duyệt tổ chức thành công");
      }
    } catch (error) {
      console.error("Error approving organization:", error);
      message.error("Không thể duyệt tổ chức");
      CustomFailedToast("Không thể duyệt tổ chức");
    }
  };

  // Handle reject organization
  const handleRejectOrganization = async (orgId) => {
    try {
      const response = await axiosInstance.put(
        `/admin/reject-organization-register`,
        {
          organizationId: orgId,
          rejectReason: rejectReason,
        }
      );
      if (response.data.status === "success") {
        message.success("Đã từ chối tổ chức");
        setShowConfirmModal(false);
        setRejectReason("");
        fetchOrganizations(); // Refresh list
        CustomSuccessToast("Đã từ chối tổ chức");
      }
    } catch (error) {
      console.error("Error rejecting organization:", error);
      message.error("Không thể từ chối tổ chức");
      CustomFailedToast("Không thể từ chối tổ chức");
    }
  };

  // Handle confirm action
  const handleConfirmAction = (action, orgId) => {
    setConfirmAction(action);
    setSelectedOrg(organizations.find((org) => org._id === orgId));
    setShowConfirmModal(true);
  };

  // Handle submit confirmation
  const handleSubmitConfirmation = () => {
    if (confirmAction === "approve") {
      handleApproveOrganization(selectedOrg._id);
    } else if (confirmAction === "reject") {
      if (!rejectReason.trim()) {
        message.warning("Vui lòng nhập lý do từ chối");
        return;
      }
      handleRejectOrganization(selectedOrg._id);
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Tag color="success">Đang hoạt động</Tag>;
      case "inactive":
        return <Tag color="default">Chưa kích hoạt</Tag>;
      case "pending":
        return <Tag color="warning">Chờ duyệt</Tag>;
      default:
        return <Tag color="default">Không xác định</Tag>;
    }
  };

  // Table columns configuration
  const columns = [
    {
      title: "Tên tổ chức",
      dataIndex: "name",
      key: "name",
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Trạng thái",
      dataIndex: "organizationStatus",
      key: "organizationStatus",
      render: (status) => getStatusBadge(status),
    },
    {
      title: "Trạng thái duyệt",
      dataIndex: "adminStatus",
      key: "adminStatus",
      render: (status) => getStatusBadge(status),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString("vi-VN"),
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
        <h2 className="mb-0">Quản lý tổ chức</h2>
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
                  placeholder="Tìm kiếm theo tên, email..."
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
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Chưa kích hoạt</option>
                <option value="pending">Chờ duyệt</option>
              </Form.Select>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={organizations}
            rowKey="_id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng số ${total} tổ chức`,
            }}
          />
        </Card.Body>
      </Card>

      {/* Organization Detail Modal */}
      <Modal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết tổ chức</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrg && (
            <div>
              <h4>{selectedOrg.name}</h4>
              <p className="text-muted">{selectedOrg.description}</p>
              <div className="mt-4">
                <h5>Thông tin liên hệ</h5>
                <p>
                  <strong>Số điện thoại:</strong> {selectedOrg.phone}
                </p>
                <p>
                  <strong>Trạng thái:</strong>{" "}
                  {getStatusBadge(selectedOrg.organizationStatus)}
                </p>
                <p>
                  <strong>Trạng thái duyệt:</strong>{" "}
                  {getStatusBadge(selectedOrg.adminStatus)}
                </p>
                <p>
                  <strong>Ngày tạo:</strong>{" "}
                  {new Date(selectedOrg.createdAt).toLocaleDateString("vi-VN")}
                </p>
              </div>

              <div className="mt-4">
                <h5>Giấy phép hoạt động</h5>
                {selectedOrg.licenseDocuments &&
                selectedOrg.licenseDocuments.length > 0 ? (
                  <div className="row g-3">
                    {selectedOrg.licenseDocuments.map((doc, index) => (
                      <div key={index} className="col-md-4">
                        <div
                          className="position-relative cursor-pointer"
                          style={{
                            height: "150px",
                            overflow: "hidden",
                            borderRadius: "8px",
                            border: "1px solid #eee",
                          }}
                        >
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              const preview = document.createElement("div");
                              preview.style.position = "fixed";
                              preview.style.top = 0;
                              preview.style.left = 0;
                              preview.style.width = "100%";
                              preview.style.height = "100%";
                              preview.style.backgroundColor = "rgba(0,0,0,0.8)";
                              preview.style.zIndex = 9999;
                              preview.style.display = "flex";
                              preview.style.alignItems = "center";
                              preview.style.justifyContent = "center";
                              preview.onclick = () =>
                                document.body.removeChild(preview);

                              const img = document.createElement("img");
                              img.src = doc;
                              img.style.maxWidth = "90%";
                              img.style.maxHeight = "90%";
                              img.style.objectFit = "contain";
                              preview.appendChild(img);
                              document.body.appendChild(preview);
                            }}
                          >
                            <Image
                              src={doc}
                              alt={`License Document ${index + 1}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                cursor: "pointer",
                              }}
                            />
                            <div
                              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                              style={{
                                backgroundColor: "rgba(0,0,0,0.3)",
                                opacity: 0,
                                transition: "opacity 0.2s",
                              }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.opacity = 1)
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.opacity = 0)
                              }
                            >
                              <Eye size={24} color="white" />
                            </div>
                          </div>
                        </div>
                        <div className="text-center mt-2 text-muted small">
                          Giấy phép {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">Chưa có giấy phép hoạt động</p>
                )}
              </div>
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
              ? "Xác nhận duyệt tổ chức"
              : "Xác nhận từ chối tổ chức"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrg && (
            <div>
              <p className="mb-3">
                {confirmAction === "approve"
                  ? "Bạn có chắc chắn muốn duyệt tổ chức này?"
                  : "Bạn có chắc chắn muốn từ chối tổ chức này?"}
              </p>
              <p className="fw-bold mb-2">Thông tin tổ chức:</p>
              <p className="mb-1">Tên: {selectedOrg.name}</p>
              <p className="mb-1">Số điện thoại: {selectedOrg.phone}</p>
              <p className="mb-1">
                Ngày tạo:{" "}
                {new Date(selectedOrg.createdAt).toLocaleDateString("vi-VN")}
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
                    placeholder="Nhập lý do từ chối tổ chức..."
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

export default AdminOrganizationsPending;
