"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Check } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
// import CustomNavbar from "../../components/navbar/CustomNavbar";
const UpgradePro = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  // Define styles directly in the component
  const styles = {
    mainContainer: {
      padding: "40px 20px",
      maxWidth: "1200px",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "2rem",
      textAlign: "center",
      opacity: animate ? 1 : 0,
      transform: animate ? "translateY(0)" : "translateY(-20px)",
      transition: "all 0.6s ease-out",
    },
    toggleContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "2rem",
      gap: "10px",
      opacity: animate ? 1 : 0,
      transform: animate ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.6s ease-out",
      transitionDelay: "0.2s",
    },
    toggleLabel: {
      margin: "0",
      fontSize: "0.9rem",
      color: "#666",
    },
    saveText: {
      color: "#8B5CF6",
      fontWeight: "500",
    },
    pricingCard: (isPro) => ({
      borderRadius: "12px",
      border: "1px solid #eee",
      padding: "24px",
      height: "100%",
      boxShadow: isPro ? "0 10px 25px rgba(0, 0, 0, 0.1)" : "none",
      transform: animate ? "translateY(0)" : "translateY(30px)",
      opacity: animate ? 1 : 0,
      transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      transitionDelay: isPro ? "0.4s" : isPro === false ? "0.3s" : "0.5s",
      position: "relative",
      zIndex: isPro ? 2 : 1,
    }),
    pricingHeader: {
      marginBottom: "20px",
    },
    pricingTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#0E606E",
    },
    price: {
      fontSize: "1.8rem",
      fontWeight: "700",
      marginBottom: "5px",
      display: "flex",
      alignItems: "baseline",
    },
    pricePeriod: {
      fontSize: "0.9rem",
      color: "#666",
      fontWeight: "normal",
      marginLeft: "5px",
    },
    description: {
      fontSize: "0.9rem",
      color: "#666",
      marginBottom: "20px",
    },
    featureList: {
      listStyle: "none",
      padding: "0",
      marginBottom: "30px",
    },
    featureItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "12px",
      fontSize: "0.95rem",
    },
    checkIcon: {
      color: "#8B5CF6",
      marginRight: "10px",
      flexShrink: 0,
    },
    buttonFree: {
      width: "100%",
      padding: "10px",
      borderColor: "#8B5CF6",
      color: "#8B5CF6",
      backgroundColor: "transparent",
      transition: "all 0.3s ease",
      borderRadius: "6px",
    },
    buttonPro: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#8B5CF6",
      borderColor: "#8B5CF6",
      transition: "all 0.3s ease",
      borderRadius: "6px",
    },
    buttonEnterprise: {
      width: "100%",
      padding: "10px",
      borderColor: "#8B5CF6",
      color: "#8B5CF6",
      backgroundColor: "transparent",
      transition: "all 0.3s ease",
      borderRadius: "6px",
    },
    customText: {
      display: "block",
      fontSize: "0.8rem",
    },
    toggle: {
      position: "relative",
      display: "inline-block",
      width: "60px",
      height: "30px",
      backgroundColor: "#8B5CF6",
      borderRadius: "30px",
      cursor: "pointer",
    },
    toggleInput: {
      opacity: 0,
      width: 0,
      height: 0,
    },
    toggleSlider: {
      position: "absolute",
      top: "3px",
      left: isYearly ? "33px" : "3px",
      width: "24px",
      height: "24px",
      borderRadius: "50%",
      background: "white",
      transition: "0.3s",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    },
  };

  // Feature lists for each plan
  const freeFeatures = [
    "Amazing feature one",
    "Wonderful feature two",
    "Priceless feature three",
    "Splended feature four",
  ];

  const proFeatures = [
    "Everything in the Free plan, plus",
    "Post event limited in month",
    "Wonderful feature two",
    "Priceless feature three",
    "Splended feature four",
    "Delightful feature five",
  ];

  const enterpriseFeatures = [
    "Everything in the Pro plan, plus",
    "Amazing feature one",
    "Wonderful feature two",
    "Priceless feature three",
    "Splended feature four",
    "Delightful feature five",
  ];

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          
          .pro-card {
            transition: all 0.3s ease;
          }
          
          .pro-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15) !important;
          }
          
          .btn-hover:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px #5DB996
          }
          
          .btn-primary:hover {
            background-color: #5DB996 !important;
            border-color: #5DB996 !important;
          }
          
          .btn-outline-primary:hover {
            background-color: #5DB996;
            color: #5DB996!important;
          }
          
          .feature-item {
            transition: all 0.3s ease;
          }
          
          .feature-item:hover {
            transform: translateX(5px);
          }
          
          .highlight-plan {
            animation: pulse 2s infinite;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .feature-animation {
            opacity: 0;
            animation: fadeIn 0.5s forwards;
          }
        `}
      </style>
      {/* <CustomNavbar /> */}
      <Container
        style={styles.mainContainer}
        className="d-flex align-items-center justify-content-center min-vh-100"
      >
        <div className="w-100">
          <h1 style={styles.heading}>Our Pricing</h1>

          <div style={styles.toggleContainer}>
            <p style={styles.toggleLabel}>Billed Monthly</p>
            <div
              style={styles.toggle}
              onClick={() => setIsYearly(!isYearly)}
              className="position-relative"
            >
              <input
                type="checkbox"
                checked={isYearly}
                onChange={() => setIsYearly(!isYearly)}
                style={styles.toggleInput}
              />
              <span style={styles.toggleSlider}></span>
            </div>
            <p style={styles.toggleLabel}>
              Billed Yearly <span style={styles.saveText}>(save 15%)</span>
            </p>
          </div>

          <Row className="g-4">
            {/* Free Plan */}
            <Col md={4}>
              <Card
                style={styles.pricingCard(false)}
                className="border-0 shadow-sm"
              >
                <Card.Body className="d-flex flex-column">
                  <div style={styles.pricingHeader}>
                    <h2 style={styles.pricingTitle}>Free</h2>
                    <div style={styles.price}>$0</div>
                    <p style={styles.description}>
                      Description of the tier list will go here, copy should be
                      concise and impactful.
                    </p>
                  </div>

                  <ul style={styles.featureList}>
                    {freeFeatures.map((feature, index) => (
                      <li
                        key={index}
                        className="feature-item feature-animation"
                        style={{
                          ...styles.featureItem,
                          animationDelay: `${0.3 + index * 0.1}s`,
                        }}
                      >
                        <Check size={18} style={styles.checkIcon} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Button
                      variant="outline-primary"
                      style={styles.buttonFree}
                      className="btn-hover"
                    >
                      Try for Free
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Pro Plan */}
            <Col md={4}>
              <Card
                style={styles.pricingCard(true)}
                className="border-0 shadow pro-card highlight-plan"
              >
                <Card.Body className="d-flex flex-column">
                  <div style={styles.pricingHeader}>
                    <h2 style={styles.pricingTitle}>Pro</h2>
                    <div style={styles.price}>
                      ${isYearly ? "10" : "12"}
                      <span style={styles.pricePeriod}>/month</span>
                    </div>
                    <p style={styles.description}>
                      Description of the tier list will go here, copy should be
                      concise and impactful.
                    </p>
                  </div>

                  <ul style={styles.featureList}>
                    {proFeatures.map((feature, index) => (
                      <li
                        key={index}
                        style={{
                          ...styles.featureItem,
                          animationDelay: `${0.4 + index * 0.1}s`,
                        }}
                        className="feature-item feature-animation"
                      >
                        <Check size={18} style={styles.checkIcon} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Button
                      variant="primary"
                      style={styles.buttonPro}
                      className="btn-hover"
                    >
                      Upgrade Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Enterprise Plan */}
            <Col md={4}>
              <Card style={styles.pricingCard()} className="border-0 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div style={styles.pricingHeader}>
                    <h2 style={styles.pricingTitle}>Enterprise</h2>
                    <div style={styles.price}>
                      Custom
                      <span style={styles.pricePeriod}>
                        <span style={styles.customText}>
                          yearly billing only
                        </span>
                      </span>
                    </div>
                    <p style={styles.description}>
                      Description of the tier list will go here, copy should be
                      concise and impactful.
                    </p>
                  </div>

                  <ul style={styles.featureList}>
                    {enterpriseFeatures.map((feature, index) => (
                      <li
                        key={index}
                        style={{
                          ...styles.featureItem,
                          animationDelay: `${0.5 + index * 0.1}s`,
                        }}
                        className="feature-item feature-animation"
                      >
                        <Check size={18} style={styles.checkIcon} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Button
                      variant="outline-primary"
                      style={styles.buttonEnterprise}
                      className="btn-hover"
                    >
                      Contact Sales
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default UpgradePro;
