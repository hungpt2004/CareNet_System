"use client";

import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
// import CustomNavbar from "../../components/navbar/CustomNavbar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";
import useAuthStore from "../../hooks/authStore";
import {
  CustomFailedToast,
  CustomSuccessToast,
  CustomToast,
} from "../../components/toast/CustomToast";
const ProfileInfo = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const [initialFormData, setInitialFormData] = useState({});

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

  // Data cho form
  const [formData, setFormData] = useState({
    fullname: "",
    gender: "",
    birthdate: "",
    cmnd: "",
    phone: "",
    email: "",
    address: "",
  });

  //Nhập data vào form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Xử lý nộp form qua api và cập nhật form (Data cho form)
   const handleSubmit = (e) => {
     e.preventDefault();

     // Validate Date of Birth (dob)
     const dob = new Date(formData.birthdate);
     const today = new Date();

     // Check if dob is a future date
     if (dob > today) {
       CustomFailedToast("Date of birth cannot be a future date.");
       setFormData(initialFormData); // Reset the form to initial values
       return; // Prevent form submission
     }

     // Optional: Check if user is at least 18 years old
     const age = today.getFullYear() - dob.getFullYear();
     const month = today.getMonth() - dob.getMonth();
     if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
       age--;
     }

     if (age < 18) {
       CustomFailedToast("You must be at least 18 years old.");
       setFormData(initialFormData); // Reset the form to initial values
       return; // Prevent form submission
     }

     // Validate Phone Number (phone)
     const phoneRegex = /^[0-9]{10,15}$/; // Simple regex for phone numbers (10-15 digits)
     if (!phoneRegex.test(formData.phone)) {
       CustomFailedToast(
         "Phone number is not valid. It must be 10 to 15 digits."
       );
       setFormData(initialFormData); // Reset the form to initial values
       return; // Prevent form submission
     }

     // Convert dob to ISO string
     const dobString = dob.toISOString();

     const updatedProfileData = {
       fullname: formData.fullname,
       phone: formData.phone,
       gender: formData.gender,
       dob: dobString, // Ensure dob is an ISO string
       address: {
         fullAddress: formData.address, // Sending address as an object with "fullAddress"
       },
     };

     if (currentUser) {
       axiosInstance
         .put(`/profile/edit-profile/${currentUser._id}`, updatedProfileData)
         .then((response) => {
           console.log("Profile updated successfully:", response.data);
           if (response.data && response.data.message) {
             CustomSuccessToast(response.data.message); // Display success message from backend
           }

           const updatedUser = response.data.user;

           // Immediately update the form with the new data from the backend
           setFormData({
             fullname: updatedUser.fullname,
             gender: updatedUser.gender,
             birthdate: updatedUser.dob
               ? new Date(updatedUser.dob).toLocaleDateString()
               : "",
             phone: updatedUser.phone,
             fullAddress: updatedUser.address
               ? updatedUser.address.fullAddress
               : "",
           });
         })
         .catch((err) => {
           console.log("Error updating profile:", err);
           if (err.response && err.response.data && err.response.data.message) {
             CustomFailedToast(err.response.data.message); // Display error message from backend
           }
         });
     }
   };

  // Lấy thông tin người dùng qua api (Data cho form)
  React.useEffect(() => {
    if (currentUser) {
      axiosInstance
        .get(`/profile/get-profile/${currentUser._id}`)
        .then((response) => {
          const user = response.data.user;
          const initialData = {
            fullname: user.fullname || "",
            gender: user.gender || "",
            birthdate: user.dob ? new Date(user.dob).toLocaleDateString() : "",
            cmnd: user.cccdNumber || "",
            phone: user.phone || "",
            email: user.email || "",
            address: user.address ? user.address.fullAddress || "" : "",
          };

          // Store initial form data
          setInitialFormData(initialData);

          // Set form data
          setFormData(initialData);
        })
        .catch((err) => {
          console.log("Error fetching user profile:", err);
        });
    }
  }, [currentUser]);


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
                      src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid"
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
                  <h4 className="mb-0">THÔNG TIN</h4>
                </Card.Header>
                <Card.Body style={styles.infoCardBody}>
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>
                            Họ Tên
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
                            Giới Tính
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
                            Ngày Sinh
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="birthdate"
                            value={formData.birthdate}
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
                            name="cmnd"
                            value={formData.cmnd}
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
                            Số Điện Thoại
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
                      <Form.Label style={styles.formLabel}>Địa Chỉ</Form.Label>
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
                      <Button
                        variant="primary"
                        type="submit"
                        className="save-btn"
                        style={styles.saveBtn}
                      >
                        Lưu
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
