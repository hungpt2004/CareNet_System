import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button, Card, Modal, Descriptions, Avatar, Typography, message, Image } from "antd";
import { User, Mail, Phone, MapPin, Calendar, Eye, Award, BookOpen, Lock, Unlock, FileImage } from "lucide-react";
import styles from "../../css/AppColors.module.css";
import { formatDateVN } from "../../utils/FormatDateVN";
import axios from "../../utils/AxiosInstance";

const { Title } = Typography;

const UserManagement = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      console.log("Fetching users...");
      console.log("Full URL:", axios.defaults.baseURL + "/volunteer/all-users");
      const response = await axios.get("/volunteer/all-users");

      console.log("API Response:", response.data);
      if (!response.data.data) {
        console.warn("No 'data' field in response, checking alternative:", response.data);
        if (response.data.users) {
          setUsers(response.data.users.map(user => ({
            _id: user._id,
            fullname: user.fullname || "Chưa có thông tin",
            email: user.email || "Chưa có email",
            phone: user.phone || "Chưa có số điện thoại",
            avatar: user.avatar || "https://i.pinimg.com/736x/8a/a9/c5/8aa9c5d8429f561000f1de8e7f6d5a32.jpg",
            role: user.role || "volunteer",
            status: user.status || "ready",
            address: user.address || {
              street: "",
              ward: "",
              district: "",
              province: "Da Nang",
            },
            dob: user.dob || null,
            score: user.reputationPoints || 0,
            certificates: user.certificates || [],
            cccdImages: user.cccdImages || [], // Ensure cccdImages is included
            createdAt: user.createdAt || new Date().toISOString(),
          })));
        } else {
          setUsers([]);
        }
        return;
      }

      const formattedUsers = response.data.data.map(user => ({
        _id: user._id,
        fullname: user.fullname || "Chưa có thông tin",
        email: user.email || "Chưa có email",
        phone: user.phone || "Chưa có số điện thoại",
        avatar: user.avatar || "https://i.pinimg.com/736x/8a/a9/c5/8aa9c5d8429f561000f1de8e7f6d5a32.jpg",
        role: user.role || "volunteer",
        status: user.status || "ready",
        address: user.address || {
          street: "",
          ward: "",
          district: "",
          province: "Da Nang",
        },
        dob: user.dob || null,
        score: user.reputationPoints || 0,
        certificates: user.certificates || [],
        cccdImages: user.cccdImages || [], // Ensure cccdImages is included
        createdAt: user.createdAt || new Date().toISOString(),
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Error fetching users:", error.response ? error.response.data : error.message);
      message.error("Lỗi khi tải danh sách người dùng: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showUserDetail = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    setLoading(true);
    try {
      const response = await axios.put(`/volunteer/update-status/${userId}`, { status: currentStatus === "busy" ? "ready" : "busy" });

      message.success(`Tài khoản đã được ${currentStatus === "busy" ? "mở khóa" : "khóa"}`);
      fetchUsers();
    } catch (error) {
      console.error("Error updating status:", error.response ? error.response.data : error.message);
      message.error("Lỗi khi cập nhật trạng thái: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Thông tin",
      dataIndex: "fullname",
      key: "userInfo",
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} size={40} />
          <div>
            <div className="fw-bold">{text}</div>
            <div className="text-muted small">{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => (
        <Space>
          <Phone size={16} />
          <span>{phone}</span>
        </Space>
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        let color = "blue";
        let text = "Tình nguyện viên";

        switch (role) {
          case "admin":
            color = "red";
            text = "Admin";
            break;
          case "organization":
            color = "green";
            text = "Tổ chức";
            break;
          case "staff":
            color = "orange";
            text = "Nhân viên";
            break;
          default:
            color = "blue";
            text = "Tình nguyện viên";
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = status === "busy" ? "red" : "green";
        let text = status === "busy" ? "Khóa" : "Hoạt động";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Điểm",
      dataIndex: "score",
      key: "score",
      render: (score) => (
        <Space>
          <Award size={16} />
          <span>{score}</span>
        </Space>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<Eye size={16} />}
            onClick={() => showUserDetail(record)}
          >
            Xem chi tiết
          </Button>
          <Button
            type={record.status === "busy" ? "primary" : "danger"}
            icon={record.status === "busy" ? <Unlock size={16} /> : <Lock size={16} />}
            onClick={() => handleToggleStatus(record._id, record.status)}
            loading={loading}
          >
            {record.status === "busy" ? "Mở khóa" : "Khóa"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card>
        <div className="mb-4">
          <h2 className={`${styles.textPrimary} display-4`}>Quản lý người dùng</h2>
        </div>
        <Table
          columns={columns}
          dataSource={users}
          loading={loading}
          rowKey="_id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} người dùng`,
          }}
        />
      </Card>

      <Modal
        title={
          <div className="d-flex align-items-center">
            <User size={20} className="me-2" />
            <span>Chi tiết người dùng</span>
          </div>
        }
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Đóng
          </Button>,
        ]}
        width={800}
      >
        {selectedUser && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Ảnh đại diện" span={2}>
              <Avatar src={selectedUser.avatar} size={100} />
            </Descriptions.Item>
            <Descriptions.Item label="Họ và tên" span={2}>
              {selectedUser.fullname}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              <Space>
                <Mail size={16} />
                <span>{selectedUser.email}</span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              <Space>
                <Phone size={16} />
                <span>{selectedUser.phone}</span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ" span={2}>
              <Space>
                <MapPin size={16} />
                <span>
                  {`${selectedUser.address.street || ""}, ${selectedUser.address.ward || ""}, ${
                    selectedUser.address.district || ""
                  }, ${selectedUser.address.province || "Da Nang"}`}
                </span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">
              <Space>
                <Calendar size={16} />
                <span>{selectedUser.dob ? formatDateVN(selectedUser.dob) : "Chưa cập nhật"}</span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Giới tính">
              {selectedUser.gender === "male"
                ? "Nam"
                : selectedUser.gender === "female"
                ? "Nữ"
                : "Chưa cập nhật"}
            </Descriptions.Item>
            <Descriptions.Item label="Vai trò">
              {(() => {
                let color = "blue";
                let text = "Tình nguyện viên";

                switch (selectedUser.role) {
                  case "admin":
                    color = "red";
                    text = "Admin";
                    break;
                  case "organization":
                    color = "green";
                    text = "Tổ chức";
                    break;
                  case "staff":
                    color = "orange";
                    text = "Nhân viên";
                    break;
                  default:
                    color = "blue";
                    text = "Tình nguyện viên";
                }

                return <Tag color={color}>{text}</Tag>;
              })()}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {(() => {
                let color = selectedUser.status === "busy" ? "red" : "green";
                let text = selectedUser.status === "busy" ? "Khóa" : "Hoạt động";
                return <Tag color={color}>{text}</Tag>;
              })()}
            </Descriptions.Item>
            <Descriptions.Item label="Điểm">
              <Space>
                <Award size={16} />
                <span>{selectedUser.score}</span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tham gia">
              <Space>
                <Calendar size={16} />
                <span>{formatDateVN(selectedUser.createdAt)}</span>
              </Space>
            </Descriptions.Item>
            {selectedUser.certificates && selectedUser.certificates.length > 0 && (
              <Descriptions.Item label="Chứng chỉ" span={2}>
                <Space direction="vertical">
                  {selectedUser.certificates.map((cert, index) => (
                    <Space key={index}>
                      <BookOpen size={16} />
                      <span>{cert.name || `Chứng chỉ ${index + 1}`}</span>
                    </Space>
                  ))}
                </Space>
              </Descriptions.Item>
            )}
            {selectedUser.cccdImages && selectedUser.cccdImages.length > 0 && (
              <Descriptions.Item label="Hình ảnh CCCD" span={2}>
                <Space wrap>
                  <FileImage size={16} />
                  {selectedUser.cccdImages.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`CCCD ${index + 1}`}
                      width={100}
                      style={{ marginRight: 8 }}
                      preview
                    />
                  ))}
                </Space>
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;