"use client";

import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { Modal } from "antd";
import "antd/dist/reset.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";
import {
  CustomFailedToast,
  CustomSuccessToast,
  CustomToast,
} from "../../components/toast/CustomToast";
import defaultAvatar from "../../assets/defaultAvatar.png";
import useAuthStore from "../../hooks/authStore";
import { AiOutlineUser, AiOutlinePicture, AiOutlineHistory, AiOutlineHeart, AiOutlineStar, AiOutlineIdcard, AiOutlineLogout } from "react-icons/ai";
const ProfileAvatar = () => {
  const { logout } = useAuthStore();
  
  // Logout function (like CustomNavbarLogged)
  const handleLogout = async () => {
    await logout();
    setTimeout(() => {
      navigate('/login');
    }, 0);
  };
  // CSS styles defined directly in the component
  const styles = {
    root: {
      "--primary-color": "#0E606E",
    },
    accountContainer: {
      minHeight: "100vh",
      padding: "2rem 0",
      maxWidth: "1100px", // Limit max width
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
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    largeAvatar: {
      width: "180px",
      height: "180px",
      borderRadius: "50%",
      border: "4px solid #4dabbc",
      margin: "2rem 0",
      objectFit: "cover",
    },
    actionButton: {
      backgroundColor: "#333",
      color: "white",
      border: "none",
      width: "180px",
      marginBottom: "0.5rem",
    },
    fileInfo: {
      textAlign: "center",
      marginTop: "1rem",
      fontSize: "0.9rem",
    },
    fileFormat: {
      color: "#6c757d",
      fontSize: "0.8rem",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "2rem",
      width: "100%",
    },
    cancelBtn: {
      marginRight: "0.5rem",
    },
    saveBtn: {
      backgroundColor: "#0E606E",
      borderColor: "#0E606E",
    },
    hiddenInput: {
      display: "none",
    },
    modalAvatar: {
      width: "100%",
      maxWidth: "400px",
      height: "auto",
      borderRadius: "50%",
      border: "6px solid #0E606E",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
      margin: "0 auto",
      display: "block",
    },
    modalContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
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
      
      .avatar-img:hover {
        transform: scale(1.05);
      }
      
      .save-btn:hover {
        background-color: #0a4c57 !important;
        border-color: #0a4c57 !important;
      }
      
      /* Ant Design Modal Customization */
      .ant-modal-content {
        border-radius: 12px;
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
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Xử lí hiện data (Cần phải có)
  useEffect(() => {
    getCurrentUserForProfileAvatar();
  }, []);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Always revoke previous preview URL to avoid memory leaks and stale previews
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setSelectedFile(file); // Set the actual file
      setPreviewUrl(URL.createObjectURL(file)); // Create a URL for previewing the image
      // Reset the file input value so the same file can be selected again after cancel
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  //Xử lí load lại trang, không cần logout để câp nhật avatar (cần phải có)
  const getCurrentUserForProfileAvatar = async () => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      const user = JSON.parse(userFromStorage);
      setUser(user); // Cập nhật state với thông tin từ localStorage
      setAvatarUrl(user.avatarUrl); // Cập nhật avatar từ localStorage
    } else {
      // Nếu không có thông tin trong localStorage, gọi API để lấy thông tin người dùng
      try {
        const res = await axiosInstance.get("/profile/get-current-user-for-profile-avatar");
        if (res.data && res.data.user) {
          setUser(res.data.user);
          setAvatarUrl(res.data.user.avatarUrl);
        }
      } catch (error) {
        console.log("Error fetching current user:", error);
      }
    }
  };

  const handleViewAvatarModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseAvatarModal = () => {
    setIsModalVisible(false);
  };

  const handleCancelUpload = () => {
    // Only reset if a file is actually selected (i.e., user is in the process of uploading)
    if (selectedFile || previewUrl) {
      setSelectedFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      CustomFailedToast("Hủy avatar tải lên thành công.");
    }
    // Always close the modal if open
    setIsModalVisible(false);
  };

  // Xử lí upload avatar
  const uploadAvatar = async () => {
    if (!selectedFile) {
      CustomFailedToast("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile); // Append the selected file
    setLoading(true);
    try {
      const res = await axiosInstance.put("/profile/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data && res.data.user && res.data.image) {
        console.log(
          `After upload user: ${JSON.stringify(res.data.user, null, 2)}`
        );
        setUser(res.data.user); // Update user state with new data
        setAvatarUrl(res.data.image); // Update avatarUrl

        // Cập nhật lại localStorage với thông tin người dùng mới
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setLoading(false);
        CustomSuccessToast(res.data.message);
      }
    } catch (err) {
      console.error("Error uploading avatar:", err);
      setLoading(false);
      CustomFailedToast("Failed to upload avatar.");
    }
  };

  console.log(`Before upload user: ${JSON.stringify(user, null, 2)}`);
  console.log(`Avatar URL: ${avatarUrl}`);

  return (
    <>
      <CustomToast />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={styles.accountContainer}
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
                      src={avatarUrl || defaultAvatar}
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
                      className="menu-item active"
                      style={{ ...styles.menuItem, ...styles.menuItemActive }}
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
                      className="menu-item"
                      style={styles.menuItem}
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
                      onClick={handleLogout}
                    >
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
                    <AiOutlinePicture style={{ marginRight: 10, fontSize: 24, verticalAlign: 'middle' }} />
                    CẬP NHẬT AVATAR
                  </h4>
                </Card.Header>
                <Card.Body style={styles.infoCardBody}>
                  {/* Icon inside the box removed as requested */}
                  <img
                    src={previewUrl || avatarUrl || defaultAvatar}
                    alt="User Avatar"
                    style={styles.largeAvatar}
                  />

                  <Button
                    variant="dark"
                    style={styles.actionButton}
                    onClick={handleViewAvatarModal}
                  >
                    Xem Avatar
                  </Button>

                  <Button
                    variant="dark"
                    style={styles.actionButton}
                    onClick={handleUploadClick}
                  >
                    Tải Lên Avatar
                  </Button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/jpeg, image/png"
                    style={styles.hiddenInput}
                  />

                  <div style={styles.fileInfo}>
                    <p className="mb-0">Kích thước tối đa: 1 MB</p>
                    <p style={styles.fileFormat}>Định dạng: JPEG, PNG</p>
                  </div>

                  <div style={styles.buttonContainer}>
                    <Button
                      variant="light"
                      style={styles.cancelBtn}
                      onClick={handleCancelUpload}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="primary"
                      className="save-btn"
                      style={styles.saveBtn}
                      onClick={uploadAvatar}
                    >
                      {loading ? (
                        <Spinner animation="border" size="sm" /> // Hiển thị loading spinner khi đang tải
                      ) : (
                        "Lưu" // Hiển thị chữ 'Lưu' khi không có loading
                      )}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* Ant Design Modal for Avatar View */}
        <Modal
          title=""
          open={isModalVisible}
          onCancel={handleCloseAvatarModal}
          footer={null}
          width={500}
          centered
        >
          <div style={styles.modalContent}>
            <AnimatePresence>
              {isModalVisible && (
                <motion.img
                  src={previewUrl || avatarUrl || defaultAvatar}
                  alt="User Avatar"
                  style={styles.modalAvatar}
                  initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotate: 10 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 0.5,
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </Modal>
      </Container>
    </>
  );
};

export default ProfileAvatar;
