"use client";

import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
// import CustomNavbar from "../../components/navbar/CustomNavbar";
import { useNavigate } from "react-router-dom";
const ProfileInfo = () => {
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

  const [formData, setFormData] = useState({
    fullname: "Hung Pham Trong",
    gender: "Male",
    birthdate: "20/02/2004",
    cmnd: "1234567891",
    phone: "0947811575",
    email: "hungpham1603@hcmut.edu.vn",
    address: "123 Street ABC, DEF District, Laha City",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };
  const navigate = useNavigate();

  return (
    <>
      {/* <CustomNavbar /> */}
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
                      <p style={styles.accountType}>Normal Account</p>
                    </div>
                  </div>
                  <div style={styles.menuItems}>
                    <div
                      className="menu-item active"
                      style={{ ...styles.menuItem, ...styles.menuItemActive }}
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
                      className="menu-item"
                      style={styles.menuItem}
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
                  <h4 className="mb-0">INFORMATION</h4>
                </Card.Header>
                <Card.Body style={styles.infoCardBody}>
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>
                            Fullname
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
                            Gender
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
                            Birthdate
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
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>
                            Phone Number
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
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-4">
                      <Form.Label style={styles.formLabel}>Address</Form.Label>
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
                      <Button variant="light" className="me-2">
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        type="submit"
                        className="save-btn"
                        style={styles.saveBtn}
                      >
                        Save
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
