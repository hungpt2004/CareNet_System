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
} from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, Rate } from "antd";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";
import useAuthStore from "../../hooks/authStore";
import {
  CustomFailedToast,
  CustomSuccessToast,
  CustomToast,
} from "../../components/toast/CustomToast";
const ProfileHistory = () => {
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
      if (response.data && response.data.historyEvents) {
        setEffortData(response.data.historyEvents);
        console.log(`Get history event successfully`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(`List history event: ${JSON.stringify(effortData, null, 2)}`);

  // Expanded effort data with all status types
  // const effortData = [
  //   {
  //     id: "EF001",
  //     eventName: "Community Park Cleanup",
  //     startDate: "April 5, 2023",
  //     endDate: "April 8, 2023",
  //     status: "completed",
  //   },
  //   {
  //     id: "EF002",
  //     eventName: "Green Rooftop Initiative",
  //     startDate: "April 10, 2023",
  //     endDate: "April 15, 2023",
  //     status: "rejected",
  //   },
  //   {
  //     id: "EF003",
  //     eventName: "Tree Planting Drive",
  //     startDate: "April 18, 2023",
  //     endDate: "April 19, 2023",
  //     status: "pending",
  //   },
  //   {
  //     id: "EF004",
  //     eventName: "Blood Donation Camp",
  //     startDate: "April 22, 2023",
  //     endDate: "April 23, 2023",
  //     status: "approved",
  //   },
  //   {
  //     id: "EF005",
  //     eventName: "Beach Cleanup Day",
  //     startDate: "May 5, 2023",
  //     endDate: "May 5, 2023",
  //     status: "finished",
  //   },
  //   {
  //     id: "EF006",
  //     eventName: "Elderly Care Volunteer",
  //     startDate: "May 12, 2023",
  //     endDate: "May 14, 2023",
  //     status: "processing",
  //   },
  //   {
  //     id: "EF007",
  //     eventName: "Food Bank Distribution",
  //     startDate: "May 20, 2023",
  //     endDate: "May 21, 2023",
  //     status: "completed",
  //   },
  //   {
  //     id: "EF008",
  //     eventName: "Literacy Program",
  //     startDate: "June 3, 2023",
  //     endDate: "June 10, 2023",
  //     status: "cancelled",
  //   },
  //   {
  //     id: "EF009",
  //     eventName: "Animal Shelter Support",
  //     startDate: "June 15, 2023",
  //     endDate: "June 16, 2023",
  //     status: "approved",
  //   },
  //   {
  //     id: "EF010",
  //     eventName: "Community Garden Project",
  //     startDate: "June 25, 2023",
  //     endDate: "June 26, 2023",
  //     status: "processing",
  //   },
  //   {
  //     id: "EF011",
  //     eventName: "Youth Mentorship Program",
  //     startDate: "July 5, 2023",
  //     endDate: "July 15, 2023",
  //     status: "finished",
  //   },
  //   {
  //     id: "EF012",
  //     eventName: "Homeless Shelter Assistance",
  //     startDate: "July 20, 2023",
  //     endDate: "July 21, 2023",
  //     status: "cancelled",
  //   },
  // ];

  // Filter efforts when activeFilter changes
  useEffect(() => {
    let filtered = [];
    if (activeFilter === "ALL") {
      filtered = [...effortData];
    } else {
      filtered = effortData.filter((effort) => effort.status === activeFilter);
    }
    setFilteredEfforts(filtered);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [activeFilter]);

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
  const handleSubmitFeedback = () => {
    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", {
      effortId: selectedEffort.id,
      eventName: selectedEffort.eventName,
      feedbackText,
      rating,
    });

    // Show success message (in a real app, you'd use a toast notification)
    alert(`Thank you for your feedback for ${selectedEffort.eventName}!`);

    // Close the modal
    setIsModalVisible(false);
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
  return (
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
                    src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                    alt="User Avatar"
                    className="avatar-img"
                    style={styles.avatar}
                  />
                  <div style={styles.userInfo}>
                    <h5 style={styles.userName}>Hung Pham Trong</h5>
                    <p style={styles.accountType}>Normal Account</p>
                  </div>
                </div>
                <div style={styles.menuItems}>
                  <div
                    className="menu-item"
                    style={styles.menuItem}
                    onClick={() => navigate("/profile-information")}
                  >
                    <span>Information</span>
                  </div>
                  <div
                    className="menu-item"
                    style={styles.menuItem}
                    onClick={() => navigate("/profile-avatar")}
                  >
                    <span>Update Avatar</span>
                  </div>
                  <div
                    className="menu-item active"
                    style={{ ...styles.menuItem, ...styles.menuItemActive }}
                    onClick={() => navigate("/profile-history")}
                  >
                    <span>History Effort</span>
                  </div>
                  <div
                    className="menu-item"
                    style={styles.menuItem}
                    onClick={() => navigate("/profile-favourite")}
                  >
                    <span>Favourite</span>
                  </div>
                  <div
                    className="menu-item"
                    style={styles.menuItem}
                    onClick={() => navigate("/profile-score")}
                  >
                    <span>Score</span>
                  </div>
                  <div
                    className="menu-item"
                    style={styles.menuItem}
                    onClick={() => navigate("/profile-certificate")}
                  >
                    <span>Certificate</span>
                  </div>
                  <div className="menu-item" style={styles.menuItem}>
                    <span>Log Out</span>
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
                <h4 className="mb-0">HISTORY EFFORT</h4>
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
                      {filter}
                    </Button>
                  ))}
                </div>

                {currentItems.length > 0 ? (
                  <div style={styles.effortGrid}>
                    <AnimatePresence>
                      {currentItems.map((effort, index) => (
                        <motion.div
                          key={effort.id}
                          style={styles.effortCard}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          layout
                        >
                          <h5 style={styles.effortHeader}>
                            {effort.eventName}
                          </h5>

                          <div style={styles.effortField}>
                            <div style={styles.effortLabel}>Start Date:</div>
                            <div style={styles.effortValue}>
                              {effort.startDate}
                            </div>
                          </div>

                          <div style={styles.effortField}>
                            <div style={styles.effortLabel}>End Date:</div>
                            <div style={styles.effortValue}>
                              {effort.endDate}
                            </div>
                          </div>

                          <div style={styles.effortField}>
                            <div style={styles.effortLabel}>Status:</div>
                            <div style={styles.effortValue}>
                              <span
                                style={{
                                  ...styles.statusBadge,
                                  ...getStatusStyle(effort.status),
                                }}
                              >
                                {effort.status}
                              </span>
                            </div>
                          </div>

                          <Button
                            className="feedback-btn"
                            style={styles.feedbackButton}
                            onClick={() => handleFeedbackClick(effort)}
                          >
                            Feedback
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div style={styles.noResults}>
                    <h5>No efforts found with status: {activeFilter}</h5>
                    <p>Try selecting a different filter or check back later.</p>
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
        title={`Feedback for ${selectedEffort?.eventName || "Event"}`}
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
            <h5>Send us your feedback</h5>
            <p>
              We appreciate your feedback on the {selectedEffort?.eventName}{" "}
              event. Please share your thoughts and rate your experience.
            </p>

            <Form style={styles.feedbackForm}>
              <Form.Group className="mb-4" controlId="feedbackText">
                <Form.Label style={styles.formLabel}>Your Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Please share your experience, suggestions, or concerns..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                />
              </Form.Group>

              <div style={styles.ratingContainer}>
                <Form.Label style={styles.formLabel}>
                  Rate Your Experience
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
                      <strong>{rating} out of 5 stars</strong>
                    ) : (
                      "Click to rate"
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
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  className="submit-btn"
                  style={{ backgroundColor: "#0E606E", borderColor: "#0E606E" }}
                  onClick={handleSubmitFeedback}
                  disabled={!feedbackText.trim() || rating === 0}
                >
                  Submit Feedback
                </Button>
              </div>
            </Form>
          </div>
        </motion.div>
      </Modal>
    </Container>
  );
};

export default ProfileHistory;
