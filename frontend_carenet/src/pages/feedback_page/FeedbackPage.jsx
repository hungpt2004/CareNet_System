"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Rate,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  notification,
  Typography,
  Card,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import moment from "moment";
import "antd/dist/reset.css";
import axiosInstance from "../../utils/AxiosInstance";

const { Title } = Typography;
const { TextArea } = Input;
const { confirm } = Modal;

const FeedbackPage = () => {
  // CSS styles defined directly in the component
  const styles = {
    pageContainer: {
      padding: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    header: {
      marginBottom: "2rem",
      textAlign: "center",
    },
    title: {
      color: "#0E606E",
      marginBottom: "1rem",
    },
    card: {
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    tableContainer: {
      padding: "1.5rem",
    },
    actionButton: {
      marginRight: "8px",
    },
  };

  // Add CSS to document
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      body {
        background-color: #f5f5f5;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      
      .ant-table-thead > tr > th {
        color: black !important;
      }
      
      .ant-table-tbody > tr:hover > td {
        background-color: rgba(14, 96, 110, 0.05) !important;
      }
      
      .ant-btn-primary {
        background-color: #5DB996 !important;
      }
      
      .ant-btn-primary:hover {
        background-color: #0a4c57 !important;
        border-color: #0a4c57 !important;
      }
      
      .ant-rate-star-full .ant-rate-star-second {
        color: yellow !important;
      }
      
      .table-row-light {
        background-color: #ffffff;
      }
      
      .table-row-dark {
        background-color: #f9f9f9;
      }
      
      .ant-card-head {
        background-color: #0E606E;
        color: white;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchMyFeedback = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get('/volunteer/feedbacks');
      if (response.data.status === 'success' && response.data.feedbacks) {
        setFeedbackData(response.data.feedbacks);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000)
    }
  }

  useEffect(() => {
    fetchMyFeedback();
  }, [])

  // Table columns
  const columns = [
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
    },
    {
      title: "Feedback Date",
      dataIndex: "feedbackDate",
      key: "feedbackDate",
      sorter: (a, b) =>
        moment(a.feedbackDate).unix() - moment(b.feedbackDate).unix(),
      render: (text) => moment(text).format("MMMM D, YYYY"),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => a.rating - b.rating,
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "Action",
      key: "action",
      align: "center", // Ensures buttons are centered inside the column
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small" // Adjust size for better fit
            style={{
              backgroundColor: "#5DB996",
              borderColor: "#5DB996",
              color: "white",
            }}
          >
            Thay đổi
          </Button>

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record.key)}
            size="small" // Adjust size for better fit
            style={{
              color: "#ff4d4f",
              borderColor: "#ff4d4f",
              backgroundColor: "white",
            }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  // Handle edit feedback
  const handleEdit = (record) => {
    setEditingFeedback(record);
    form.setFieldsValue({
      eventName: record.eventName,
      content: record.content,
      feedbackDate: moment(record.feedbackDate),
      rating: record.rating,
    });
    setIsModalVisible(true);
  };

  // Handle delete feedback
  const showDeleteConfirm = (key) => {
    confirm({
      title: "Are you sure you want to delete this feedback?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(key);
      },
    });
  };

  const handleDelete = (key) => {
    setFeedbackData(feedbackData.filter((item) => item.key !== key));
    notification.success({
      message: "Feedback Deleted",
      description: "The feedback has been successfully deleted.",
    });
  };

  // Handle modal OK
  const handleOk = () => {
    form.validateFields().then((values) => {
      const updatedFeedback = {
        ...editingFeedback,
        ...values,
        feedbackDate: values.feedbackDate.format("YYYY-MM-DD"),
      };

      setFeedbackData(
        feedbackData.map((item) =>
          item.key === editingFeedback.key ? updatedFeedback : item
        )
      );

      setIsModalVisible(false);
      setEditingFeedback(null);
      form.resetFields();

      notification.success({
        message: "Feedback Updated",
        description: "Your feedback has been successfully updated.",
      });
    });
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingFeedback(null);
    form.resetFields();
  };

  return (
    <div style={styles.pageContainer}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={styles.header}
      >
        <Title level={2} style={styles.title}>
          {/* Event Feedback Management */}
        </Title>
        {/* <p>View and manage your feedback for various volunteering events</p> */}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-center mb-4">Quản lý đánh giá</h2>
        <Card
          style={styles.card}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            style={styles.tableContainer}
          >
            <Table
              columns={columns}
              dataSource={feedbackData}
              pagination={{ pageSize: 5 }}
              rowKey="key"
              rowClassName={(record, index) =>
                `table-row-${index % 2 === 0 ? "light" : "dark"}`
              }
              bordered
            />
          </motion.div>
        </Card>
      </motion.div>

      {/* Edit Feedback Modal */}
      <Modal
        title="Edit Feedback"
        visible={isModalVisible}
        className="mt-5"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" name="feedbackForm">
          <Form.Item
            name="eventName"
            label="Event Name"
            rules={[
              { required: true, message: "Please input the event name!" },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please input your feedback!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="feedbackDate"
            label="Feedback Date"
            rules={[{ required: true, message: "Please select the date!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please rate the event!" }]}
          >
            <Rate />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FeedbackPage;
