"use client";

import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { Download, Printer } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
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
    certificateSelector: {
      marginBottom: "2rem",
    },
    certificateContainer: {
      border: "1px solid #ddd",
      padding: "0.5rem",
      backgroundColor: "white",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      marginBottom: "1.5rem",
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
    certificateHeader: {
      textAlign: "center",
      marginBottom: "1.5rem",
    },
    certificateTitle: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#0E606E",
      marginBottom: "0.5rem",
      fontFamily: "serif",
    },
    certificateSubtitle: {
      fontSize: "1.2rem",
      color: "#555",
      marginBottom: "0.5rem",
    },
    certificateOrg: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "0.25rem",
    },
    certificatePartner: {
      fontSize: "1rem",
      fontStyle: "italic",
      marginBottom: "1.5rem",
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
    certificateActions: {
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
      
      .action-btn:hover {
        background-color: #0a4c57 !important;
        border-color: #0a4c57 !important;
      }
      
      @media print {
        body * {
          visibility: hidden;
        }
        .certificate-container, .certificate-container * {
          visibility: visible;
        }
        .certificate-container {
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

  // Sample certificate data
  const certificates = [
    {
      id: 1,
      organization: "Green Earth Foundation",
      partner: "In partnership with City Environmental Department",
      event: "Tree Planting Drive",
      startDate: "April 19, 2023",
      endDate: "April 19, 2023",
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
      event: "Blood Donation Camp",
      startDate: "April 23, 2023",
      endDate: "April 23, 2023",
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
      event: "Animal Shelter Volunteering",
      startDate: "May 5, 2023",
      endDate: "May 5, 2023",
      description:
        "For dedicated service to animal welfare through volunteering at our shelter, providing care, comfort, and companionship to animals in need. Your compassion has made a meaningful impact on the lives of rescued animals.",
      signatories: [
        { name: "Robert Wilson", title: "Shelter Manager" },
        { name: "Lisa Thompson", title: "Volunteer Coordinator" },
      ],
    },
  ];

  const [selectedCertificate, setSelectedCertificate] = useState(
    certificates[0].id
  );

  const certificate = certificates.find(
    (cert) => cert.id === selectedCertificate
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // This would typically use a library like html2canvas or jsPDF
    // For this example, we'll just trigger a print which can be saved as PDF
    window.print();
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
                    className="menu-item active"
                    style={{ ...styles.menuItem, ...styles.menuItemActive }}
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
                <h4 className="mb-0">CERTIFICATE</h4>
              </Card.Header>
              <Card.Body style={styles.infoCardBody}>
                <div style={styles.certificateSelector}>
                  <Form.Group>
                    <Form.Label>Select Certificate</Form.Label>
                    <Form.Select
                      value={selectedCertificate}
                      onChange={(e) =>
                        setSelectedCertificate(Number(e.target.value))
                      }
                    >
                      {certificates.map((cert) => (
                        <option key={cert.id} value={cert.id}>
                          {cert.event} - {cert.startDate}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>

                <div
                  className="certificate-container"
                  style={styles.certificateContainer}
                >
                  <div style={styles.certificate}>
                    <div style={styles.certificateInner}>
                      <div style={styles.certificateHeader}>
                        <div style={styles.certificateTitle}>
                          Certificate of Participation
                        </div>
                        <div style={styles.certificateSubtitle}>
                          This is to certify that
                        </div>
                      </div>

                      <div style={styles.certificateContent}>
                        <div style={styles.certificateName}>
                          Hung Pham Trong
                        </div>
                        <div style={styles.certificatePresented}>
                          has successfully participated in
                        </div>
                        <div style={styles.certificateEvent}>
                          {certificate.event}
                        </div>
                        <div style={styles.certificateDates}>
                          {certificate.startDate === certificate.endDate
                            ? `on ${certificate.startDate}`
                            : `from ${certificate.startDate} to ${certificate.endDate}`}
                        </div>
                        <div style={styles.certificateOrg}>
                          {certificate.organization}
                        </div>
                        <div style={styles.certificatePartner}>
                          {certificate.partner}
                        </div>
                      </div>

                      <div style={styles.certificateDescription}>
                        {certificate.description}
                      </div>

                      <div style={styles.certificateFooter}>
                        {certificate.signatories.map((sig, index) => (
                          <div key={index} style={styles.certificateSignature}>
                            <div style={styles.signatureLine}></div>
                            <div style={styles.signatureName}>{sig.name}</div>
                            <div style={styles.signatureTitle}>{sig.title}</div>
                          </div>
                        ))}
                      </div>

                      <div style={styles.certificateSeal}>
                        OFFICIAL
                        <br />
                        CERTIFICATE
                      </div>
                    </div>
                  </div>
                </div>

                <div style={styles.certificateActions}>
                  <Button
                    className="action-btn"
                    style={styles.actionButton}
                    onClick={handlePrint}
                  >
                    <Printer /> Print
                  </Button>
                  <Button
                    className="action-btn"
                    style={styles.actionButton}
                    onClick={handleDownload}
                  >
                    <Download /> Download
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileCertificate;
