"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Pagination,
  Form,
  Toast,
} from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, Rate } from "antd";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";
// import useAuthStore from "../../hooks/authStore";
import {
  CustomFailedToast,
  CustomSuccessToast,
  CustomToast,
} from "../../components/toast/CustomToast";
import defaultAvatar from "../../assets/defaultAvatar.png";
const ProfileHistory = () => {
  // Spinner state for feedback submit
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  // CSS styles defined directly in the component
  const styles = {
    root: {
      "--primary-color": "#0E606E",
    },
    accountContainer: {
      minHeight: "100vh",
      padding: "2rem 0",
    },
    sidebarCard: {
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      border: "none",
    },
    userProfile: {
      borderBottom: "1px solid #eee",
      display: "flex",
      alignItems: "center",
      padding: "1rem",
    },
    avatar: {
      border: "2px solid #0E606E",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      marginRight: "1rem",
    },
    userName: {
      marginBottom: "0.2rem",
      fontSize: "1.1rem",
      fontWeight: "bold",
    },
    accountType: {
      color: "#6c757d",
      fontSize: "0.875rem",
      margin: 0,
    },
    userInfo: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    menuItems: {
      padding: "0.5rem 0",
    },
    menuItem: {
      padding: "0.75rem 1.5rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
    },
    menuItemHover: {
      backgroundColor: "rgba(14, 96, 110, 0.1)",
    },
    menuItemActive: {
      backgroundColor: "#0E606E",
      color: "white",
      fontWeight: "500",
    },
    infoCard: {
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      border: "none",
    },
    infoHeader: {
      backgroundColor: "#0E606E",
      color: "white",
      padding: "1rem 1.5rem",
    },
    infoCardBody: {
      padding: "1.5rem",
    },
    filterContainer: {
      display: "flex",
      justifyContent: "flex-start",
      marginBottom: "1.5rem",
      gap: "0.3rem",
      flexWrap: "wrap",
    },
    filterButton: {
      backgroundColor: "#333",
      border: "none",
      borderRadius: "4px",
      padding: "0.3rem 0.7rem",
      transition: "all 0.3s ease",
      fontSize: "0.8rem",
    },
    filterButtonActive: {
      backgroundColor: "#0E606E",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(14, 96, 110, 0.3)",
    },
    effortGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1.5rem",
      marginBottom: "1.5rem",
    },
    effortCard: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "1rem",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    },
    effortHeader: {
      textAlign: "center",
      marginBottom: "1rem",
      fontWeight: "bold",
      color: "#0E606E",
    },
    effortField: {
      display: "flex",
      marginBottom: "0.5rem",
    },
    effortLabel: {
      width: "100px",
      fontWeight: "500",
      fontSize: "0.9rem",
    },
    effortValue: {
      flex: 1,
      border: "1px solid #ddd",
      borderRadius: "4px",
      padding: "0.25rem 0.5rem",
      fontSize: "0.9rem",
    },
    feedbackButton: {
      backgroundColor: "#0E606E",
      border: "none",
      width: "100%",
      marginTop: "0.5rem",
    },
    paginationContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "1.5rem",
    },
    paginationItem: {
      margin: "0 0.2rem",
    },
    noResults: {
      textAlign: "center",
      padding: "2rem",
      backgroundColor: "#f8f9fa",
      borderRadius: "10px",
      marginBottom: "1.5rem",
    },
    statusBadge: {
      display: "inline-block",
      padding: "0.25rem 0.5rem",
      borderRadius: "4px",
      fontWeight: "bold",
      fontSize: "0.8rem",
      textAlign: "center",
    },
    statusCompleted: {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    statusFinished: {
      backgroundColor: "#c3e6cb",
      color: "#0f5132",
    },
    statusProcessing: {
      backgroundColor: "#cce5ff",
      color: "#004085",
    },
    statusRejected: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
    },
    statusApproved: {
      backgroundColor: "#d1ecf1",
      color: "#0c5460",
    },
    statusPending: {
      backgroundColor: "#fff3cd",
      color: "#856404",
    },
    statusCancelled: {
      backgroundColor: "#e2e3e5",
      color: "#383d41",
    },
    modalHeader: {
      backgroundColor: "#0E606E",
      color: "white",
      padding: "1rem",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
    },
    modalTitle: {
      margin: 0,
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    modalBody: {
      padding: "1.5rem",
    },
    feedbackForm: {
      marginTop: "1rem",
    },
    formGroup: {
      marginBottom: "1.5rem",
    },
    formLabel: {
      fontWeight: "500",
      marginBottom: "0.5rem",
      display: "block",
    },
    ratingContainer: {
      marginBottom: "1.5rem",
    },
    submitButton: {
      backgroundColor: "#0E606E",
      border: "none",
      padding: "0.5rem 1.5rem",
      borderRadius: "4px",
      color: "white",
      fontWeight: "500",
      float: "right",
    },
    cancelButton: {
      marginRight: "0.5rem",
      float: "right",
    },
    modalFooter: {
      padding: "1rem",
      borderTop: "1px solid #eee",
      display: "flex",
      justifyContent: "flex-end",
    },
  };

  // Add CSS to document
  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
        :root {
          --primary-color: #0E606E;
        }
        
        body {
          background-color: #f5f5f5;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .menu-item {
          position: relative;
          overflow: hidden;
        }
        
        .menu-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--primary-color);
          transition: width 0.3s ease;
        }
        
        .menu-item:hover::after {
          width: 100%;
        }
        
        .menu-item.active::after {
          display: none;
        }
        
        .feedback-btn:hover {
          background-color: #0a4c57 !important;
          border-color: #0a4c57 !important;
        }
        
        .filter-btn {
          transition: all 0.3s ease;
        }
        
        .filter-btn:hover {
          transform: translateY(-2px);
        }
        
        .filter-btn.active {
          background-color: #0E606E !important;
          border-color: #0E606E !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(14, 96, 110, 0.3);
        }
        
        /* Ant Design Modal Customization */
        .ant-modal-content {
          border-radius: 10px;
          overflow: hidden;
        }
        
        .ant-modal-header {
          background-color: #0E606E;
          border-bottom: none;
          padding: 16px 24px;
        }
        
        .ant-modal-title {
          color: white;
          font-weight: bold;
          font-size: 18px;
        }
        
        .ant-modal-close-x {
          color: white;
        }
        
        .ant-modal-footer {
          border-top: none;
        }
        
        .ant-rate {
          font-size: 32px;
        }
        
        .ant-rate-star:not(:last-child) {
          margin-right: 12px;
        }
        
        .ant-rate-star-first, .ant-rate-star-second {
          color: #0E606E;
        }
        
        .submit-btn:hover {
          background-color: #0a4c57 !important;
          border-color: #0a4c57 !important;
          transform: translateY(-2px);
        }
      `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEfforts, setFilteredEfforts] = useState([]);
  const itemsPerPage = 4;

  // Feedback modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEffort, setSelectedEffort] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [effortData, setEffortData] = useState([]);

  useEffect(() => {
    getAllHistoryEvent();
  }, []);

  const getAllHistoryEvent = async () => {
    try {
      const response = await axiosInstance.get(
        "/profile/get-all-history-events"
      );

      if (
        response.data &&
        response.data.historyEvents &&
        response.data.feedbacks
      ) {
        // Map feedbacks to the respective event in historyEvents
        const feedbacks = response.data.feedbacks;
        const historyEvents = response.data.historyEvents.map((event) => {
          // Find matching feedback for this event
          const eventFeedbacks = feedbacks.filter(
            (feedback) => feedback.eventId === event.event._id
          );
          event.event.feedbacks = eventFeedbacks; // Attach the feedbacks to the event
          return event;
        });

        setEffortData(historyEvents); // Pass the updated historyEvents with feedbacks
        console.log("Get history event successfully with feedbacks");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(`List history event: ${JSON.stringify(effortData, null, 2)}`);

  useEffect(() => {
    // Chỉ lọc dữ liệu khi effortData có sẵn
    if (effortData.length > 0) {
      let filtered = [];
      if (activeFilter === "ALL") {
        filtered = [...effortData]; // Hiển thị tất cả nếu filter là "ALL"
      } else {
        filtered = effortData.filter(
          (effort) => effort.status === activeFilter
        );
      }
      setFilteredEfforts(filtered);
      setCurrentPage(1); // Reset lại trang khi filter thay đổi
    }
  }, [effortData, activeFilter]); // Đảm bảo useEffect này chạy khi effortData hoặc activeFilter thay đổi

  // Calculate total pages
  const totalPages = Math.ceil(filteredEfforts.length / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEfforts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination items
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Get status badge style
  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return styles.statusCompleted;
      case "finished":
        return styles.statusFinished;
      case "processing":
        return styles.statusProcessing;
      case "rejected":
        return styles.statusRejected;
      case "approved":
        return styles.statusApproved;
      case "pending":
        return styles.statusPending;
      case "cancelled":
        return styles.statusCancelled;
      default:
        return {};
    }
  };

  // Handle feedback button click
  const handleFeedbackClick = (effort) => {
    setSelectedEffort(effort);
    setFeedbackText("");
    setRating(0);
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // Handle feedback submission
  const handleSubmitFeedback = async () => {
    setSubmittingFeedback(true);
    console.log("Submitting feedback:", feedbackText); // Debug: check value
    const feedbackData = {
      rating,
      content: feedbackText,
    };

    try {
      // Call the backend createFeedback endpoint
      const res = await axiosInstance.post(
        `/feedback/create-feedback/${selectedEffort.event._id}`,
        feedbackData
      );
      if (res.data && res.data.message) {
        CustomSuccessToast(res.data.message);
        setIsModalVisible(false);
        // Update the status of the effort in the UI immediately if needed
        setEffortData((prevEfforts) =>
          prevEfforts.map((effort) => {
            if (
              effort._id === selectedEffort._id &&
              (effort.status === "completed" || effort.status === "finished")
            ) {
              // If status was "finished", backend sets it to "completed" after feedback
              // So we update it here for immediate UI feedback
              return {
                ...effort,
                status: "completed",
              };
            }
            return effort;
          })
        );
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      if (err.response && err.response.data && err.response.data.message) {
        CustomFailedToast(err.response.data.message);
      }
    } finally {
      setSubmittingFeedback(false);
    }
  };

  // All available status filters
  const statusFilters = [
    "ALL",
    "completed",
    "finished",
    "processing",
    "rejected",
    "approved",
    "pending",
    "cancelled",
  ];
  // Hàm dịch các trạng thái từ tiếng Anh sang tiếng Việt
  const translateStatus = (status) => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "finished":
        return "Kết thúc";
      case "processing":
        return "Đang xử lý";
      case "rejected":
        return "Từ chối";
      case "approved":
        return "Đã duyệt";
      case "pending":
        return "Chờ xử lý";
      case "cancelled":
        return "Đã hủy";
      default:
        return status; // Trả về trạng thái gốc nếu không có trạng thái nào trùng khớp
    }
  };

  return (
    <>
    <CustomToast />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ ...styles.accountContainer, maxWidth: "1100px" }}
      >
        <Row className="w-100">
          <Col md={4}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card style={styles.sidebarCard}>
                <Card.Body className="p-0">
                  <div style={styles.userProfile}>
                    <img
                      src={
                        JSON.parse(localStorage.getItem("user")).avatarUrl ||
                        defaultAvatar
                      }
                      alt="User Avatar"
                      className="avatar-img"
                      style={styles.avatar}
                    />
                    <div style={styles.userInfo}>
                      <h5 style={styles.userName}>Hung Pham Trong</h5>
                      <p style={styles.accountType}>Tài Khoản Cá Nhân</p>
                    </div>
                  </div>
                  <div style={styles.menuItems}>
                    <div
                      className="menu-item"
                      style={styles.menuItem}
                      onClick={() => navigate("/profile-information")}
                    >
                      <span>Thông Tin </span>
                    </div>
                    <div
                      className="menu-item"
                      style={styles.menuItem}
                      onClick={() => navigate("/profile-avatar")}
                    >
                      <span>Cập Nhật Avatar</span>
                    </div>
                    <div
                      className="menu-item active"
                      style={{ ...styles.menuItem, ...styles.menuItemActive }}
                      onClick={() => navigate("/profile-history")}
                    >
                      <span>Lịch Sử Nỗ lực</span>
                    </div>
                    <div
                      className="menu-item"
                      style={styles.menuItem}
                      onClick={() => navigate("/profile-favourite")}
                    >
                      <span>Yêu Thích</span>
                    </div>
                    <div
                      className="menu-item"
                      style={styles.menuItem}
                      onClick={() => navigate("/profile-score")}
                    >
                      <span>Số Điểm</span>
                    </div>
                    <div
                      className="menu-item"
                      style={styles.menuItem}
                      onClick={() => navigate("/profile-certificate")}
                    >
                      <span>Chứng Chỉ </span>
                    </div>
                    <div className="menu-item" style={styles.menuItem}>
                      <span>Đăng Xuất</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={8} style={{ marginTop: "80px" }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card style={styles.infoCard}>
                <Card.Header style={styles.infoHeader}>
                  <h4 className="mb-0">LỊCH SỬ NỖ LỰC</h4>
                </Card.Header>
                <Card.Body style={styles.infoCardBody}>
                  <div style={styles.filterContainer}>
                    {statusFilters.map((filter) => (
                      <Button
                        key={filter}
                        variant="dark"
                        className={`filter-btn ${
                          activeFilter === filter ? "active" : ""
                        }`}
                        style={{
                          ...styles.filterButton,
                          ...(activeFilter === filter
                            ? styles.filterButtonActive
                            : {}),
                        }}
                        onClick={() => handleFilterChange(filter)}
                      >
                        {filter === "ALL" ? "Tất cả" : translateStatus(filter)}{" "}
                        {/* Hiển thị tiếng Việt */}
                      </Button>
                    ))}
                  </div>

                  {currentItems.length > 0 ? (
                    <div style={styles.effortGrid}>
                      <AnimatePresence>
                        {currentItems.map((effort, index) => (
                          <motion.div
                            key={effort._id}
                            style={styles.effortCard}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            layout
                          >
                            <h5 style={styles.effortHeader}>
                              {effort.event.title}
                            </h5>

                            <div style={styles.effortField}>
                              <div style={styles.effortLabel}>Bắt Đầu: </div>
                              <div style={styles.effortValue}>
                                {new Date(
                                  effort.event.startAt
                                ).toLocaleDateString("en-GB")}
                              </div>
                            </div>

                            <div style={styles.effortField}>
                              <div style={styles.effortLabel}>Kết Thúc: </div>
                              <div style={styles.effortValue}>
                                {new Date(
                                  effort.event.endAt
                                ).toLocaleDateString("en-GB")}
                              </div>
                            </div>

                            <div style={styles.effortField}>
                              <div style={styles.effortLabel}>Tình Trạng:</div>
                              <div style={styles.effortValue}>
                                <span
                                  style={{
                                    ...styles.statusBadge,
                                    ...getStatusStyle(effort.status),
                                  }}
                                >
                                  {translateStatus(effort.status)}
                                </span>
                              </div>
                            </div>

                            <Button
                              className="feedback-btn"
                              style={styles.feedbackButton}
                              onClick={() => handleFeedbackClick(effort)}
                            >
                              Đánh Giá
                            </Button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div style={styles.noResults}>
                      <h5>
                        Không tìm thấy nỗ lực với trạng thái:{" "}
                        {translateStatus(activeFilter)}
                      </h5>
                      <p>Hãy thử chọn bộ lọc khác hoặc quay lại sau.</p>
                    </div>
                  )}

                  {totalPages > 0 && (
                    <div style={styles.paginationContainer}>
                      <Pagination
                        style={{
                          "--bs-pagination-color": "#0E606E",
                          "--bs-pagination-active-bg": "#0E606E",
                          "--bs-pagination-active-border-color": "#0E606E",
                          "--bs-pagination-hover-color": "#0E606E",
                          "--bs-pagination-focus-color": "#0E606E",
                        }}
                      >
                        <Pagination.Prev
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                        />
                        {paginationItems}
                        <Pagination.Next
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          disabled={currentPage === totalPages}
                        />
                      </Pagination>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Feedback Modal */}
        <Modal
          title={`Đánh Giá Cho Sự Kiện: ${
            selectedEffort?.event.title || "Event"
          }`}
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={null}
          width={600}
          centered
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div style={styles.modalBody}>
              <h5>Gửi Đánh Giá Cho Chúng Tôi </h5>
              <p>
                Chúng tôi trân trọng ý kiến phản hồi của bạn về sự kiện:{" "}
                {selectedEffort?.event.title}. Xin vui lòng chia sẻ suy nghĩ của
                bạn và đánh giá trải nghiệm của mình.
              </p>

              <Form style={styles.feedbackForm}>
                <Form.Group className="mb-4" controlId="feedbackText">
                  <Form.Label style={styles.formLabel}>
                    Đánh Giá Của Bạn
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Xin vui lòng chia sẻ trải nghiệm, gợi ý hoặc những lo ngại của bạn..."
                    value={feedbackText}
                    onChange={(e) => {
                      // Debug: log value
                      console.log("Input value:", e.target.value);
                      setFeedbackText(e.target.value);
                    }}
                  />
                </Form.Group>

                <div style={styles.ratingContainer}>
                  <Form.Label style={styles.formLabel}>
                    Đánh giá trải nghiệm của bạn
                  </Form.Label>
                  <div>
                    <Rate
                      allowHalf
                      value={rating}
                      onChange={setRating}
                      style={{ color: "#0E606E" }}
                      className="mb-3"
                    />
                    <span className="ms-2">
                      {rating ? (
                        <strong>{rating} trong số 5 sao</strong>
                      ) : (
                        "Nhấn để đánh giá"
                      )}
                    </span>
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                  <Button
                    variant="light"
                    onClick={handleModalClose}
                    className="me-2"
                  >
                    Hủy
                  </Button>
                  <Button
                    variant="primary"
                    className="submit-btn"
                    style={{
                      backgroundColor: "#0E606E",
                      borderColor: "#0E606E",
                      minWidth: 120,
                    }}
                    onClick={handleSubmitFeedback}
                    disabled={!feedbackText.trim() || rating === 0 || submittingFeedback}
                  >
                    {submittingFeedback ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      "Gửi Đánh Giá"
                    )}
                  </Button>
                </div>
              </Form>
            </div>
          </motion.div>
        </Modal>
      </Container>
    </>
  );
};

export default ProfileHistory;
