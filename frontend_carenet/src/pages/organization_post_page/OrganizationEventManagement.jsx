import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Card, Typography, message, Spin, Modal, Descriptions } from 'antd';
import { Calendar, MapPin, Users, Clock, Eye, Info, DollarSign, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axiosInstance from '../../utils/AxiosInstance';
import styles from '../../css/AppColors.module.css'
import { formatDateVN } from '../../utils/FormatDateVN';

const OrganizationEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      setLoading(true);
      console.log('Fetching events...'); // Debug log
      const response = await axiosInstance.get('/event/get-finished-events');
      console.log('API Response:', response.data); // Debug log
      
      if(response.data.status === "success" && response.data.events){
        setEvents(response.data.events);
      } else {
        message.error('Không thể lấy dữ liệu sự kiện');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      message.error('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  console.log(JSON.stringify(events));

  useEffect(() => {
    console.log('Component mounted'); // Debug log
    fetchEvents();
  }, []);

  const showEventDetail = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedEvent(null);
  };

  const columns = [
    {
      title: 'Tên sự kiện',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
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
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'blue';
        let text = 'Đang tuyển';
        
        switch(status) {
          case 'hiring':
            color = 'blue';
            text = 'Đang tuyển';
            break;
          case 'processing':
            color = 'green';
            text = 'Đang diễn ra';
            break;
          case 'completed':
            color = 'gray';
            text = 'Đã hoàn thành';
            break;
          case 'cancelled':
            color = 'red';
            text = 'Đã hủy';
            break;
          default:
            color = 'blue';
            text = 'Đang tuyển';
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
            onClick={() => showEventDetail(record)}
          >
            Xem chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">

      {/* Table danh sách sự kiện */}
      <Card>
        <div className="mb-4">
          <h2 className={`${styles.textPrimary} fw-bold`}>Danh sách sự kiện của tổ chức</h2>
        </div>
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={events}
            rowKey="_id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng số ${total} sự kiện`,
            }}
          />
        </Spin>
      </Card>

      {/* Modal hiện thông tin chi tiết sự kiện */}
      <Modal
        title={
          <div className="d-flex align-items-center">
            <Info size={20} className="me-2" />
            <span>Chi tiết sự kiện</span>
          </div>
        }
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Đóng
          </Button>,
          <Button 
            key="view" 
            type="primary" 
            onClick={() => {
              handleCloseModal();
              navigate(`/event-detail/${selectedEvent?._id}`);
            }}
          >
            Xem trang chi tiết
          </Button>
        ]}
        width={800}
      >
        {selectedEvent && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Tên sự kiện" span={2}>
              {selectedEvent.title}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả" span={2}>
              {selectedEvent.description}
            </Descriptions.Item>
            <Descriptions.Item label="Địa điểm">
              <Space>
                <MapPin size={16} />
                <span>
                  {`${selectedEvent.location.street}, ${selectedEvent.location.ward}, ${selectedEvent.location.district}, ${selectedEvent.location.province}`}
                </span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian">
              <Space>
                <Clock size={16} />
                <span>
                  {formatDateVN(selectedEvent.startAt)} - {formatDateVN(selectedEvent.endAt)}
                </span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Số người tham gia">
              <Space>
                <Users size={16} />
                <span>{selectedEvent.currentParticipants}/{selectedEvent.maxParticipants}</span>
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {(() => {
                let color = 'blue';
                let text = 'Đang tuyển';
                
                switch(selectedEvent.status) {
                  case 'hiring':
                    color = 'blue';
                    text = 'Đang tuyển';
                    break;
                  case 'processing':
                    color = 'green';
                    text = 'Đang diễn ra';
                    break;
                  case 'completed':
                    color = 'gray';
                    text = 'Đã hoàn thành';
                    break;
                  case 'cancelled':
                    color = 'red';
                    text = 'Đã hủy';
                    break;
                  default:
                    color = 'blue';
                    text = 'Đang tuyển';
                }
                
                return <Tag color={color}>{text}</Tag>;
              })()}
            </Descriptions.Item>
            {selectedEvent.requirements && (
              <Descriptions.Item label="Yêu cầu" span={2}>
                <Space>
                  <FileText size={16} />
                  <span>{selectedEvent.requirements}</span>
                </Space>
              </Descriptions.Item>
            )}
            {selectedEvent.budget && (
              <Descriptions.Item label="Ngân sách" span={2}>
                <Space>
                  <DollarSign size={16} />
                  <span>{selectedEvent.budget}</span>
                </Space>
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>

    </div>
  );
};

export default OrganizationEvents;