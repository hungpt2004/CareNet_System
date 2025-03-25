"use client";

import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import { motion } from "framer-motion";
import CustomNavbar from "../../components/navbar/CustomNavbar";
import { useNavigate } from "react-router-dom";
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
      gap: "0.5rem",
    },
    filterButton: {
      backgroundColor: "#333",
      border: "none",
      borderRadius: "4px",
      padding: "0.5rem 1.5rem",
    },
    filterButtonActive: {
      backgroundColor: "#555",
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
    },
    paginationItem: {
      margin: "0 0.2rem",
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
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [activeFilter, setActiveFilter] = useState("ALL");

  const effortData = [
    {
      id: "EF001",
      eventName: "Community Park Cleanup",
      startDate: "April 5, 2023",
      endDate: "April 8, 2023",
      status: "Completed",
    },
    {
      id: "EF002",
      eventName: "Green Rooftop Initiative",
      startDate: "April 10, 2023",
      endDate: "April 15, 2023",
      status: "Reject",
    },
    {
      id: "EF003",
      eventName: "Tree Planting Drive",
      startDate: "April 18, 2023",
      endDate: "April 19, 2023",
      status: "Pending",
    },
    {
      id: "EF004",
      eventName: "Blood Donation Camp",
      startDate: "April 22, 2023",
      endDate: "April 23, 2023",
      status: "Completed",
    },
  ];

  const filteredEfforts =
    activeFilter === "ALL"
      ? effortData
      : effortData.filter((effort) => effort.status === activeFilter);

  const navigate = useNavigate();

  return (
    <>
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
                      src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid"
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
                    {["ALL", "Completed", "Pending", "Reject"].map((filter) => (
                      <Button
                        key={filter}
                        variant="dark"
                        style={{
                          ...styles.filterButton,
                          ...(activeFilter === filter
                            ? styles.filterButtonActive
                            : {}),
                        }}
                        onClick={() => setActiveFilter(filter)}
                      >
                        {filter}
                      </Button>
                    ))}
                  </div>

                  <div style={styles.effortGrid}>
                    {filteredEfforts.map((effort) => (
                      <div key={effort.id} style={styles.effortCard}>
                        <h5 style={styles.effortHeader}>Effort ID</h5>

                        <div style={styles.effortField}>
                          <div style={styles.effortLabel}>Event's Name:</div>
                          <div style={styles.effortValue}>
                            {effort.eventName}
                          </div>
                        </div>

                        <div style={styles.effortField}>
                          <div style={styles.effortLabel}>Start Date:</div>
                          <div style={styles.effortValue}>
                            {effort.startDate}
                          </div>
                        </div>

                        <div style={styles.effortField}>
                          <div style={styles.effortLabel}>End Date:</div>
                          <div style={styles.effortValue}>{effort.endDate}</div>
                        </div>

                        <div style={styles.effortField}>
                          <div style={styles.effortLabel}>Status:</div>
                          <div style={styles.effortValue}>{effort.status}</div>
                        </div>

                        <Button
                          className="feedback-btn"
                          style={styles.feedbackButton}
                        >
                          Feedback
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div style={styles.paginationContainer}>
                    <Pagination>
                      <Pagination.Prev />
                      <Pagination.Item active>{1}</Pagination.Item>
                      <Pagination.Item>{2}</Pagination.Item>
                      <Pagination.Item>{3}</Pagination.Item>
                      <Pagination.Item>{4}</Pagination.Item>
                      <Pagination.Ellipsis />
                      <Pagination.Item>{40}</Pagination.Item>
                      <Pagination.Next />
                    </Pagination>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileHistory;
