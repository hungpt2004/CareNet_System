"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { CheckCircle } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
// import CustomNavbar from "../../components/navbar/CustomNavbar";

const SuccessRegister = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  // Define styles directly in the component
  const styles = {
    successCard: {
      borderRadius: "12px",
      overflow: "hidden",
      border: "none",
      opacity: animate ? 1 : 0,
      transform: animate ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.5s ease-out",
      maxWidth: "500px",
      width: "100%",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    iconContainer: {
      backgroundColor: "rgba(14, 96, 110, 0.1)",
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      opacity: animate ? 1 : 0,
      transform: animate ? "scale(1)" : "scale(0.5)",
      transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      transitionDelay: "0.3s",
    },
    checkIcon: {
      color: "#0E606E",
      strokeWidth: 3,
      animation: "pulse 2s infinite",
    },
    title: {
      fontWeight: "bold",
      marginBottom: "0.5rem",
      opacity: animate ? 1 : 0,
      animation: animate ? "fadeSlideIn 0.8s forwards" : "none",
      animationDelay: "0.5s",
    },
    subtitle: {
      color: "#6c757d",
      marginBottom: "1.5rem",
      opacity: animate ? 1 : 0,
      animation: animate ? "fadeSlideIn 0.8s forwards" : "none",
      animationDelay: "0.7s",
    },
    buttonRow: {
      gap: "1rem",
      opacity: animate ? 1 : 0,
      animation: animate ? "fadeSlideIn 0.8s forwards" : "none",
      animationDelay: "0.9s",
    },
    cancelBtn: {
      padding: "0.5rem 1.5rem",
      transition: "all 0.3s ease",
      borderColor: "#dee2e6",
    },
    confirmBtn: {
      padding: "0.5rem 1.5rem",
      backgroundColor: "#0E606E",
      borderColor: "#0E606E",
      transition: "all 0.3s ease",
    },
  };

  return (
    <>
      {/* Add keyframe animations using style tag */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          
          @keyframes fadeSlideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .cancel-btn:hover, .confirm-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          .cancel-btn:hover {
            background-color: #f8f9fa;
          }
          
          .confirm-btn:hover {
            background-color: #0a4b56 !important;
            border-color: #0a4b56 !important;
          }
        `}
      </style>
      {/* <CustomNavbar /> */}
      <Container className="d-flex align-items-center justify-content-center vh-100">
        <Card style={styles.successCard}>
          <Card.Body className="text-center p-4">
            <div style={{ ...styles.iconContainer, marginBottom: "1.5rem" }}>
              <CheckCircle size={40} style={styles.checkIcon} />
            </div>

            <h4 style={{ ...styles.title, marginBottom: "1.5rem" }}>
              Register Successfully! Please wait for an email from CareNet.
            </h4>

            <p style={{ ...styles.subtitle, marginBottom: "1.5rem" }}>
              You will receive a verification email from CareNet in a few
              minutes.
            </p>

            {/* Updated Row to align Confirm button on the right */}
            <Row className="mt-3">
              <Col>
                <Button
                  variant="outline-secondary"
                  style={styles.cancelBtn}
                  className="cancel-btn w-100"
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button style={styles.confirmBtn} className="confirm-btn w-100">
                  Confirm
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default SuccessRegister;
