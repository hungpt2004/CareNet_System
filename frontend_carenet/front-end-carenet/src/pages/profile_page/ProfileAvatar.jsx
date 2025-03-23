"use client";

import React, { useState, useRef } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import CustomNavbar from "../../components/navbar/CustomNavbar";

const AccountAvatar = () => {
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
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleViewAvatar = () => {
    // Open avatar in new tab or modal
    if (selectedFile) {
      window.open(selectedFile, "_blank");
    } else {
      window.open(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-suTKYwhiuAHDzMequZcZHjaRpCeWdp.png",
        "_blank"
      );
    }
  };

  return (
    <>
    <CustomNavbar />
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ ...styles.accountContainer, maxWidth: "1000px" }} // Limit max width
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
                  <div className="menu-item" style={styles.menuItem}>
                    <span>Information</span>
                  </div>
                  <div
                    className="menu-item active"
                    style={{ ...styles.menuItem, ...styles.menuItemActive }}
                  >
                    <span>Update Avatar</span>
                  </div>
                  <div className="menu-item" style={styles.menuItem}>
                    <span>History Effort</span>
                  </div>
                  <div className="menu-item" style={styles.menuItem}>
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
        <Col md={8} style={{ marginTop: "70px" }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card style={styles.infoCard}>
              <Card.Header style={styles.infoHeader}>
                <h4 className="mb-0">UPLOAD AVATAR</h4>
              </Card.Header>
              <Card.Body style={styles.infoCardBody}>
                <img
                  src={
                    selectedFile ||
                    "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                  }
                  alt="User Avatar"
                  style={styles.largeAvatar}
                />

                <Button
                  variant="dark"
                  style={styles.actionButton}
                  onClick={handleViewAvatar}
                >
                  View Avatar
                </Button>

                <Button
                  variant="dark"
                  style={styles.actionButton}
                  onClick={handleUploadClick}
                >
                  Upload File Image
                </Button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/jpeg, image/png"
                  style={styles.hiddenInput}
                />

                <div style={styles.fileInfo}>
                  <p className="mb-0">Maximum file size is 1 MB</p>
                  <p style={styles.fileFormat}>Format: JPEG, PNG</p>
                </div>

                <div style={styles.buttonContainer}>
                  <Button variant="light" style={styles.cancelBtn}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    className="save-btn"
                    style={styles.saveBtn}
                  >
                    Save
                  </Button>
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

export default AccountAvatar;
