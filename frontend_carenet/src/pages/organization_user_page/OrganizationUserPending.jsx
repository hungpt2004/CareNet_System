import { useState, useEffect, useRef } from "react";
import {
  Table,
  Select,
  Input,
  Button,
  Modal,
  message,
  Tag,
  Typography,
  Form,
  Badge,
  Alert,
  Space,
  Card,
  Tabs,
  Avatar,
  Statistic,
  Row,
  Col,
  Divider,
} from "antd";
import {
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  FilterOutlined,
  UserOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axiosInstance from "../../utils/axiosInstance";
import { CustomSuccessToast, CustomToast } from "../../components/toast/CustomToast";
import CustomSpinner from "../../components/spinner/CustomSpinner";
import io from 'socket.io-client';
import axios from "axios";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

const OrganizationUserPending = () => {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState("all");
  const [events, setEvents] = useState([]);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectForm] = Form.useForm();
  const [rejectingRequestId, setRejectingRequestId] = useState(null);
  const socketRef = useRef(null);
  const [activeTab, setActiveTab] = useState("all");

  // Khởi tạo Socket.IO connection
  useEffect(() => {
    socketRef.current = io('http://localhost:5000', {
      withCredentials: true
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Fetch owned events
  const fetchOwnedEvents = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/organization/get-owned-event');
      if (response.data.status === "success" && response.data.eventData) {
        setEvents(response.data.eventData);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      message.error("Không thể tải danh sách sự kiện");
    } finally {
      setLoading(false);
    }
  };

  // Fetch event registrations
  const fetchEventRegistrations = async (eventId) => {
    try {
      console.log('Fetching event registrations for event:', eventId);
      setLoading(true);
      const response = await axiosInstance.get(`/organization/get-request-pending/${eventId}`);
      if (response.data.status === "success") {
        console.log('Fetched registrations:', response.data.eventRegistrationData);
        setRequests(response.data.eventRegistrationData);
        setFilteredRequests(response.data.eventRegistrationData);
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
      message.error("Không thể tải danh sách yêu cầu");
    } finally {
      setLoading(false);
    }
  };


  console.log(selectedRequest?.user?.fullname)
  console.log(selectedRequest?.user?.email)

  // Approve request
  const handleApprove = async (requestId) => {
    try {
      setLoading(true);
      console.log('Approving request:', { requestId, selectedRequest });

      // Tìm request trong danh sách nếu chưa có trong selectedRequest
      const requestToApprove = selectedRequest || requests.find(r => r._id === requestId);
      if (!requestToApprove) {
        console.error('Request not found:', requestId);
        message.error("Không tìm thấy yêu cầu");
        return;
      }

      // Tương tác API duyệt yêu cầu
      const response = await axios.post(`http://localhost:5000/organization/approve-request/${requestId}`, {
        fullname: requestToApprove.user?.fullname,
        email: requestToApprove.user?.email,
      });
      
      if (response.data.status === "success") {
        console.log('Request approved successfully:', response.data);

        // Gửi thông báo realtime qua Socket.IO
        const eventTitle = events.find(e => e._id === selectedEventId)?.title;
        const notificationData = {
          userId: requestToApprove.user._id,
          eventId: selectedEventId,
          eventTitle: eventTitle,
          message: `Đơn đăng ký tham gia sự kiện "${eventTitle}" đã được duyệt`
        };
        console.log('Emitting Socket.IO notification:', notificationData);
        socketRef.current.emit('requestApproved', notificationData);

        // Đóng modal chi tiết 
        setDetailVisible(false);
        setSelectedRequest(null);
        
        
        await fetchEventRegistrations(selectedEventId);
        console.log('Event registrations refreshed');
        
        CustomSuccessToast("Duyệt yêu cầu thành công");
      }
    } catch (error) {
      console.error("Error approving request:", error);
      message.error("Không thể duyệt yêu cầu");
    } finally {
      setLoading(false);
    }
  };

  // Handle reject request
  const handleReject = async (requestId) => {
    try {
      setLoading(true);
      const values = await rejectForm.validateFields();
      const response = await axios.post(`http://localhost:5000/organization/reject-request/${requestId}`, {
        cancellationReason: values.reason
      });
      if (response.data.status === "success") {
        fetchEventRegistrations(selectedEventId);
        setRejectModalVisible(false);
        rejectForm.resetFields();
      }
      CustomSuccessToast("Từ chối yêu cầu thành công");
    } catch (error) {
      console.error("Error rejecting request:", error);
      message.error("Không thể từ chối yêu cầu");
    } finally {
      setLoading(false);
    }
  };

  // Show reject confirmation modal
  const showRejectModal = (requestId) => {
    setRejectingRequestId(requestId);
    setRejectModalVisible(true);
  };

  // View details
  const handleViewDetails = (request) => {
    console.log("Viewing request details:", request);
    setSelectedRequest(request);
    setDetailVisible(true);
  };

  // Load data when event is selected
  useEffect(() => {
    if (selectedEventId && selectedEventId !== "all") {
      fetchEventRegistrations(selectedEventId);
    } else {
      setRequests([]);
      setFilteredRequests([]);
    }
  }, [selectedEventId]);

  // Load owned events when component mounts
  useEffect(() => {
    fetchOwnedEvents();
  }, []);

  // Search logic
  useEffect(() => {
    if (searchText) {
      const filtered = requests.filter((request) => {
        const user = formatUserData(request.user);
        return (
          user.fullname.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase()) ||
          user.phone.includes(searchText) ||
          user.cccdNumber.includes(searchText)
        );
      });
      setFilteredRequests(filtered);
    } else {
      setFilteredRequests(requests);
    }
  }, [searchText, requests]);

  // Format user data for display
  const formatUserData = (user) => {
    if (!user) return {};
    return {
      fullname: user.fullname || 'N/A',
      email: user.email || 'N/A',
      phone: user.phone || 'N/A',
      cccdNumber: user.cccdNumber || 'N/A',
      dob: user.dob ? new Date(user.dob).toLocaleDateString('vi-VN') : 'N/A',
      isVerified: user.isVerified || false,
      status: user.status || 'ready',
      reputationPoints: user.reputationPoints || 0,
      totalHours: user.totalHours || 0,
      activityPoints: user.activityPoints || 0,
    };
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  // Get status tag
  const getStatusTag = (status) => {
    switch (status) {
      case "approved":
        return (
          <Tag color="success" icon={<CheckCircleOutlined />}>
            Đã duyệt
          </Tag>
        );
      case "pending":
        return (
          <Tag color="processing" icon={<ClockCircleOutlined />}>
            Chờ duyệt
          </Tag>
        );
      case "rejected":
        return (
          <Tag color="error" icon={<CloseCircleOutlined />}>
            Từ chối
          </Tag>
        );
      case "cancelled":
        return (
          <Tag color="default" icon={<CloseCircleOutlined />}>
            Đã hủy
          </Tag>
        );
      default:
        return <Tag>Không xác định</Tag>;
    }
  };

  // Sort logic
  const handleSort = (key) => {
    let order = "ascend";
    if (sortKey === key && sortOrder === "ascend") {
      order = "descend";
    }
    setSortKey(key);
    setSortOrder(order);

    const sorted = [...filteredRequests].sort((a, b) => {
      let valueA, valueB;
      if (key === "registeredAt") {
        valueA = new Date(a[key] || 0).getTime();
        valueB = new Date(b[key] || 0).getTime();
      } else if (key === "status") {
        valueA = a[key] || "";
        valueB = b[key] || "";
      } else if (["fullname", "email", "phone", "cccdNumber", "dob"].includes(key)) {
        valueA = formatUserData(a.user)[key] || "";
        valueB = formatUserData(b.user)[key] || "";
      } else {
        valueA = formatUserData(a.user)[key] || 0;
        valueB = formatUserData(b.user)[key] || 0;
      }

      if (order === "ascend") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    setFilteredRequests(sorted);
  };

  // Render modal content
  const renderModalContent = () => {
    if (!selectedRequest) return null;
    
    const userData = formatUserData(selectedRequest.user);
    
    return (
      <div style={{ padding: "16px 8px" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Title level={2} style={{ color: "#1890ff", marginBottom: "8px" }}>
            Chi tiết yêu cầu đăng ký
          </Title>
          <Paragraph type="secondary">Thông tin chi tiết về người đăng ký và trạng thái yêu cầu</Paragraph>
        </div>

        <Row gutter={24}>
          {/* Thông tin người đăng ký */}
          <Col span={12}>
            <Card
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Thông tin người đăng ký
                </Title>
              }
              bordered={false}
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.09)" }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <Avatar size={80} icon={<UserOutlined />} style={{ backgroundColor: "#1890ff" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <Text type="secondary">Họ và tên:</Text>
                  <div>
                    <Text strong>{userData.fullname}</Text>
                  </div>
                </div>
                <div>
                  <Text type="secondary">Email:</Text>
                  <div>
                    <Text strong>{userData.email}</Text>
                  </div>
                </div>
                <div>
                  <Text type="secondary">Số điện thoại:</Text>
                  <div>
                    <Text strong>{userData.phone}</Text>
                  </div>
                </div>
                <div>
                  <Text type="secondary">CCCD:</Text>
                  <div>
                    <Text strong>{userData.cccdNumber}</Text>
                  </div>
                </div>
                <div>
                  <Text type="secondary">Ngày sinh:</Text>
                  <div>
                    <Text strong>{userData.dob}</Text>
                  </div>
                </div>
                <div>
                  <Text type="secondary">Trạng thái:</Text>
                  <div>
                    <Tag color={userData.status === "ready" ? "success" : "warning"}>
                      {userData.status === "ready" ? "Sẵn sàng" : "Bận"}
                    </Tag>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          {/* Thông tin đăng ký */}
          <Col span={12}>
            <Card
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Thông tin đăng ký
                </Title>
              }
              bordered={false}
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.09)" }}
            >
              <Row gutter={[16, 24]}>
                <Col span={8}>
                  <Statistic title="Điểm uy tín" value={userData.reputationPoints} valueStyle={{ color: "#1890ff" }} />
                </Col>
                <Col span={8}>
                  <Statistic title="Tổng giờ" value={userData.totalHours} valueStyle={{ color: "#52c41a" }} />
                </Col>
                <Col span={8}>
                  <Statistic title="Điểm hoạt động" value={userData.activityPoints} valueStyle={{ color: "#722ed1" }} />
                </Col>
              </Row>

              <Divider />

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <Text type="secondary">ID yêu cầu:</Text>
                  <div>
                    <Text code>{selectedRequest._id}</Text>
                  </div>
                </div>
                <div>
                  <Text type="secondary">Ngày đăng ký:</Text>
                  <div>
                    <Text strong>{formatDate(selectedRequest.registeredAt)}</Text>
                  </div>
                </div>
                <div>
                  <Text type="secondary">Trạng thái yêu cầu:</Text>
                  <div style={{ marginTop: "4px" }}>{getStatusTag(selectedRequest.status)}</div>
                </div>
                {selectedRequest.cancellationReason && (
                  <div>
                    <Text type="danger">Lý do từ chối:</Text>
                    <div style={{ marginTop: "4px", padding: "8px", backgroundColor: "#fff2f0", borderRadius: "4px" }}>
                      <Text type="danger">{selectedRequest.cancellationReason}</Text>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </Col>
        </Row>

        {selectedRequest.status === "pending" && (
          <div style={{ marginTop: "24px", display: "flex", justifyContent: "center", gap: "16px" }}>
            <Button
              type="primary"
              size="large"
              icon={<CheckCircleOutlined />}
              onClick={() => handleApprove(selectedRequest._id)}
              style={{ minWidth: "140px" }}
            >
              Duyệt yêu cầu
            </Button>
            <Button
              danger
              size="large"
              icon={<CloseCircleOutlined />}
              onClick={() => showRejectModal(selectedRequest._id)}
              style={{ minWidth: "140px" }}
            >
              Từ chối
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Table columns
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "user",
      key: "fullname",
      render: (user) => formatUserData(user).fullname,
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("fullname"),
      }),
    },
    {
      title: "Email",
      dataIndex: "user",
      key: "email",
      render: (user) => formatUserData(user).email,
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("email"),
      }),
    },
    {
      title: "Số điện thoại",
      dataIndex: "user",
      key: "phone",
      render: (user) => formatUserData(user).phone,
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("phone"),
      }),
    },
    {
      title: "CCCD",
      dataIndex: "user",
      key: "cccdNumber",
      render: (user) => formatUserData(user).cccdNumber,
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("cccdNumber"),
      }),
    },
    {
      title: "Điểm uy tín",
      dataIndex: "user",
      key: "reputationPoints",
      render: (user) => (
        <span style={{ color: formatUserData(user).reputationPoints > 50 ? "#52c41a" : "#faad14" }}>
          {formatUserData(user).reputationPoints}
        </span>
      ),
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("reputationPoints"),
      }),
    },
    {
      title: "Tổng giờ",
      dataIndex: "user",
      key: "totalHours",
      render: (user) => formatUserData(user).totalHours,
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("totalHours"),
      }),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("status"),
      }),
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "registeredAt",
      key: "registeredAt",
      render: (date) => formatDate(date),
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("registeredAt"),
      }),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          {record.status === "pending" && (
            <>
              <Button type="primary" icon={<CheckCircleOutlined />} onClick={() => handleApprove(record._id)}>
                Duyệt
              </Button>
              <Button danger icon={<CloseCircleOutlined />} onClick={() => showRejectModal(record._id)}>
                Từ chối
              </Button>
            </>
          )}
          <Button icon={<EyeOutlined />} onClick={() => handleViewDetails(record)}>
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <CustomToast />
      <div style={{ padding: "24px", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
        {loading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(255,255,255,0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <CustomSpinner />
          </div>
        )}

        <Card bordered={false} style={{ marginBottom: "24px", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <Title level={2} style={{ margin: 0 }}>
              Quản lý yêu cầu hủy tham gia
            </Title>
            <Badge count={requests.filter(r => r.status === "pending").length} showZero={false} style={{ backgroundColor: "#1890ff" }}>
              <Text type="secondary">Chờ duyệt</Text>
            </Badge>
          </div>

          <Alert
            message={
              <Space align="center">
                <ExclamationCircleOutlined style={{ color: "#faad14" }} />
                <Text strong>Yêu cầu duyệt trước 48h sự kiện diễn ra</Text>
              </Space>
            }
            type="warning"
            showIcon={false}
            style={{ marginBottom: 16, borderRadius: "4px" }}
          />

          <Row gutter={16}>
            <Col xs={24} md={12} lg={16}>
              <Search
                placeholder="Tìm kiếm theo tên, email, số điện thoại hoặc CCCD"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: "100%" }}
                allowClear
                enterButton={
                  <>
                    <SearchOutlined /> Tìm kiếm
                  </>
                }
              />
            </Col>
            <Col xs={24} md={12} lg={8}>
              <Select
                style={{ width: "100%" }}
                value={selectedEventId}
                onChange={(value) => setSelectedEventId(value)}
                placeholder="Chọn sự kiện"
                suffixIcon={<FilterOutlined />}
              >
                <Select.Option value="all">Tất cả sự kiện</Select.Option>
                {events.map((event) => (
                  <Select.Option key={event._id} value={event._id}>
                    {event.title}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Card>

        <Card
          bordered={false}
          style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}
          tabList={[
            { key: "all", tab: `Tất cả (${requests.length})` },
            { key: "pending", tab: `Chờ duyệt (${requests.filter(r => r.status === "pending").length})` },
            { key: "approved", tab: `Đã duyệt (${requests.filter(r => r.status === "approved").length})` },
            { key: "rejected", tab: `Từ chối (${requests.filter(r => r.status === "rejected").length})` },
          ]}
          activeTabKey={activeTab}
          onTabChange={(key) => setActiveTab(key)}
        >
          <Table
            columns={columns}
            dataSource={filteredRequests}
            rowKey="_id"
            pagination={{
              pageSize: 10,
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} yêu cầu`,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50"],
            }}
            locale={{
              emptyText: (
                <div style={{ padding: 32, textAlign: "center" }}>
                  <div style={{ fontSize: 72, color: "#d9d9d9", marginBottom: 16 }}>
                    <UserOutlined />
                  </div>
                  <Text type="secondary" style={{ fontSize: 16 }}>
                    Không tìm thấy yêu cầu nào
                  </Text>
                </div>
              ),
            }}
            rowClassName={(record) => {
              if (record.status === "pending") return "ant-table-row-pending";
              return "";
            }}
          />
        </Card>

        {/* Modal view details */}
        <Modal
          title={null}
          open={detailVisible}
          onCancel={() => setDetailVisible(false)}
          footer={null}
          width={800}
          centered
          bodyStyle={{ padding: "24px" }}
          style={{ borderRadius: "8px" }}
        >
          {renderModalContent()}
        </Modal>

        {/* Reject Confirmation Modal */}
        <Modal
          title={null}
          open={rejectModalVisible}
          onCancel={() => {
            setRejectModalVisible(false);
            rejectForm.resetFields();
          }}
          footer={null}
          width={520}
          centered
          bodyStyle={{ padding: "24px" }}
          style={{ borderRadius: "8px" }}
        >
          <div>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <Title level={3} style={{ color: "#ff4d4f", marginBottom: "8px" }}>
                <CloseCircleOutlined style={{ marginRight: "8px" }} />
                Xác nhận từ chối yêu cầu
              </Title>
              <Paragraph type="secondary">Vui lòng nhập lý do từ chối yêu cầu này</Paragraph>
            </div>

            <Alert
              message="Lưu ý: Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?"
              type="error"
              showIcon
              style={{ marginBottom: "24px" }}
            />

            <Form form={rejectForm} layout="vertical" onFinish={() => handleReject(rejectingRequestId)}>
              <Form.Item
                name="reason"
                label="Lý do từ chối"
                rules={[
                  { required: true, message: "Vui lòng nhập lý do từ chối!" },
                  { min: 10, message: "Lý do từ chối phải có ít nhất 10 ký tự!" },
                ]}
              >
                <Input.TextArea rows={4} placeholder="Nhập lý do từ chối yêu cầu..." style={{ resize: "none" }} />
              </Form.Item>

              <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "24px" }}>
                <Button
                  onClick={() => {
                    setRejectModalVisible(false);
                    rejectForm.resetFields();
                  }}
                  size="large"
                  style={{ minWidth: "120px" }}
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  danger
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  style={{ minWidth: "120px" }}
                  icon={<CloseCircleOutlined />}
                >
                  Xác nhận từ chối
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
      </div>

      <style jsx global>{`
        .ant-table-row-pending {
          background-color: #e6f7ff;
        }
        .ant-table-row-pending:hover > td {
          background-color: #bae7ff !important;
        }
      `}</style>
    </>
  );
};

export default OrganizationUserPending;