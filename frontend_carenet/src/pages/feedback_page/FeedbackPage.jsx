
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
  CalendarOutlined,
  StarFilled,
  FileTextOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import moment from "moment";
// import "antd/dist/reset.css";
import axiosInstance from "../../utils/AxiosInstance";
import {
  CustomFailedToast,
  CustomSuccessToast,
  CustomToast,
} from "../../components/toast/CustomToast";
import Swal from "sweetalert2";
const { Title } = Typography;
const { TextArea } = Input;
const { confirm } = Modal;

const FeedbackPage = () => {
  const [isSaving, setIsSaving] = useState(false);
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

  // Feedback data from API
  const [feedbackData, setFeedbackData] = useState([]);

  React.useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axiosInstance.get("/feedback/get-all-feedback-for-current-user");
        if (res.data && res.data.status === "success" && Array.isArray(res.data.feedbacks)) {
          // Map API data to table format, include feedbackId for update/delete
          const mapped = res.data.feedbacks.map((fb, idx) => ({
            key: idx + 1,
            feedbackId: fb._id, // store feedbackId for API calls
            eventName: fb.eventTitle || "",
            content: fb.content,
            feedbackDate: fb.createdAt,
            rating: fb.rating,
          }));
          setFeedbackData(mapped);
        }
      } catch (err) {
        CustomFailedToast("Không thể tải danh sách đánh giá.");
      }
    };
    fetchFeedbacks();
  }, []);

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Table columns with icons
  const columns = [
    {
      title: (
        <span>
          <AppstoreOutlined style={{ color: '#0E606E', marginRight: 6 }} />
          Event Name
        </span>
      ),
      dataIndex: "eventName",
      key: "eventName",
      sorter: (a, b) => a.eventName.localeCompare(b.eventName),
    },
    {
      title: (
        <span>
          <FileTextOutlined style={{ color: '#0E606E', marginRight: 6 }} />
          Content
        </span>
      ),
      dataIndex: "content",
      key: "content",
      ellipsis: true,
    },
    {
      title: (
        <span>
          <CalendarOutlined style={{ color: '#0E606E', marginRight: 6 }} />
          Feedback Date
        </span>
      ),
      dataIndex: "feedbackDate",
      key: "feedbackDate",
      sorter: (a, b) =>
        moment(a.feedbackDate).unix() - moment(b.feedbackDate).unix(),
      render: (text) => moment(text).format("MMMM D, YYYY"),
    },
    {
      title: (
        <span>
          <StarFilled style={{ color: '#FFD700', marginRight: 6 }} />
          Rating
        </span>
      ),
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => a.rating - b.rating,
      render: (rating) => <Rate disabled value={rating} />,
    },
    {
      title: (
        <span>
          <EditOutlined style={{ color: '#0E606E', marginRight: 6 }} />
          Action
        </span>
      ),
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
            onClick={() => showDeleteConfirm(record.feedbackId)}
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
      feedbackDate: moment(record.feedbackDate).format("YYYY-MM-DD"),
      rating: record.rating,
    });
    setIsModalVisible(true);
  };

  // Handle delete feedback
  const showDeleteConfirm = (feedbackId) => {
    Swal.fire({
      title: "Bạn đã chắc chắn chưa?",
      text: "Bạn muốn xóa bài đánh giá này? Hành động này không thể hoàn tác.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Vâng, hãy xóa nó!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(feedbackId);
      }
    });
  };

  const handleDelete = async (feedbackId) => {
    console.log('handleDelete called with feedbackId:', feedbackId);
    // Find the feedback by feedbackId
    const feedback = feedbackData.find((item) => item.feedbackId === feedbackId);
    if (!feedback) {
      CustomFailedToast("Không tìm thấy đánh giá để xóa.");
      return;
    }
    try {
      const res = await axiosInstance.delete(`/feedback/delete-feedback/${feedbackId}`);
      if (res.data && res.data.message) {
        setFeedbackData(feedbackData.filter((item) => item.feedbackId !== feedbackId));
        CustomSuccessToast(res.data.message || "Xóa đánh giá thành công.");
      } else {
        CustomFailedToast("Xóa đánh giá thất bại.");
      }
    } catch (err) {
      CustomFailedToast(err?.response?.data?.message || "Xóa đánh giá thất bại.");
    }
  };

  // Handle modal OK
  const handleOk = async () => {
    setIsSaving(true);
    try {
      const values = await form.validateFields();
      // Find the feedbackId by key
      const feedback = feedbackData.find((item) => item.key === editingFeedback.key);
      if (!feedback) {
        CustomFailedToast("Không tìm thấy đánh giá để cập nhật.");
        setIsSaving(false);
        return;
      }
      // Call API to update feedback
      await axiosInstance.put(`/feedback/update-feedback/${feedback.feedbackId}`, {
        content: values.content,
        rating: values.rating,
      });
      // Update local state
      const updatedFeedback = {
        ...editingFeedback,
        ...values,
        feedbackDate: values.feedbackDate,
      };
      setFeedbackData(
        feedbackData.map((item) =>
          item.key === editingFeedback.key ? updatedFeedback : item
        )
      );
      setIsModalVisible(false);
      setEditingFeedback(null);
      form.resetFields();
      CustomSuccessToast("Cập nhật đánh giá thành công.");
    } catch (err) {
      CustomFailedToast(
        err?.response?.data?.message || "Cập nhật đánh giá thất bại."
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingFeedback(null);
    form.resetFields();
  };

  return (
    <>
      <CustomToast />
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
          <h2 className="text-center mb-4">QUẢN LÍ ĐÁNH GIÁ</h2>
          <Card style={styles.card}>
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
          title="Sửa Đánh Giá "
          open={isModalVisible}
          className="mt-5"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk} disabled={isSaving} style={{ minWidth: 80 }}>
              {isSaving ? (
                <span>
                  <span className="ant-spin ant-spin-sm ant-spin-spinning" role="img" style={{ marginRight: 8 }}>
                    <span className="ant-spin-dot ant-spin-dot-spin">
                      <i className="ant-spin-dot-item" />
                      <i className="ant-spin-dot-item" />
                      <i className="ant-spin-dot-item" />
                      <i className="ant-spin-dot-item" />
                    </span>
                  </span>
                  Đang lưu...
                </span>
              ) : (
                "Lưu"
              )}
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical" name="feedbackForm" requiredMark={false}>
            <Form.Item
              name="eventName"
              label={<span><AppstoreOutlined style={{ color: '#0E606E', marginRight: 6 }} />Tên sự kiện</span>}
              rules={[
                { required: true, message: "Please input the event name!" },
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="content"
              label={<span><FileTextOutlined style={{ color: '#0E606E', marginRight: 6 }} />Bài đánh giá</span>}
              rules={[
                { required: true, message: "Please input your feedback!" },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name="feedbackDate"
              label={<span><CalendarOutlined style={{ color: '#0E606E', marginRight: 6 }} />Ngày đánh giá</span>}
              rules={[{ required: true, message: "Please select the date!" }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="rating"
              label={<span><StarFilled style={{ color: '#FFD700', marginRight: 6 }} />Số sao</span>}
              rules={[{ required: true, message: "Please rate the event!" }]}
            >
              <Rate allowHalf />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default FeedbackPage;
