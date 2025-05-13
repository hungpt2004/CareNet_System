"use client";

import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Pagination,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { Download, Printer, Eye } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/defaultAvatar.png";
const ProfileCertificate = () => {
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
    certificateGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "1.5rem",
      marginBottom: "1.5rem",
    },
    certificateCard: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "1rem",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    },
    certificateHeader: {
      textAlign: "center",
      marginBottom: "1rem",
      fontWeight: "bold",
    },
    certificateField: {
      display: "flex",
      marginBottom: "0.5rem",
    },
    certificateLabel: {
      width: "100px",
      fontWeight: "500",
      fontSize: "0.9rem",
    },
    certificateValue: {
      flex: 1,
      border: "1px solid #ddd",
      borderRadius: "4px",
      padding: "0.25rem 0.5rem",
      fontSize: "0.9rem",
    },
    viewButton: {
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
    certificate: {
      position: "relative",
      width: "100%",
      minHeight: "500px",
      border: "10px solid #0E606E",
      padding: "2rem",
      backgroundColor: "white",
      backgroundImage: "radial-gradient(#0E606E 8%, transparent 8%)",
      backgroundSize: "25px 25px",
      backgroundPosition: "-19px -19px",
    },
    certificateInner: {
      position: "relative",
      height: "100%",
      border: "2px solid #0E606E",
      padding: "3rem 2rem",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
    certificateTitle: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#0E606E",
      marginBottom: "0.5rem",
      fontFamily: "serif",
      textAlign: "center",
    },
    certificateSubtitle: {
      fontSize: "1.2rem",
      color: "#555",
      marginBottom: "0.5rem",
      textAlign: "center",
    },
    certificateOrg: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "0.25rem",
      textAlign: "center",
    },
    certificatePartner: {
      fontSize: "1rem",
      fontStyle: "italic",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    certificateContent: {
      textAlign: "center",
      marginBottom: "1.5rem",
    },
    certificatePresented: {
      fontSize: "1.2rem",
      marginBottom: "1rem",
    },
    certificateName: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "1rem",
      fontFamily: "cursive",
    },
    certificateEvent: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#0E606E",
      marginBottom: "0.5rem",
    },
    certificateDates: {
      fontSize: "1rem",
      marginBottom: "1.5rem",
    },
    certificateDescription: {
      fontSize: "0.9rem",
      fontStyle: "italic",
      maxWidth: "80%",
      margin: "0 auto 2rem",
      lineHeight: "1.5",
      textAlign: "center",
    },
    certificateFooter: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      marginTop: "1rem",
    },
    certificateSignature: {
      textAlign: "center",
      width: "45%",
    },
    signatureLine: {
      width: "100%",
      height: "1px",
      backgroundColor: "#333",
      marginBottom: "0.5rem",
    },
    signatureName: {
      fontWeight: "bold",
    },
    signatureTitle: {
      fontSize: "0.8rem",
      color: "#555",
    },
    certificateSeal: {
      position: "absolute",
      bottom: "2rem",
      right: "2rem",
      width: "100px",
      height: "100px",
      backgroundImage: "radial-gradient(#0E606E 60%, transparent 60%)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: "0.8rem",
      textAlign: "center",
      transform: "rotate(-15deg)",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    },
    modalActions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "1rem",
      marginTop: "1rem",
    },
    actionButton: {
      backgroundColor: "#0E606E",
      border: "none",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    modalBody: {
      padding: "0",
    },
    modalContent: {
      width: "90vw",
      maxWidth: "900px",
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
      
      .view-btn:hover {
        background-color: #0a4c57 !important;
        border-color: #0a4c57 !important;
      }
      
      .action-btn:hover {
        background-color: #0a4c57 !important;
        border-color: #0a4c57 !important;
      }
      
      @media print {
        body * {
          visibility: hidden;
        }
        .certificate-to-print, .certificate-to-print * {
          visibility: visible;
        }
        .certificate-to-print {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          box-shadow: none !important;
          border: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Sample certificate data - expanded to demonstrate pagination
  const certificates = [
    {
      id: 1,
      organization: "Green Earth Foundation",
      partner: "In partnership with City Environmental Department",
      event: "Chương Trình Trồng Cây",
      startDate: "19 tháng 4, 2023",
      endDate: "19 tháng 4, 2023",
      description:
        "For outstanding contribution to environmental conservation through active participation in tree planting activities, demonstrating commitment to creating a greener and more sustainable future for our community.",
      signatories: [
        { name: "John Smith", title: "Program Director" },
        { name: "Sarah Johnson", title: "City Environmental Officer" },
      ],
    },
    {
      id: 2,
      organization: "National Blood Services",
      partner: "In collaboration with City General Hospital",
      event: "Trại Hiến Máu",
      startDate: "23 tháng 4, 2023",
      endDate: "23 tháng 4, 2023",
      description:
        "For the selfless act of donating blood, helping save lives and contributing to the community's health and well-being. Your generosity makes a significant difference in emergency medical care.",
      signatories: [
        { name: "Dr. Michael Chen", title: "Medical Director" },
        { name: "Emily Rodriguez", title: "Blood Drive Coordinator" },
      ],
    },
    {
      id: 3,
      organization: "Animal Welfare Society",
      partner: "Supported by Pet Lovers Association",
      event: "Tình Nguyện tại Trại Cứu Hộ Động Vật",
      startDate: "5 tháng 5, 2023",
      endDate: "5 tháng 5, 2023",
      description:
        "For dedicated service to animal welfare through volunteering at our shelter, providing care, comfort, and companionship to animals in need. Your compassion has made a meaningful impact on the lives of rescued animals.",
      signatories: [
        { name: "Robert Wilson", title: "Shelter Manager" },
        { name: "Lisa Thompson", title: "Volunteer Coordinator" },
      ],
    },
    {
      id: 4,
      organization: "Community Council",
      partner: "In collaboration with City Parks Department",
      event: "Dọn Dẹp Công Viên Cộng Đồng",
      startDate: "12 tháng 5, 2023",
      endDate: "12 tháng 5, 2023",
      description:
        "For dedicated service to the community through participation in the park cleanup initiative, helping to create cleaner, safer, and more beautiful public spaces for all residents to enjoy.",
      signatories: [
        { name: "David Martinez", title: "Community Coordinator" },
        { name: "Jennifer Lee", title: "Parks Department Director" },
      ],
    },
    {
      id: 5,
      organization: "Youth Education Foundation",
      partner: "In partnership with City School District",
      event: "Chương Trình Tình Nguyện Giúp Đỡ Học Sinh",
      startDate: "3 tháng 6, 2023",
      endDate: "10 tháng 6, 2023",
      description:
        "For dedicated service to youth education through participation in the literacy volunteer program, helping students develop essential reading skills and fostering a love of learning in our community.",
      signatories: [
        { name: "Patricia Wong", title: "Education Director" },
        { name: "Thomas Brown", title: "School District Superintendent" },
      ],
    },
    {
      id: 6,
      organization: "Elderly Care Association For Student",
      partner: "Supported by Community Health Services",
      event: "Chương Trình Thăm Hỏi Người Cao Tuổi",
      startDate: "15 tháng 6, 2023",
      endDate: "22 tháng 6, 2023",
      description:
        "For compassionate service to elderly community members through the senior companion program, providing social interaction, assistance, and emotional support to improve the quality of life for seniors.",
      signatories: [
        { name: "Margaret Wilson", title: "Program Coordinator" },
        { name: "Dr. James Taylor", title: "Geriatric Care Specialist" },
      ],
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const certificatesPerPage = 4;

  // Calculate total pages
  const totalPages = Math.ceil(certificates.length / certificatesPerPage);

  // Get current certificates
  const indexOfLastCertificate = currentPage * certificatesPerPage;
  const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;
  const currentCertificates = certificates.slice(
    indexOfFirstCertificate,
    indexOfLastCertificate
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
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
                    className="menu-item"
                    style={styles.menuItem}
                    onClick={() => navigate("/profile-score")}
                  >
                    <span>Số Điểm</span>
                  </div>
                  <div
                    className="menu-item active"
                    style={{ ...styles.menuItem, ...styles.menuItemActive }}
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
                <h4 className="mb-0">CHỨNG CHỈ</h4>
              </Card.Header>
              <Card.Body style={styles.infoCardBody}>
                <div style={styles.certificateGrid}>
                  {currentCertificates.map((certificate) => (
                    <motion.div
                      key={certificate.id}
                      style={styles.certificateCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: (certificate.id % certificatesPerPage) * 0.1,
                      }}
                    >
                      <h5 style={styles.certificateHeader}>
                        Mã Chứng Chỉ: {certificate.id}
                      </h5>

                      <div style={styles.certificateField}>
                        <div style={styles.certificateLabel}>Sự Kiện:</div>
                        <div style={styles.certificateValue}>
                          {certificate.event}
                        </div>
                      </div>

                      <div style={styles.certificateField}>
                        <div style={styles.certificateLabel}>Tổ Chức:</div>
                        <div style={styles.certificateValue}>
                          {certificate.organization}
                        </div>
                      </div>

                      <div style={styles.certificateField}>
                        <div style={styles.certificateLabel}>Ngày:</div>
                        <div style={styles.certificateValue}>
                          {certificate.startDate === certificate.endDate
                            ? certificate.startDate
                            : `${certificate.startDate} - ${certificate.endDate}`}
                        </div>
                      </div>

                      <Button
                        className="view-btn"
                        style={styles.viewButton}
                        onClick={() => handleShowCertificate(certificate)}
                      >
                        <Eye className="me-2" /> Xem Chứng Chỉ
                      </Button>
                    </motion.div>
                  ))}
                </div>

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

      {/* Certificate Modal */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="xl"
        centered
        dialogClassName="modal-90w"
        contentClassName="certificate-modal"
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#0E606E", color: "white" }}
        >
          <Modal.Title>Chứng Chỉ - {selectedCertificate?.event}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          {selectedCertificate && (
            <div className="certificate-to-print">
              <div style={styles.certificate}>
                <div style={styles.certificateInner}>
                  <div>
                    <div style={styles.certificateTitle}>
                      Chứng Chỉ Tham Gia
                    </div>
                    <div style={styles.certificateSubtitle}>
                      Chứng nhận rằng
                    </div>
                  </div>

                  <div style={styles.certificateContent}>
                    <div style={styles.certificateName}>Hung Pham Trong</div>
                    <div style={styles.certificatePresented}>
                      đã tham gia thành công vào
                    </div>
                    <div style={styles.certificateEvent}>
                      {selectedCertificate.event}
                    </div>
                    <div style={styles.certificateDates}>
                      {selectedCertificate.startDate ===
                      selectedCertificate.endDate
                        ? `vào ${selectedCertificate.startDate}`
                        : `từ ${selectedCertificate.startDate} đến ${selectedCertificate.endDate}`}
                    </div>
                    <div style={styles.certificateOrg}>
                      {selectedCertificate.organization}
                    </div>
                    <div style={styles.certificatePartner}>
                      {selectedCertificate.partner}
                    </div>
                  </div>

                  <div style={styles.certificateDescription}>
                    {selectedCertificate.description}
                  </div>

                  <div style={styles.certificateFooter}>
                    {selectedCertificate.signatories.map((sig, index) => (
                      <div key={index} style={styles.certificateSignature}>
                        <div style={styles.signatureLine}></div>
                        <div style={styles.signatureName}>{sig.name}</div>
                        <div style={styles.signatureTitle}>{sig.title}</div>
                      </div>
                    ))}
                  </div>

                  <div style={styles.certificateSeal}>
                    CHỨNG NHẬN CHÍNH THỨC
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div style={styles.modalActions}>
            <Button
              className="action-btn"
              style={styles.actionButton}
              onClick={handlePrint}
            >
              <Printer className="me-1" /> In
            </Button>
            <Button
              className="action-btn"
              style={styles.actionButton}
              onClick={handleDownload}
            >
              <Download className="me-1" /> Tải Xuống
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfileCertificate;
