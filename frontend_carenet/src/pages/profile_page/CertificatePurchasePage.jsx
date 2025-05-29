import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { Receipt, CreditCard, ArrowClockwise } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/AxiosInstance";

const CertificatePurchasePage = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?._id;
        if (!userId) throw new Error("User ID not found");

        const res = await axios.get(
          `/api/certificate-purchases/user/${userId}`
        );
        setPurchases(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch purchase history:", error);
        setError("Không thể tải lịch sử mua chứng chỉ. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    if (status === "paid") {
      return <Badge bg="success">Đã thanh toán</Badge>;
    } else {
      return (
        <Badge bg="warning" text="dark">
          Chưa thanh toán
        </Badge>
      );
    }
  };

  const handleViewCertificate = (certificateId) => {
    navigate(`/profile-certificate?id=${certificateId}`);
  };

  const handleRetryPayment = (purchaseId) => {
    // Xử lý logic thanh toán lại ở đây
    alert(`Xử lý thanh toán lại cho giao dịch: ${purchaseId}`);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", maxWidth: "1100px", padding: "2rem 0" }}
    >
      <Row className="w-100">
        <Col md={4}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <Card.Body className="p-0">
                <div className="d-flex align-items-center p-3 border-bottom">
                  <img
                    src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid"
                    alt="Avatar"
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      marginRight: "1rem",
                      border: "2px solid #0E606E",
                    }}
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
                    { name: "Certificate", path: "/profile-certificate" },
                    {
                      name: "Certificate Purchases",
                      path: "/profile-certificate-purchases",
                      active: true,
                    },
                    { name: "Log Out", path: "/" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`menu-item ${item.active ? "active" : ""}`}
                      style={{
                        padding: "0.75rem 1.5rem",
                        backgroundColor: item.active
                          ? "#0E606E"
                          : "transparent",
                        color: item.active ? "white" : "black",
                        cursor: "pointer",
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
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <Card.Header
                style={{ backgroundColor: "#0E606E", color: "white" }}
              >
                <h4 className="mb-0">LỊCH SỬ MUA CHỨNG CHỈ</h4>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <div className="text-center py-5">
                    <Spinner animation="border" role="status" variant="primary">
                      <span className="visually-hidden">Đang tải...</span>
                    </Spinner>
                    <p className="mt-3">Đang tải lịch sử giao dịch...</p>
                  </div>
                ) : error ? (
                  <Alert variant="danger">{error}</Alert>
                ) : purchases.length === 0 ? (
                  <div className="text-center py-5">
                    <Receipt size={50} className="text-muted mb-3" />
                    <h5>Bạn chưa có giao dịch mua chứng chỉ nào</h5>
                    <p className="text-muted">
                      Các giao dịch mua chứng chỉ sẽ được hiển thị ở đây
                    </p>
                  </div>
                ) : (
                  <Table responsive striped hover>
                    <thead>
                      <tr>
                        <th>Chứng chỉ</th>
                        <th>Số tiền</th>
                        <th>Phương thức</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th>Ngày thanh toán</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.map((purchase) => (
                        <tr key={purchase._id}>
                          <td>{purchase.certificateId?.eventName || "N/A"}</td>
                          <td>{purchase.amount.toLocaleString()} VND</td>
                          <td>{purchase.paymentMethod.replace("_", " ")}</td>
                          <td>{getStatusBadge(purchase.paymentStatus)}</td>
                          <td>{formatDate(purchase.createdAt)}</td>
                          <td>{formatDate(purchase.paidAt)}</td>
                          <td>
                            {purchase.paymentStatus === "paid" ? (
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() =>
                                  handleViewCertificate(
                                    purchase.certificateId?._id
                                  )
                                }
                              >
                                Xem chứng chỉ
                              </Button>
                            ) : (
                              <Button
                                variant="outline-warning"
                                size="sm"
                                onClick={() => handleRetryPayment(purchase._id)}
                              >
                                <ArrowClockwise className="me-1" /> Thanh toán
                                lại
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default CertificatePurchasePage;
