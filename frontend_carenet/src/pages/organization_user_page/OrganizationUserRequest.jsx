import { useState, useEffect, useRef } from "react";
import { Table, Spin, Select, Input, Button, Modal, message, Tag, Typography, Form } from "antd";
import axiosInstance from "../../utils/AxiosInstance";
import { CustomSuccessToast, CustomToast } from "../../components/toast/CustomToast";
import CustomSpinner from "../../components/spinner/CustomSpinner";
import io from 'socket.io-client';

const OrganizationUserRequests = () => {
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
      const response = await axiosInstance.get(`/organization/get-request-event/${eventId}`);
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

      const response = await axiosInstance.post(`/organization/approve-request/${requestId}`, {
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

        // Đóng modal chi tiết nếu đang mở
        setDetailVisible(false);
        setSelectedRequest(null);
        
        // Refresh data và hiển thị thông báo
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
      const response = await axiosInstance.post(`/organization/reject-request/${requestId}`, {
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
        return <Tag color="success">Đã duyệt</Tag>;
      case "pending":
        return <Tag color="processing">Chờ duyệt</Tag>;
      case "rejected":
        return <Tag color="error">Từ chối</Tag>;
      case "cancelled":
        return <Tag color="default">Đã hủy</Tag>;
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
          <Typography.Title level={2} style={{ color: "#0A6B3D", marginBottom: "8px" }}>
            Chi tiết yêu cầu đăng ký
          </Typography.Title>
          <Typography.Paragraph type="secondary">
            Thông tin chi tiết về người đăng ký và trạng thái yêu cầu
          </Typography.Paragraph>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {/* Thông tin người đăng ký */}
          <div>
            <Typography.Title level={4} style={{ color: "#0A6B3D", marginBottom: "16px" }}>
              Thông tin người đăng ký
            </Typography.Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <Typography.Text strong>Họ và tên:</Typography.Text>
                <Typography.Text style={{ marginLeft: "8px" }}>{userData.fullname}</Typography.Text>
              </div>
              <div>
                <Typography.Text strong>Email:</Typography.Text>
                <Typography.Text style={{ marginLeft: "8px" }}>{userData.email}</Typography.Text>
              </div>
              <div>
                <Typography.Text strong>Số điện thoại:</Typography.Text>
                <Typography.Text style={{ marginLeft: "8px" }}>{userData.phone}</Typography.Text>
              </div>
              <div>
                <Typography.Text strong>CCCD:</Typography.Text>
                <Typography.Text style={{ marginLeft: "8px" }}>{userData.cccdNumber}</Typography.Text>
              </div>
              <div>
                <Typography.Text strong>Ngày sinh:</Typography.Text>
                <Typography.Text style={{ marginLeft: "8px" }}>{userData.dob}</Typography.Text>
              </div>
              <div>
                <Typography.Text strong>Trạng thái:</Typography.Text>
                <Tag color={userData.status === 'ready' ? 'success' : 'warning'} style={{ marginLeft: "8px" }}>
                  {userData.status === 'ready' ? 'Sẵn sàng' : 'Bận'}
                </Tag>
              </div>
            </div>
          </div>

          {/* Thông tin đăng ký */}
          <div>
            <Typography.Title level={4} style={{ color: "#0A6B3D", marginBottom: "16px" }}>
              Thông tin đăng ký
            </Typography.Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <Typography.Text strong>ID yêu cầu:</Typography.Text>
                <Typography.Text style={{ marginLeft: "8px" }}>{selectedRequest._id}</Typography.Text>
              </div>
              <div>
                <Typography.Text strong>Ngày đăng ký:</Typography.Text>
                <Typography.Text style={{ marginLeft: "8px" }}>{formatDate(selectedRequest.registeredAt)}</Typography.Text>
              </div>
              <div>
                <Typography.Text strong>Trạng thái yêu cầu:</Typography.Text>
                <div style={{ marginLeft: "8px", display: "inline-block" }}>
                  {getStatusTag(selectedRequest.status)}
                </div>
              </div>
              {selectedRequest.cancellationReason && (
                <div>
                  <Typography.Text strong style={{ color: "#ff4d4f" }}>Lý do từ chối:</Typography.Text>
                  <Typography.Text style={{ marginLeft: "8px", color: "#ff4d4f" }}>
                    {selectedRequest.cancellationReason}
                  </Typography.Text>
                </div>
              )}
              <div>
                <Typography.Text strong>Điểm uy tín:</Typography.Text>
                <Typography.Text style={{ marginLeft: "8px" }}>{userData.reputationPoints}</Typography.Text>
              </div>
              <div>
                <Typography.Text strong>Tổng giờ:</Typography.Text>
                <Typography.Text style={{ marginLeft: "8px" }}>{userData.totalHours}</Typography.Text>
              </div>
              <div>
                <Typography.Text strong>Điểm hoạt động:</Typography.Text>
                <Typography.Text style={{ marginLeft: "8px" }}>{userData.activityPoints}</Typography.Text>
              </div>
            </div>
          </div>
        </div>

        {selectedRequest.status === "pending" && (
          <div style={{ marginTop: "24px", display: "flex", justifyContent: "center", gap: "16px" }}>
            <Button
              type="primary"
              size="large"
              onClick={() => handleApprove(selectedRequest._id)}
              style={{ minWidth: "120px" }}
            >
              Duyệt yêu cầu
            </Button>
            <Button
              danger
              size="large"
              onClick={() => showRejectModal(selectedRequest._id)}
              style={{ minWidth: "120px" }}
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
      title: "Ngày sinh",
      dataIndex: "user",
      key: "dob",
      render: (user) => formatUserData(user).dob,
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("dob"),
      }),
    },
    {
      title: "Điểm uy tín",
      dataIndex: "user",
      key: "reputationPoints",
      render: (user) => formatUserData(user).reputationPoints,
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
      title: "Điểm hoạt động",
      dataIndex: "user",
      key: "activityPoints",
      render: (user) => formatUserData(user).activityPoints,
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => handleSort("activityPoints"),
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
        <div>
          {record.status === "pending" && (
            <>
              <Button
                type="primary"
                onClick={() => handleApprove(record._id)}
                style={{ marginRight: 8 }}
              >
                Duyệt
              </Button>
              <Button
                danger
                onClick={() => showRejectModal(record._id)}
                style={{ marginRight: 8 }}
              >
                Từ chối
              </Button>
            </>
          )}
          <Button onClick={() => handleViewDetails(record)}>Xem chi tiết</Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <CustomToast/>
      <div>
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255,255,255,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <CustomSpinner/>
        </div>
      )}

      <h2>Quản lý yêu cầu tham gia</h2>

      {/* Search bar */}
      <Input
        placeholder="Tìm kiếm theo tên, email, số điện thoại hoặc CCCD"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: "100%", marginBottom: 16 }}
      />
      
      {/* Select event */}
      <Select
        style={{ width: "100%", marginBottom: 16 }}
        value={selectedEventId}
        onChange={(value) => setSelectedEventId(value)}
      >
        <Select.Option value="all">Tất cả sự kiện</Select.Option>
        {events.map((event) => (
          <Select.Option key={event._id} value={event._id}>
            {event.title}
          </Select.Option>
        ))}
      </Select>

      {/* Table view */}
      <Table
        columns={columns}
        dataSource={filteredRequests}
        rowKey="_id"
        pagination={false}
        locale={{
          emptyText: (
            <div style={{ padding: 32, textAlign: "center", color: "#888" }}>
              Không tìm thấy yêu cầu nào
            </div>
          ),
        }}
      />

      {/* Modal view details */}
      <Modal
        title={null}
        open={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
        width={800}
        centered
        style={{ borderRadius: "16px" }}
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
        style={{ borderRadius: "16px" }}
      >
        <div style={{ padding: "16px 8px" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <Typography.Title level={2} style={{ color: "#ff4d4f", marginBottom: "8px" }}>
              Xác nhận từ chối yêu cầu
            </Typography.Title>
            <Typography.Paragraph type="secondary">
              Vui lòng nhập lý do từ chối yêu cầu này
            </Typography.Paragraph>
          </div>

          <div style={{ 
            padding: "16px", 
            backgroundColor: "#fff2f0", 
            border: "1px solid #ffccc7",
            borderRadius: "8px",
            marginBottom: "24px"
          }}>
            <Typography.Text type="danger">
              Lưu ý: Hành động này không thể hoàn tác. Bạn có chắc chắn muốn tiếp tục?
            </Typography.Text>
          </div>

          <Form
            form={rejectForm}
            layout="vertical"
            onFinish={() => handleReject(rejectingRequestId)}
          >
            <Form.Item
              name="reason"
              label="Lý do từ chối"
              rules={[
                { required: true, message: "Vui lòng nhập lý do từ chối!" },
                { min: 10, message: "Lý do từ chối phải có ít nhất 10 ký tự!" }
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Nhập lý do từ chối yêu cầu..."
                style={{ resize: "none" }}
              />
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
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
              >
                Xác nhận
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
      
    </div>
    </>
  );
};

export default OrganizationUserRequests;