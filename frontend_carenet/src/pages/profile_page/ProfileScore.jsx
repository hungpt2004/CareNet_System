"use client";

import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Pagination,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import derivative from "antd/es/theme/themes/default";
const ProfileScore = () => {
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
    scoreOverview: {
      backgroundColor: "#f8f9fa",
      borderRadius: "10px",
      padding: "1.5rem",
      marginBottom: "2rem",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      textAlign: "center",
    },
    totalScore: {
      fontSize: "3rem",
      fontWeight: "bold",
      color: "#0E606E",
      marginBottom: "0.5rem",
    },
    scoreLabel: {
      color: "#6c757d",
      marginBottom: "1rem",
    },
    levelProgress: {
      marginTop: "1rem",
      marginBottom: "0.5rem",
    },
    levelLabel: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "0.5rem",
    },
    scoreTable: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0 0.5rem",
    },
    scoreTableHeader: {
      textAlign: "left",
      padding: "0.5rem 1rem",
      borderBottom: "2px solid #0E606E",
      color: "#0E606E",
      fontWeight: "bold",
    },
    scoreTableRow: {
      backgroundColor: "#f8f9fa",
      transition: "all 0.3s ease",
    },
    scoreTableRowHover: {
      backgroundColor: "#f1f1f1",
    },
    scoreTableCell: {
      padding: "1rem",
      borderTop: "1px solid #dee2e6",
      borderBottom: "1px solid #dee2e6",
    },
    scoreTableCellFirst: {
      borderLeft: "1px solid #dee2e6",
      borderTopLeftRadius: "5px",
      borderBottomLeftRadius: "5px",
    },
    scoreTableCellLast: {
      borderRight: "1px solid #dee2e6",
      borderTopRightRadius: "5px",
      borderBottomRightRadius: "5px",
    },
    scoreValue: {
      fontWeight: "bold",
      color: "#0E606E",
    },
    scoreDate: {
      color: "#6c757d",
      fontSize: "0.9rem",
    },
    paginationContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "1.5rem",
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
      
      .score-table-row:hover {
        background-color: #f1f1f1;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Sample score data - expanded to demonstrate pagination
  const scoreData = [
    {
      id: 1,
      event: "Chương Trình Trồng Cây",
      date: "19 tháng 4, 2023",
      score: 85,
      hours: 4,
    },
    {
      id: 2,
      event: "Trại Hiến Máu",
      date: "23 tháng 4, 2023",
      score: 70,
      hours: 3,
    },
    {
      id: 3,
      event: "Tình Nguyện tại Trại Cứu Hộ Động Vật",
      date: "5 tháng 5, 2023",
      score: 90,
      hours: 5,
    },
    {
      id: 4,
      event: "Dọn Dẹp Công Viên Cộng Đồng",
      date: "12 tháng 5, 2023",
      score: 75,
      hours: 3.5,
    },
    {
      id: 5,
      event: "Chương Trình Tình Nguyện Giúp Đỡ Học Sinh",
      date: "3 tháng 6, 2023",
      score: 80,
      hours: 4.5,
    },
    {
      id: 6,
      event: "Chương Trình Thăm Hỏi Người Cao Tuổi",
      date: "15 tháng 6, 2023",
      score: 95,
      hours: 6,
    },
    {
      id: 7,
      event: "Tình Nguyện tại Ngân Hàng Thực Phẩm",
      date: "8 tháng 7, 2023",
      score: 85,
      hours: 5,
    },
    {
      id: 8,
      event: "Sáng Kiến Dọn Dẹp Bãi Biển",
      date: "22 tháng 7, 2023",
      score: 80,
      hours: 4,
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;

  // Calculate total pages
  const totalPages = Math.ceil(scoreData.length / eventsPerPage);

  // Get current events
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = scoreData.slice(indexOfFirstEvent, indexOfLastEvent);

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

  // Calculate total score
  const totalScore = scoreData.reduce((sum, item) => sum + item.score, 0);
  const totalHours = scoreData.reduce((sum, item) => sum + item.hours, 0);

  // Calculate level progress
  const currentLevel = Math.floor(totalScore / 100) + 1;
  const nextLevelScore = currentLevel * 100;
  const progressPercentage = totalScore % 100;

  const navigate = useNavigate();

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
                    src={JSON.parse(localStorage.getItem("user")).avatarUrl||defaultAvatar}
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
                    <span>Thông Tin</span>
                  </div>
                  <div
                    className="menu-item"
                    style={styles.menuItem}
                    onClick={() => navigate("/profile-avatar")}
                  >
                    <span>Cập Nhật Avatar</span>
                  </div>
                  <div
                    className="menu-item"
                    style={styles.menuItem}
                    onClick={() => navigate("/profile-history")}
                  >
                    <span>Lịch Sử Nỗ Lực</span>
                  </div>
                  <div
                    className="menu-item"
                    style={styles.menuItem}
                    onClick={() => navigate("/profile-favourite")}
                  >
                    <span>Yêu Thích</span>
                  </div>
                  <div
                    className="menu-item active"
                    style={{ ...styles.menuItem, ...styles.menuItemActive }}
                    onClick={() => navigate("/profile-score")}
                  >
                    <span>Số Điểm</span>
                  </div>
                  <div
                    className="menu-item"
                    style={styles.menuItem}
                    onClick={() => navigate("/profile-certificate")}
                  >
                    <span>Chứng Chỉ</span>
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
                <h4 className="mb-0">SỐ ĐIỂM</h4>
              </Card.Header>
              <Card.Body style={styles.infoCardBody}>
                <motion.div
                  style={styles.scoreOverview}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div style={styles.totalScore}>{totalScore}</div>
                  <div style={styles.scoreLabel}>Tổng Điểm Tình Nguyện</div>

                  <Row className="text-center mb-3">
                    <Col>
                      <h5>{scoreData.length}</h5>
                      <p style={styles.scoreLabel}>Sự Kiện</p>
                    </Col>
                    <Col>
                      <h5>{totalHours}</h5>
                      <p style={styles.scoreLabel}>Giờ</p>
                    </Col>
                    <Col>
                      <h5>{currentLevel}</h5>
                      <p style={styles.scoreLabel}>Cấp Bậc</p>
                    </Col>
                  </Row>

                  <div style={styles.levelLabel}>
                    <span>Cấp Bậc {currentLevel}</span>
                    <span>Cấp Bậc {currentLevel + 1}</span>
                  </div>
                  <ProgressBar
                    now={progressPercentage}
                    variant="info"
                    style={styles.levelProgress}
                  />
                  <small>{progressPercentage}% đến cấp tiếp theo</small>
                </motion.div>

                <h5 className="mb-3">Điểm Các Sự Kiện</h5>

                <table style={styles.scoreTable}>
                  <thead>
                    <tr>
                      <th style={styles.scoreTableHeader}>Sự Kiện</th>
                      <th style={styles.scoreTableHeader}>Ngày</th>
                      <th style={styles.scoreTableHeader}>Giờ</th>
                      <th style={styles.scoreTableHeader}>Điểm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEvents.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        className="score-table-row"
                        style={styles.scoreTableRow}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <td
                          style={{
                            ...styles.scoreTableCell,
                            ...styles.scoreTableCellFirst,
                          }}
                        >
                          {item.event}
                        </td>
                        <td style={styles.scoreTableCell}>
                          <span style={styles.scoreDate}>{item.date}</span>
                        </td>
                        <td style={styles.scoreTableCell}>{item.hours} giờ</td>
                        <td
                          style={{
                            ...styles.scoreTableCell,
                            ...styles.scoreTableCellLast,
                            ...styles.scoreValue,
                          }}
                        >
                          {item.score}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
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
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScore;
