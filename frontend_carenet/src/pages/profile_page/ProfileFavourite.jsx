"use client";

import React, { useState } from "react";
import { Container, Row, Col, Card, Pagination } from "react-bootstrap";
import { motion } from "framer-motion";
import { HeartFill } from "react-bootstrap-icons";
import { AiOutlineUser, AiOutlinePicture, AiOutlineHistory, AiOutlineHeart, AiOutlineStar, AiOutlineIdcard, AiOutlineLogout, AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/defaultAvatar.png";
const ProfileFavourite = () => {
  // Hình ảnh sự kiện
  const treeImage =
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80";
  const bloodImage =
    "https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
  const animalImage =
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80";

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
    favouriteList: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      marginBottom: "1.5rem",
    },
    favouriteItem: {
      display: "flex",
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "1rem",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      backgroundColor: "#f9f9f9",
    },
    eventImage: {
      width: "150px",
      height: "100px",
      objectFit: "cover",
      borderRadius: "5px",
      marginRight: "1rem",
    },
    eventContent: {
      flex: 1,
    },
    eventName: {
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    eventDescription: {
      fontSize: "0.9rem",
      color: "#555",
    },
    heartIcon: {
      cursor: "pointer",
      fontSize: "1.5rem",
      color: "#0E606E",
      marginLeft: "1rem",
      alignSelf: "center",
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
      
      .heart-icon:hover {
        transform: scale(1.1);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [favourites, setFavourites] = useState([
    {
      id: 1,
      name: "Chương Trình Trồng Cây",
      description:
        "Giúp phục hồi các khu vực xanh bằng cách trồng cây. Đây là một sự kiện thân thiện với gia đình, có sự hướng dẫn từ các chuyên gia môi trường và sẽ cung cấp đầy đủ công cụ cần thiết.",
      image: treeImage,
    },
    {
      id: 2,
      name: "Trại Hiến Máu",
      description:
        "Hiến máu và cứu sống nhiều người! Sự kiện này được tổ chức phối hợp với các bệnh viện và ngân hàng máu địa phương. Các chuyên gia y tế sẽ có mặt để đảm bảo quá trình hiến máu an toàn và thoải mái.",
      image: bloodImage,
    },
    {
      id: 3,
      name: "Tình Nguyện tại Trại Cứu Hộ Động Vật",
      description:
        "Hỗ trợ trại cứu hộ động vật bằng cách giúp đỡ việc cho ăn, làm sạch và chơi với những con vật bị cứu hộ. Các tình nguyện viên cũng sẽ giúp tổ chức các sự kiện nhận nuôi để tìm kiếm mái ấm cho những con thú cưng cần một gia đình.",
      image: animalImage,
    },
  ]);

  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter((fav) => fav.id !== id));
  };

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
                    <AiOutlineUser style={{ marginRight: 8, fontSize: 20, verticalAlign: 'middle' }} />
                    <span>Thông Tin</span>
                  </div>
                  <div
                    className="menu-item"
                    style={styles.menuItem}
                    onClick={() => navigate("/profile-avatar")}
                  >
                    <AiOutlinePicture style={{ marginRight: 8, fontSize: 20, verticalAlign: 'middle' }} />
                    <span>Cập Nhật Avatar</span>
                  </div>
                  <div
                    className="menu-item"
                    style={styles.menuItem}
                    onClick={() => navigate("/profile-history")}
                  >
                    <AiOutlineHistory style={{ marginRight: 8, fontSize: 20, verticalAlign: 'middle' }} />
                    <span>Lịch Sử Nỗ Lực</span>
                  </div>
                  <div
                    className="menu-item active"
                    style={{ ...styles.menuItem, ...styles.menuItemActive }}
                    onClick={() => navigate("/profile-favourite")}
                  >
                    <AiOutlineHeart style={{ marginRight: 8, fontSize: 20, verticalAlign: 'middle' }} />
                    <span>Yêu Thích</span>
                  </div>
                  <div
                    className="menu-item"
                    style={styles.menuItem}
                    onClick={() => navigate("/profile-score")}
                  >
                    <AiOutlineStar style={{ marginRight: 8, fontSize: 20, verticalAlign: 'middle' }} />
                    <span>Số Điểm</span>
                  </div>
                  <div
                    className="menu-item"
                    style={styles.menuItem}
                    onClick={() => navigate("/profile-certificate")}
                  >
                    <AiOutlineIdcard style={{ marginRight: 8, fontSize: 20, verticalAlign: 'middle' }} />
                    <span>Chứng Chỉ</span>
                  </div>
                  <div
                    className="menu-item"
                    style={styles.menuItem}
                    onClick={() => navigate("/profile-certificate-purchases")}
                  >
                    <AiOutlineShoppingCart style={{ marginRight: 8, fontSize: 20, verticalAlign: 'middle' }} />
                    <span>Mua Chứng Chỉ</span>
                  </div>
                   <div
                    className="menu-item"
                    style={styles.menuItem}
                    onClick={() => navigate("/profile-certificate-purchases")}
                  >
                    <span>CertificatePurchases</span>
                  </div>
                  <div className="menu-item" style={styles.menuItem}>
                    <AiOutlineLogout style={{ marginRight: 8, fontSize: 20, verticalAlign: 'middle' }} />
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
                <h4 className="mb-0">
                  <AiOutlineHeart style={{ marginRight: 10, fontSize: 24, verticalAlign: 'middle' }} />
                  YÊU THÍCH
                </h4>
              </Card.Header>
              <Card.Body style={styles.infoCardBody}>
                <div style={styles.favouriteList}>
                  {favourites.map((favourite) => (
                    <motion.div
                      key={favourite.id}
                      style={styles.favouriteItem}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={favourite.image || "/placeholder.svg"}
                        alt={favourite.name}
                        style={styles.eventImage}
                      />
                      <div style={styles.eventContent}>
                        <h5 style={styles.eventName}>
                          Tên Sự Kiện: {favourite.name}
                        </h5>
                        <p style={styles.eventDescription}>
                          Mô Tả: {favourite.description}
                        </p>
                      </div>
                      <div style={styles.heartContainer}>
                        <HeartFill
                          className="heart-icon"
                          style={styles.heartIcon}
                          onClick={() => removeFromFavourites(favourite.id)}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

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
  );
};

export default ProfileFavourite;
