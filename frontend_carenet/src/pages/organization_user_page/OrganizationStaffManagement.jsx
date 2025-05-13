import React, { useState } from 'react';
import { Table, Tag, Space, Button, Card, Modal, Descriptions, Avatar, Typography } from 'antd';
import { User, Mail, Phone, MapPin, Calendar, Eye, Award, BookOpen } from 'lucide-react';
import styles from '../../css/AppColors.module.css';
import { formatDateVN } from '../../utils/FormatDateVN';

const { Title } = Typography;

const UserManagement = () => {
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Mock data - sẽ thay thế bằng API call
  const mockUsers = [
    {
      _id: '1',
      fullname: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      phone: '0123456789',
      avatar: 'https://i.pinimg.com/736x/8a/a9/c5/8aa9c5d8429f561000f1de8e7f6d5a32.jpg',
      role: 'volunteer',
      status: 'active',
      address: {
        street: '123 Đường ABC',
        ward: 'Phường XYZ',
        district: 'Quận 1',
        province: 'TP.HCM'
      },
      dateOfBirth: '1990-01-01',
      gender: 'male',
      score: 100,
      certificates: ['Chứng chỉ tình nguyện', 'Chứng chỉ kỹ năng mềm'],
      createdAt: '2024-01-01T00:00:00.000Z'
    },
    // Thêm mock data khác ở đây
  ];

  const showUserDetail = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      title: 'Thông tin',
      dataIndex: 'fullname',
      key: 'userInfo',
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
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => (
        <Space>
          <Phone size={16} />
          <span>{phone}</span>
        </Space>
      ),
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        let color = 'blue';
        let text = 'Tình nguyện viên';
        
        switch(role) {
          case 'admin':
            color = 'red';
            text = 'Admin';
            break;
          case 'organization':
            color = 'green';
            text = 'Tổ chức';
            break;
          default:
            color = 'blue';
            text = 'Tình nguyện viên';
        }
        
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 'active' ? 'green' : 'red';
        let text = status === 'active' ? 'Hoạt động' : 'Không hoạt động';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Điểm',
      dataIndex: 'score',
      key: 'score',
      render: (score) => (
        <Space>
          <Award size={16} />
          <span>{score}</span>
        </Space>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<Eye size={16} />}
            onClick={() => showUserDetail(record)}
          >
            Xem chi tiết
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
          dataSource={mockUsers}
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
          </Button>
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
                  {`${selectedUser.address.street}, ${selectedUser.address.ward}, ${selectedUser.address.district}, ${selectedUser.address.province}`}
                </span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">
              <Space>
                <Calendar size={16} />
                <span>{formatDateVN(selectedUser.dateOfBirth)}</span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Giới tính">
              {selectedUser.gender === 'male' ? 'Nam' : 'Nữ'}
            </Descriptions.Item>
            <Descriptions.Item label="Vai trò">
              {(() => {
                let color = 'blue';
                let text = 'Tình nguyện viên';
                
                switch(selectedUser.role) {
                  case 'admin':
                    color = 'red';
                    text = 'Admin';
                    break;
                  case 'organization':
                    color = 'green';
                    text = 'Tổ chức';
                    break;
                  default:
                    color = 'blue';
                    text = 'Tình nguyện viên';
                }
                
                return <Tag color={color}>{text}</Tag>;
              })()}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {(() => {
                let color = selectedUser.status === 'active' ? 'green' : 'red';
                let text = selectedUser.status === 'active' ? 'Hoạt động' : 'Không hoạt động';
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
                      <span>{cert}</span>
                    </Space>
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