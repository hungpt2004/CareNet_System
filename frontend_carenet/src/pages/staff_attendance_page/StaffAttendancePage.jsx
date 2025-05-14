import React, { useState, useEffect } from 'react';
import { Table, Card, Select, Button, Modal, Input, message, Space, Typography, Radio, Tooltip } from 'antd';
import { CheckCircle2, XCircle, Calendar, Building2, AlertCircle } from 'lucide-react';
import axios from 'axios';
import axiosInstance from '../../utils/AxiosInstance';
import { formatDateVN } from '../../utils/FormatDateVN';
import useAuthStore from '../../hooks/authStore';

const { Title, Text } = Typography;
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
  const [attitudeRating, setAttitudeRating] = useState('Good'); // Default to "Good"
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [penaltyPoints, setPenaltyPoints] = useState(0);

  const {logout} = useAuthStore();

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

  const calculatePenaltyPoints = () => {
    return 15; // Always deduct 15 points for absence
  };

  const handleAttendance = async (userId, type) => {
    setSelectedUser(userId);
    setAttendanceType(type);
    setAttitudeRating('Good');
    setAttendanceMessage('');
    
    if (type === 'absent') {
      setPenaltyPoints(calculatePenaltyPoints()); // Set fixed penalty points
      setIsCancelModalVisible(true);
    } else {
      setIsModalVisible(true);
    }
  };

  const handleModalOk = async () => {
    if (!selectedEvent || !selectedUser) return;

    try {
      const response = await axios.post(`/api/attendance/${selectedEvent}`, {
        userId: selectedUser,
        message: attendanceMessage,
        status: attendanceType,
        levelRating: attitudeRating,
        penaltyPoints: attendanceType === 'absent' ? penaltyPoints : 0
      });

      if (response.data.status === 'success') {
        message.success('Điểm danh thành công');
        fetchEventRegistrations(selectedEvent);
      }
    } catch (error) {
      message.error('Điểm danh thất bại');
    }

    setIsModalVisible(false);
    setIsCancelModalVisible(false);
    setAttendanceMessage('');
    setSelectedUser(null);
    setAttitudeRating('Good');
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

      {/* Modal điểm danh */}
      <Modal
        title="Xác nhận điểm danh"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsModalVisible(false);
          setAttendanceMessage('');
          setSelectedUser(null);
          setAttitudeRating('Good');
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text strong>Đánh giá thái độ:</Text>
            <Radio.Group 
              value={attitudeRating} 
              onChange={(e) => setAttitudeRating(e.target.value)}
              style={{ marginLeft: '8px' }}
            >
              <Space direction="vertical">
                <Radio value="Very Good">Rất tốt</Radio>
                <Radio value="Good">Tốt</Radio>
                <Radio value="Average">Trung bình</Radio>
                <Radio value="Bad">Kém</Radio>
                <Radio value="Very Bad">Rất kém</Radio>
              </Space>
            </Radio.Group>
          </div>
          <TextArea
            rows={4}
            placeholder="Nhập ghi chú (nếu có)"
            value={attendanceMessage}
            onChange={(e) => setAttendanceMessage(e.target.value)}
          />
        </Space>
      </Modal>

      {/* Modal vắng mặt */}
      <Modal
        title="Xác nhận vắng mặt"
        open={isCancelModalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setIsCancelModalVisible(false);
          setAttendanceMessage('');
          setSelectedUser(null);
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{gap: '8px', width: '100%', color: '#ff4d4f', textAlign: 'center'}}>
            <div className="alert alert-warning">
              <h5 className="alert-heading">Lưu ý về điểm reputation!</h5>
              <p>Việc vắng mặt sẽ bị trừ 15 điểm reputation.</p>
            </div>
          </div>
          <Text>
            Người dùng sẽ bị trừ 15 điểm do vắng mặt. Điều này sẽ ảnh hưởng đến uy tín của họ.
          </Text>
          <TextArea
            rows={4}
            placeholder="Nhập lý do vắng mặt (nếu có)"
            value={attendanceMessage}
            onChange={(e) => setAttendanceMessage(e.target.value)}
          />
        </Space>
      </Modal>
    </div>
  );
};

export default StaffAttendancePage;
