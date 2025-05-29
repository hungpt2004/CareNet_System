import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Card, Modal, Descriptions, Avatar, Typography, message } from 'antd';
import { User, Mail, Phone, MapPin, Calendar, Eye, Award, BookOpen, X } from 'lucide-react';
import styles from '../../css/AppColors.module.css';
import { formatDateVN } from '../../utils/FormatDateVN';
import axios from 'axios';
import axiosInstance from '../../utils/AxiosInstance';

const { Title } = Typography;

const OrganizationStaffManagement = () => {
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/organization/get-owned-staff');
      
      if (response.data.status === 'success' && response.data.staff) {
        setStaffData(response.data.staff);
      } else {
        message.error('Failed to fetch staff data');
      }
    } catch (error) {
      console.error('Error fetching staff data:', error);
      message.error('Failed to fetch staff data');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

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
          case 'staff':
            color = 'purple';
            text = 'Nhân viên';
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
        let color = status === 'ready' ? 'green' : 'red';
        let text = status === 'ready' ? 'Sẵn sàng' : 'Bận';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Điểm uy tín',
      dataIndex: 'reputationPoints',
      key: 'reputationPoints',
      render: (points) => (
        <Space>
          <Award size={16} />
          <span>{points}</span>
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
          <Button 
            type="primary"
            danger 
            icon={<X size={16} />}
            onClick={() => showUserDetail(record)}
          >
            Xóa thông tin
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div>
        <div className="mb-4">
          <h3 className={`${styles.textPrimary} display-4`}>Quản lý nhân viên</h3>
        </div>
        <Table
          columns={columns}
          dataSource={staffData}
          loading={loading}
          rowKey="_id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} nhân viên`,
          }}
        />
      </div>

      <Modal
        title={
          <div className="d-flex align-items-center">
            <User size={20} className="me-2" />
            <span>Chi tiết nhân viên</span>
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
                  {selectedUser.address && `${selectedUser.address.province}, ${selectedUser.address.country}`}
                </span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">
              <Space>
                <Calendar size={16} />
                <span>{formatDateVN(selectedUser.dob)}</span>
              </Space>
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
                  case 'staff':
                    color = 'purple';
                    text = 'Nhân viên';
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
                let color = selectedUser.status === 'ready' ? 'green' : 'red';
                let text = selectedUser.status === 'ready' ? 'Sẵn sàng' : 'Bận';
                return <Tag color={color}>{text}</Tag>;
              })()}
            </Descriptions.Item>
            <Descriptions.Item label="Điểm uy tín">
              <Space>
                <Award size={16} />
                <span>{selectedUser.reputationPoints}</span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Tổng giờ tham gia">
              <Space>
                <Calendar size={16} />
                <span>{selectedUser.totalHours} giờ</span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Điểm hoạt động">
              <Space>
                <Award size={16} />
                <span>{selectedUser.activityPoints}</span>
              </Space>
            </Descriptions.Item>
            {selectedUser.hobbies && selectedUser.hobbies.length > 0 && (
              <Descriptions.Item label="Sở thích" span={2}>
                <Space wrap>
                  {selectedUser.hobbies.map((hobby, index) => (
                    <Tag key={index} color="blue">{hobby}</Tag>
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

export default OrganizationStaffManagement;