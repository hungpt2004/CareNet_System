"use client";

import React, { useState, useEffect} from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { Download, Printer } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import axios from '../../utils/AxiosInstance';
const ProfileCertificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?._id;
        if (!userId) throw new Error("User ID not found");

        const res = await axios.get(`/api/certificates/history/${userId}`);
        setCertificates(res.data);
        if (res.data.length > 0) {
          setSelectedCertificate(res.data[0]._id);
        }
      } catch (error) {
        console.error("Failed to fetch certificate history:", error);
      }
    };

    fetchCertificates();
  }, []);

  const certificate = certificates.find(cert => cert._id === selectedCertificate);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print(); // Tạm thời dùng print để lưu PDF, bạn có thể dùng html2canvas sau
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", maxWidth: "1100px", padding: "2rem 0" }}>
      <Row className="w-100">
        <Col md={4}>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <Card.Body className="p-0">
                <div className="d-flex align-items-center p-3 border-bottom">
                  <img
                    src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid"
                    alt="Avatar"
                    style={{ width: 60, height: 60, borderRadius: "50%", marginRight: "1rem", border: "2px solid #0E606E" }}
                  />
                  <div>
                    <h5 className="mb-0">Hung Pham Trong</h5>
                    <small className="text-muted">Normal Account</small>
                  </div>
                </div>
                <div className="p-2">
                  {[
                    { name: "Information", path: "/profile-information" },
                    { name: "Update Avatar", path: "/profile-avatar" },
                    { name: "History Effort", path: "/profile-history" },
                    { name: "Favourite", path: "/profile-favourite" },
                    { name: "Score", path: "/profile-score" },
                    { name: "Certificate", path: "/profile-certificate", active: true },
                    { name: "Certificate Purchases", path: "/profile-certificate-purchases"},
                    { name: "Log Out", path: "/" }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`menu-item ${item.active ? "active" : ""}`}
                      style={{
                        padding: "0.75rem 1.5rem",
                        backgroundColor: item.active ? "#0E606E" : "transparent",
                        color: item.active ? "white" : "black",
                        cursor: "pointer"
                      }}
                      onClick={() => navigate(item.path)}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        <Col md={8} style={{ marginTop: "80px" }}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <Card>
              <Card.Header style={{ backgroundColor: "#0E606E", color: "white" }}>
                <h4 className="mb-0">CERTIFICATE</h4>
              </Card.Header>
              <Card.Body>
                <div className="mb-4">
                  <Form.Group>
                    <Form.Label>Select Certificate</Form.Label>
                    <Form.Select
                      value={selectedCertificate || ""}
                      onChange={(e) => setSelectedCertificate(e.target.value)}
                    >
                      {certificates.map((cert) => (
                        <option key={cert._id} value={cert._id}>
                          {cert.eventName} - {new Date(cert.completionDate).toLocaleDateString()}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>

                {certificate ? (
                  <div className="certificate-container p-3 border rounded shadow-sm bg-white mb-4">
                    <div style={{ border: "10px solid #0E606E", padding: "2rem", backgroundColor: "white", position: "relative" }}>
                      <div style={{ border: "2px solid #0E606E", padding: "3rem 2rem", textAlign: "center" }}>
                        <h2 style={{ color: "#0E606E", fontFamily: "serif" }}>Certificate of Participation</h2>
                        <p className="text-muted mb-4">This is to certify that</p>

                        <h3 style={{ fontFamily: "cursive" }}>{certificate.fullName}</h3>
                        <p className="mb-3">has successfully participated in</p>

                        <h4 className="text-primary">{certificate.eventName}</h4>
                        <p className="text-muted">
                          on {new Date(certificate.completionDate).toLocaleDateString()}
                        </p>

                        <h5 className="mt-3">{certificate.organizationName}</h5>
                        <p className="fst-italic text-muted">{certificate.email}</p>

                        <p className="mt-4" style={{ fontStyle: "italic" }}>
                          Participated for {certificate.duration} hour(s).
                        </p>

                        <div className="d-flex justify-content-between mt-5">
                          <div style={{ width: "45%", textAlign: "center" }}>
                            <div style={{ height: 1, backgroundColor: "#333", marginBottom: "0.5rem" }} />
                            <strong>Admin</strong>
                            <div style={{ fontSize: "0.8rem", color: "#555" }}>Certificate Manager</div>
                          </div>
                        </div>

                        <div style={{
                          position: "absolute",
                          bottom: "2rem",
                          right: "2rem",
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          backgroundColor: "#0E606E",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          transform: "rotate(-15deg)",
                          boxShadow: "0 0 10px rgba(0,0,0,0.2)"
                        }}>
                          OFFICIAL <br /> CERTIFICATE
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>No certificate selected</p>
                )}

                <div className="d-flex justify-content-end gap-2">
                  <Button onClick={handlePrint} style={{ backgroundColor: "#0E606E", border: "none" }}>
                    <Printer /> Print
                  </Button>
                  <Button onClick={handleDownload} style={{ backgroundColor: "#0E606E", border: "none" }}>
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
