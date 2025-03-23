"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { XCircle } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from "../../components/navbar/CustomNavbar";

const FailedRegister = () => {
  const [animate, setAnimate] = useState(false);

  // Error color instead of teal
  const errorColor = "#E53935";

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  // Define styles directly in the component
  const styles = {
    failedCard: {
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
      backgroundColor: `rgba(229, 57, 53, 0.1)`,
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
    errorIcon: {
      color: errorColor,
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
      width: "100%",
      padding: "0.5rem 0",
      transition: "all 0.3s ease",
      borderColor: "#dee2e6",
    },
    retryBtn: {
      width: "100%",
      padding: "0.5rem 0",
      backgroundColor: errorColor,
      borderColor: errorColor,
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
          
          .cancel-btn:hover, .retry-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          .cancel-btn:hover {
            background-color: #f8f9fa;
          }
          
          .retry-btn:hover {
            background-color: #C62828 !important;
            border-color: #C62828 !important;
          }
          
          /* Add shake animation for error effect */
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
          }
          
          .shake-animation {
            animation: shake 0.8s cubic-bezier(.36,.07,.19,.97) both;
          }
        `}
      </style>
      <CustomNavbar />
      <Container className="d-flex align-items-center justify-content-center vh-100">
        <Card
          style={styles.failedCard}
          className={animate ? "shake-animation" : ""}
        >
          <Card.Body className="text-center p-4">
            <div style={{ ...styles.iconContainer, marginBottom: "1.5rem" }}>
              <XCircle size={40} style={styles.errorIcon} />
            </div>

            <h4 style={{ ...styles.title, marginBottom: "1.5rem" }}>
              Registration Failed ! Please try again
            </h4>

            <p style={{ ...styles.subtitle, marginBottom: "1.5rem" }}>
              We couldn't complete your registration. Please check your
              information and try again.
            </p>

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
                <Button style={styles.retryBtn} className="retry-btn w-100">
                  Try Again
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default FailedRegister;
