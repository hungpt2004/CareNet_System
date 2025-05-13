"use client";

import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";
import useAuthStore from "../../hooks/authStore";
import {
  CustomFailedToast,
  CustomSuccessToast,
  CustomToast,
} from "../../components/toast/CustomToast";
import defaultAvatar from "../../assets/defaultAvatar.png";

const ProfileInfo = () => {

  // Get current user
  const currentUser = useAuthStore((state) => state.currentUser);
  const {updateUser} = useAuthStore();

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
    menuItemAfter: {
      content: "''",
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "0",
      height: "2px",
      backgroundColor: "#0E606E",
      transition: "width 0.3s ease",
    },
    menuItemHoverAfter: {
      width: "100%",
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
    formControl: {
      borderRadius: "6px",
      border: "1px solid #ddd",
      padding: "0.6rem 1rem",
      transition: "all 0.3s ease",
    },
    formControlFocus: {
      borderColor: "#0E606E",
      boxShadow: "0 0 0 0.2rem rgba(14, 96, 110, 0.25)",
    },
    formLabel: {
      fontWeight: "500",
      color: "#555",
    },
    saveBtn: {
      backgroundColor: "#0E606E",
      borderColor: "#0E606E",
      padding: "0.5rem 1.5rem",
      transition: "all 0.3s ease",
    },
    saveBtnHover: {
      backgroundColor: "#0a4c57",
      borderColor: "#0a4c57",
      transform: "translateY(-2px)",
    },
    fadeIn: {
      animation: "fadeIn 0.5s ease",
    },
    "@keyframes fadeIn": {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
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
      
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      .form-control, .btn {
        animation: fadeIn 0.5s ease;
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
        background-color: #0a4c57;
        border-color: #0a4c57;
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Khởi tạo form
  const [formData, setFormData] = useState({
    fullname: currentUser.fullname,
    gender: currentUser.gender,
    dob: currentUser.dob
      ? new Date(currentUser.dob).toLocaleDateString("en-GB")
      : "",
    cccdNumber: currentUser.cccdNumber,
    phone: currentUser.phone,
    email: currentUser.email,
    address: currentUser.address.country,
  });

  // Nhập data vào form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Xử lí nộp form và cập nhật form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Convert the date to "yyyy-mm-dd" format if it's in "dd/mm/yyyy" format
    const formattedDob = formData.dob.split("/").reverse().join("-");
    const dobDate = new Date(formattedDob);

    // Validate phone number using regex (example for a 10-digit phone number)
    const phoneRegex = /^[0-9]{10}$/; // Modify based on the expected phone number format
    if (!phoneRegex.test(formData.phone)) {
      setLoading(false);
      CustomFailedToast(
        "Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại hợp lệ gồm 10 chữ số."
      );
      return;
    }

    // Check if the user is at least 18 years old
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }

    if (age < 18) {
      setLoading(false);
      CustomFailedToast("Bạn phải ít nhất 18 tuổi.");
      return;
    }

    // Create updated profile data
    const updatedProfileData = {
      fullname: formData.fullname,
      dob: dobDate.toISOString(), // Format dob to ISO string
      phone: formData.phone,
      gender: formData.gender,
      address: {
        country: formData.address,
      },
    };

    // Ensure currentUser exists before making the request
    if (currentUser) {
      try {
        const res = await axiosInstance.put(
          "/profile/edit-profile",
          updatedProfileData
        );
        console.log("Profile updated successfully:", res.data);
        if (res.data && res.data.message) {
          setLoading(false);
          CustomSuccessToast(res.data.message);
        }

        // Update user in zustand and localStorage (if needed)
        const updatedUser = res.data.user;
        updateUser(updatedUser);
      } catch (err) {
        console.error("Profile update failed:", err);
        if (err.response && err.response.data && err.response.data.message) {
          setLoading(false);
          CustomFailedToast(err.response.data.message);
        }
      }
    }
  };

  return (
    <>
      <CustomToast />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ ...styles.accountContainer, maxWidth: "1100px" }} // Limit max width
        // Limit max width
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
                      <p style={styles.accountType}>Tài Khoản cá nhân</p>
                    </div>
                  </div>
                  <div style={styles.menuItems}>
                    <div
                      className="menu-item active"
                      style={{ ...styles.menuItem, ...styles.menuItemActive }}
                      onClick={() => navigate("/profile-information")}
                    >
                      <span>Thông tin </span>
                    </div>
                    <div
                      className="menu-item"
                      style={styles.menuItem}
                      onClick={() => navigate("/profile-avatar")}
                    >
                      <span>Cập Nhật Avatar </span>
                    </div>
                    <div
                      className="menu-item"
                      style={styles.menuItem}
                      onClick={() => navigate("/profile-history")}
                    >
                      <span>Lịch sử nỗ lực</span>
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
                  <h4 className="mb-0">THÔNG TIN</h4>
                </Card.Header>
                <Card.Body style={styles.infoCardBody}>
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>
                            Họ và tên
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            style={styles.formControl}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>
                            Giới tính
                          </Form.Label>
                          <div>
                            <Form.Check
                              inline
                              type="radio"
                              label="Male"
                              name="gender"
                              id="male"
                              value="Male"
                              checked={formData.gender === "Male"}
                              onChange={handleChange}
                            />
                            <Form.Check
                              inline
                              type="radio"
                              label="Female"
                              name="gender"
                              id="female"
                              value="Female"
                              checked={formData.gender === "Female"}
                              onChange={handleChange}
                            />
                            <Form.Check
                              inline
                              type="radio"
                              label="Other"
                              name="gender"
                              id="other"
                              value="Other"
                              checked={formData.gender === "Other"}
                              onChange={handleChange}
                            />
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>
                            Ngày sinh
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            style={styles.formControl}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>CMND</Form.Label>
                          <Form.Control
                            type="text"
                            name="cccdNumber"
                            value={formData.cccdNumber}
                            onChange={handleChange}
                            style={styles.formControl}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>
                            Số điện thoại
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            style={styles.formControl}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>
                            Email
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.formControl}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-4">
                      <Form.Label style={styles.formLabel}>Địa chỉ</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        style={styles.formControl}
                      />
                    </Form.Group>
                    <div className="text-end">
                      {/* <Button variant="light" className="me-2">
                        Cancel
                      </Button> */}
                      <Button
                        variant="primary"
                        type="submit"
                        className="save-btn"
                        style={styles.saveBtn}
                      >
                        {loading ? (
                          <Spinner animation="border" size="sm" /> // Hiển thị loading spinner khi đang tải
                        ) : (
                          "Lưu" // Hiển thị chữ 'Lưu' khi không có loading
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileInfo;
