"use client";

import React, { useState, useRef } from "react";
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
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import defaultAvatar from "../../assets/defaultAvatar.png";
import { AiOutlineUser, AiOutlinePicture, AiOutlineHistory, AiOutlineHeart, AiOutlineStar, AiOutlineIdcard, AiOutlineLogout, AiOutlineUpload } from "react-icons/ai";


const ProfileInfo = () => {
  // Get current user
  const currentUser = useAuthStore((state) => state.currentUser);
  const { updateUser, logout } = useAuthStore();
  const navigate = useNavigate();
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
  // Modal state for CCCD image preview
  const [cccdModalOpen, setCccdModalOpen] = useState(false);
  const [cccdModalImg, setCccdModalImg] = useState("");

  // Open modal with selected image
  const handleOpenCccdModal = (imgUrl) => {
    setCccdModalImg(imgUrl);
    setCccdModalOpen(true);
  };

  // Close modal
  const handleCloseCccdModal = () => {
    setCccdModalOpen(false);
    setCccdModalImg("");
  };
  // CCCD image upload state
  const [cccdFiles, setCccdFiles] = useState([]);
  const [cccdPreviews, setCccdPreviews] = useState([]);
  const [cccdUploading, setCccdUploading] = useState(false);
  const [uploadedCccdImages, setUploadedCccdImages] = useState(
    (currentUser.cccdImages && currentUser.cccdImages.slice(0, 2)) || []
  );
  // Ref for file input
  const cccdFileInputRef = useRef(null);

  // Handle CCCD file selection
  const handleCccdFileChange = (e) => {
    let files = Array.from(e.target.files);
    // Only allow up to 2 images in total (uploaded + new)
    const maxSelectable = 2 - uploadedCccdImages.length;
    if (maxSelectable <= 0) {
      CustomFailedToast("Chỉ được phép tải lên tối đa 2 ảnh CCCD.");
      return;
    }
    files = files.slice(0, maxSelectable);
    setCccdFiles(files);
    setCccdPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  // Upload CCCD images
  const handleCccdUpload = async () => {
    if (cccdFiles.length === 0) {
      CustomFailedToast("Vui lòng chọn ảnh CCCD để tải lên.");
      return;
    }
    if (uploadedCccdImages.length >= 2) {
      CustomFailedToast("Chỉ được phép tải lên tối đa 2 ảnh CCCD.");
      return;
    }
    if (uploadedCccdImages.length + cccdFiles.length > 2) {
      CustomFailedToast("Tổng số ảnh CCCD không được vượt quá 2.");
      return;
    }
    setCccdUploading(true);
    const formData = new FormData();
    cccdFiles.forEach((file) => formData.append("cccdImages", file));
    try {
      const res = await axiosInstance.put("/profile/upload-cccd", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data && res.data.cccdImages) {
        setUploadedCccdImages(res.data.cccdImages.slice(0, 2));
        setCccdFiles([]);
        setCccdPreviews([]);
        CustomSuccessToast(res.data.message || "Tải ảnh CCCD thành công.");
        updateUser(res.data.user);
      }
    } catch (err) {
      CustomFailedToast("Tải ảnh CCCD thất bại.");
    } finally {
      setCccdUploading(false);
    }
  };

  // State for custom confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Show the custom confirmation modal
  const handleRemoveCccdImage = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  // Confirm deletion (called when user clicks 'Vâng hãy xóa đi')
  const confirmRemoveCccdImage = async () => {
    const index = deleteIndex;
    setShowDeleteModal(false);
    setDeleteIndex(null);
    const imageToRemove = uploadedCccdImages[index];
    try {
      // Call backend to remove the image by URL
      const res = await axiosInstance.put("/profile/remove-cccd", {
        imageUrl: imageToRemove,
      });
      if (res.data && res.data.cccdImages) {
        setUploadedCccdImages(res.data.cccdImages.slice(0, 2));
        CustomSuccessToast(res.data.message || "Đã xóa ảnh CCCD thành công.");
        updateUser(res.data.user);
      } else {
        throw new Error();
      }
    } catch (err) {
      CustomFailedToast("Xóa ảnh CCCD thất bại. Vui lòng thử lại.");
    }
  };
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

  // Format phone number for display (e.g., 0123456789 -> 0123 456 789)
  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, "");
    // Format: 4-3-3 (Vietnam style: 0123 456 789)
    if (digits.length === 10) {
      return digits.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
    }
    // Fallback: just return digits
    return digits;
  };

  // Format date of birth for display (e.g., 27/05/2025)
  const formatDob = (dob) => {
    if (!dob) return "";
    // Accept ISO or Date object, return dd/mm/yyyy
    let dateObj;
    if (typeof dob === "string" && dob.includes("-")) {
      dateObj = new Date(dob);
    } else if (dob instanceof Date) {
      dateObj = dob;
    } else {
      // Try parsing dd/mm/yyyy
      const [d, m, y] = dob.split("/");
      if (d && m && y) return `${d.padStart(2, "0")}/${m.padStart(2, "0")}/${y}`;
      return dob;
    }
    if (isNaN(dateObj)) return dob;
    return dateObj.toLocaleDateString("en-GB");
  };

  // Validate and format input for phone and dob
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData({
        ...formData,
        phone: value.replace(/\s/g, ""),
      });
    } else if (name === "dob") {
      // Only allow dd/mm/yyyy format (numbers and /)
      let clean = value.replace(/[^0-9/]/g, "");
      // Auto-insert / as user types
      if (clean.length === 2 && value.length === 3 && value[2] !== "/") clean = clean.slice(0,2) + "/" + clean.slice(2);
      if (clean.length === 5 && value.length === 6 && value[5] !== "/") clean = clean.slice(0,5) + "/" + clean.slice(5);
      // Limit to 10 chars (dd/mm/yyyy)
      clean = clean.slice(0, 10);
      setFormData({
        ...formData,
        dob: clean,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
      setFormData((prev) => ({
        ...prev,
        phone: currentUser.phone,
      }));
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
      setFormData((prev) => ({
        ...prev,
        dob: currentUser.dob
          ? new Date(currentUser.dob).toLocaleDateString("en-GB")
          : "",
      }));
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
                      <p style={styles.accountType}>Tài Khoản cá nhân</p>
                    </div>
                  </div>
                  <div style={styles.menuItems}>
                    <div
                      className="menu-item active"
                      style={{ ...styles.menuItem, ...styles.menuItemActive }}
                      onClick={() => navigate("/profile-information")}
                    >
                      <AiOutlineUser style={{ marginRight: 8, fontSize: 20, verticalAlign: 'middle' }} />
                      <span>Thông tin </span>
                    </div>
                    <div
                      className="menu-item"
                      style={styles.menuItem}
                      onClick={() => navigate("/profile-avatar")}
                    >
                      <AiOutlinePicture style={{ marginRight: 8, fontSize: 20, verticalAlign: 'middle' }} />
                      <span>Cập Nhật Avatar </span>
                    </div>
                    <div
                      className="menu-item"
                      style={styles.menuItem}
                      onClick={() => navigate("/profile-history")}
                    >
                      <AiOutlineHistory style={{ marginRight: 8, fontSize: 20, verticalAlign: 'middle' }} />
                      <span>Lịch sử nỗ lực</span>
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
                      <span>Chứng Chỉ </span>
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
                    <AiOutlineUser style={{ marginRight: 10, fontSize: 24, verticalAlign: 'middle' }} />
                    THÔNG TIN
                  </h4>
                </Card.Header>
                <Card.Body style={styles.infoCardBody}>
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>
                            <AiOutlineUser style={{ marginRight: 6, fontSize: 18, verticalAlign: 'middle' }} />
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
                            <AiOutlineUser style={{ marginRight: 6, fontSize: 18, verticalAlign: 'middle' }} />
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
                            <AiOutlineIdcard style={{ marginRight: 6, fontSize: 18, verticalAlign: 'middle' }} />
                            Ngày sinh
                          </Form.Label>
                          {/* Custom tooltip for date format */}
                          <OverlayTrigger
                            placement="bottom"
                            overlay={
                              <Tooltip id="dob-tooltip">
                                Định dạng hợp lệ: <b>dd/mm/yyyy</b>
                              </Tooltip>
                            }
                          >
                            <Form.Control
                              type="text"
                              name="dob"
                              value={formatDob(formData.dob)}
                              onChange={handleChange}
                              style={styles.formControl}
                              placeholder="dd/mm/yyyy"
                              maxLength={10}
                              pattern="^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\d{4}$"
                            />
                          </OverlayTrigger>


                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>
                            <AiOutlineIdcard style={{ marginRight: 6, fontSize: 18, verticalAlign: 'middle' }} />
                            CMND
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="cccdNumber"
                            value={formData.cccdNumber}
                            onChange={handleChange}
                            style={styles.formControl}
                            readOnly
                          />
                          {/* CCCD image upload and preview */}
                          <div style={{ marginTop: 12 }}>
                            <Form.Label style={styles.formLabel}>
                              Ảnh CCCD (tối đa 2 ảnh: mặt trước & sau)
                            </Form.Label>
                            <Form.Control
                              type="file"
                              accept="image/jpeg, image/png"
                              multiple
                              onChange={handleCccdFileChange}
                              style={{ marginBottom: 8 }}
                              ref={cccdFileInputRef}
                            />
                            {/* Preview selected images */}
                            <div
                              style={{
                                display: "flex",
                                gap: 8,
                                marginBottom: 8,
                              }}
                            >
                              {cccdPreviews.map((url, idx) => (
                                <img
                                  key={idx}
                                  src={url}
                                  alt={`CCCD preview ${idx + 1}`}
                                  style={{
                                    width: 80,
                                    height: 50,
                                    objectFit: "cover",
                                    border: "1px solid #ccc",
                                    borderRadius: 4,
                                  }}
                                />
                              ))}
                            </div>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={handleCccdUpload}
                                disabled={cccdUploading || cccdFiles.length === 0}
                                aria-label="Tải lên CCCD"
                              >
                                {cccdUploading ? (
                                  <Spinner animation="border" size="sm" />
                                ) : (
                                  <AiOutlineUpload style={{ fontSize: 20 }} />
                                )}
                              </Button>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                disabled={cccdUploading || cccdFiles.length === 0}
                                onClick={() => {
                                  setCccdFiles([]);
                                  setCccdPreviews([]);
                                  if (cccdFileInputRef.current) {
                                    cccdFileInputRef.current.value = "";
                                  }
                                }}
                              >
                                Hủy
                              </Button>
                            </div>
                            {/* Show already uploaded CCCD images */}
                            {uploadedCccdImages.length > 0 && (
                              <div style={{ marginTop: 8 }}>
                                <div
                                  style={{
                                    fontSize: 13,
                                    color: "#555",
                                    marginBottom: 12,
                                    marginTop: 10,
                                  }}
                                >
                                  Ảnh CCCD đã tải lên:
                                </div>
                                <div style={{ display: "flex", gap: 8 }}>
                                  {uploadedCccdImages.map((url, idx) => (
                                    <div
                                      key={idx}
                                      style={{
                                        position: "relative",
                                        display: "inline-block",
                                      }}
                                    >
                                      <img
                                        src={url}
                                        alt={`CCCD uploaded ${idx + 1}`}
                                        style={{
                                          width: 80,
                                          height: 50,
                                          objectFit: "cover",
                                          border: "1px solid #4dabbc",
                                          borderRadius: 4,
                                          cursor: "pointer",
                                        }}
                                        onClick={() => handleOpenCccdModal(url)}
                                        title="Nhấn để xem lớn"
                                      />
                                      <Button
                                        variant="danger"
                                        size="sm"
                                        style={{
                                          position: "absolute",
                                          top: -8,
                                          right: -8,
                                          borderRadius: "50%",
                                          padding: "0 6px",
                                          fontSize: 12,
                                          lineHeight: 1,
                                          minWidth: 0,
                                        }}
                                        onClick={() =>
                                          handleRemoveCccdImage(idx)
                                        }
                                        title="Xóa ảnh này"
                                      >
                                        ×
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>
                            <AiOutlineUser style={{ marginRight: 6, fontSize: 18, verticalAlign: 'middle' }} />
                            Số điện thoại
                          </Form.Label>
                          <OverlayTrigger
                            placement="bottom"
                            overlay={
                              <Tooltip id="phone-tooltip">
                                Vui lòng nhập số điện thoại hợp lệ gồm 10 chữ số.
                              </Tooltip>
                            }
                          >
                            <Form.Control
                              type="text"
                              name="phone"
                              value={formatPhoneNumber(formData.phone)}
                              onChange={handleChange}
                              style={styles.formControl}
                              inputMode="numeric"
                              maxLength={12} // 10 digits + 2 spaces
                              placeholder="0123 456 789"
                            />
                          </OverlayTrigger>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={styles.formLabel}>
                            <AiOutlineUser style={{ marginRight: 6, fontSize: 18, verticalAlign: 'middle' }} />
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
                      <Form.Label style={styles.formLabel}>
                        <AiOutlineUser style={{ marginRight: 6, fontSize: 18, verticalAlign: 'middle' }} />
                        Địa chỉ
                      </Form.Label>
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
      {/* CCCD Image Preview Modal */}
      {cccdModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.2s",
          }}
          onClick={handleCloseCccdModal}
        >
          <div
            style={{
              background: "white",
              borderRadius: 8,
              padding: 16,
              boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
              maxWidth: "90vw",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={cccdModalImg}
              alt="CCCD preview"
              style={{
                maxWidth: "80vw",
                maxHeight: "70vh",
                borderRadius: 8,
                marginBottom: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCloseCccdModal}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                borderRadius: "50%",
                fontSize: 18,
                width: 32,
                height: 32,
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Đóng"
            >
              ×
            </Button>
          </div>
        </div>
      )}

      {/* Modern Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 32,
              minWidth: 320,
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              animation: "fadeIn 0.2s",
              position: "relative",
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12, color: '#0E606E', textAlign: 'center' }}>
              Bạn chắc chắn muốn xóa chứ?
            </div>
            <div style={{ color: '#555', fontSize: 15, marginBottom: 24, textAlign: 'center' }}>
              Hành động này không thể hoàn tác.
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <Button
                variant="danger"
                style={{ minWidth: 110, fontWeight: 500 }}
                onClick={confirmRemoveCccdImage}
              >
                Vâng hãy xóa đi
              </Button>
              <Button
                variant="outline-secondary"
                style={{ minWidth: 80, fontWeight: 500 }}
                onClick={() => { setShowDeleteModal(false); setDeleteIndex(null); }}
              >
                Hủy
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
