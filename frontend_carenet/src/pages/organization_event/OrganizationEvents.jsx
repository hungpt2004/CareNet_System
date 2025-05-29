import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Card, Typography } from 'antd';
import { Calendar, MapPin, Users, Clock, Eye } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const { Title } = Typography;

const OrganizationEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/events/organization');
      setEvents(response.data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const columns = [
    {
      title: 'Tên sự kiện',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          <Calendar size={16} />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      key: 'location',
      render: (location) => (
        <Space>
          <MapPin size={16} />
          <span>{`${location.street}, ${location.ward}, ${location.district}, ${location.province}`}</span>
        </Space>
      ),
    },
    {
      title: 'Thời gian',
      dataIndex: 'startAt',
      key: 'time',
      render: (_, record) => (
        <Space>
          <Clock size={16} />
          <span>
            {dayjs(record.startAt).format('DD/MM/YYYY HH:mm')} - {dayjs(record.endAt).format('DD/MM/YYYY HH:mm')}
          </span>
        </Space>
      ),
    },
    {
      title: 'Người tham gia',
      dataIndex: 'currentParticipants',
      key: 'participants',
      render: (participants, record) => (
        <Space>
          <Users size={16} />
          <span>{participants}/{record.maxParticipants}</span>
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'green';
        let text = 'Đang diễn ra';
        
        if (status === 'upcoming') {
          color = 'blue';
          text = 'Sắp diễn ra';
        } else if (status === 'finished') {
          color = 'gray';
          text = 'Đã kết thúc';
        }
        
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<Eye size={16} />}
            onClick={() => navigate(`/event-detail/${record._id}`)}
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
          <Title level={4}>Danh sách sự kiện của tổ chức</Title>
        </div>
        <Table
          columns={columns}
          dataSource={events}
          loading={loading}
          rowKey="_id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} sự kiện`,
          }}
        />
      </Card>
    </div>
  );
};

export default OrganizationEvents; 