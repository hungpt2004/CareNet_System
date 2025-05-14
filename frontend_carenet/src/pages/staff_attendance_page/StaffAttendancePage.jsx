import React, { useState, useEffect } from 'react';
import { Table, Card, Select, Button, Modal, Input, message, Space, Typography } from 'antd';
import { CheckCircle2, XCircle, Calendar, Building2 } from 'lucide-react';
import axios from 'axios';
import axiosInstance from '../../utils/AxiosInstance';
import { formatDateVN } from '../../utils/FormatDateVN';

const { Title } = Typography;
const { TextArea } = Input;

const StaffAttendancePage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [attendanceMessage, setAttendanceMessage] = useState('');
  const [attendanceType, setAttendanceType] = useState(''); // 'attended' or 'absent'

  // Fetch events when component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axiosInstance.get('/organization/get-owned-event');
      if (response.data.status === "success" && response.data.eventData) {
        setEvents(response.data.eventData);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      message.error('Không thể tải danh sách sự kiện');
    }
  };

  const fetchEventRegistrations = async (eventId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/organization/get-request-event/${eventId}`);
      if (response.data.status === 'success') {
        setRegistrations(response.data.eventRegistrationData);
      }
    } catch (error) {
      console.error('Error fetching event registrations:', error);
      message.error('Không thể tải danh sách đăng ký');
    } finally {
      setTimeout(() => {
         setLoading(false);
      }, 1000);
    }
  };

  const handleEventChange = (eventId) => {
    setSelectedEvent(eventId);
    fetchEventRegistrations(eventId);
  };

  const handleAttendance = async (userId, type) => {
    setSelectedUser(userId);
    setAttendanceType(type);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    if (!selectedEvent || !selectedUser) return;

    try {
      const response = await axios.post(`/api/attendance/${selectedEvent}`, {
        userId: selectedUser,
        message: attendanceMessage,
        status: attendanceType
      });

      if (response.data.status === 'success') {
        message.success('Điểm danh thành công');
        fetchEventRegistrations(selectedEvent);
      }
    } catch (error) {
      message.error('Điểm danh thất bại');
    }

    setIsModalVisible(false);
    setAttendanceMessage('');
    setSelectedUser(null);
  };

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: ['user', 'fullname'],
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: ['user', 'phone'],
      key: 'phone',
    },
    {
      title: 'Ngày sinh',
      dataIndex: ['user', 'dob'],
      key: 'birthday',
      render: (dob) => {
        if (!dob) return '-';
        const date = new Date(dob);
        return formatDateVN(date);
      },
    },
    {
      title: 'Giới tính',
      dataIndex: ['user', 'gender'],
      key: 'gender',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ 
          color: status === 'approved' ? '#52c41a' : 
                 status === 'pending' ? '#faad14' : '#ff4d4f'
        }}>
          {status === 'approved' ? 'Đã duyệt' : 
           status === 'pending' ? 'Đang chờ' : 'Từ chối'}
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<CheckCircle2 size={16} />}
            onClick={() => handleAttendance(record.user._id, 'attended')}
            disabled={record.status !== 'approved'}
          >
            Điểm danh
          </Button>
          <Button
            danger
            icon={<XCircle size={16} />}
            onClick={() => handleAttendance(record.user._id, 'absent')}
            disabled={record.status !== 'approved'}
          >
            Vắng mặt
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={24} />
            <Title level={4} style={{ margin: 0 }}>Quản lý điểm danh</Title>
          </div>

          <Select
            style={{ width: '100%' }}
            placeholder="Chọn sự kiện"
            onChange={handleEventChange}
            value={selectedEvent}
          >
            {events.map((event) => (
              <Select.Option key={event._id} value={event._id}>
                <Space>
                  <Calendar size={16} />
                  {event.title}
                </Space>
              </Select.Option>
            ))}
          </Select>

          <Table
            columns={columns}
            dataSource={registrations}
            loading={loading}
            rowKey={(record) => record._id}
          />
        </Space>
      </Card>

      <Modal
        title={attendanceType === 'attended' ? 'Xác nhận điểm danh' : 'Xác nhận vắng mặt'}
        className='mt-5'
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          setAttendanceMessage('');
          setSelectedUser(null);
        }}
      >
        <TextArea
          rows={4}
          placeholder="Nhập ghi chú (nếu có)"
          value={attendanceMessage}
          onChange={(e) => setAttendanceMessage(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default StaffAttendancePage;
