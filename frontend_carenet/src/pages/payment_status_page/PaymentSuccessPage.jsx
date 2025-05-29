import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../../css/PaymentSuccess.module.css';

function PaymentSuccessPage() {
  // For demonstration, we'll simulate a transaction ID
  const transactionId = 'TXN' + Math.floor(Math.random() * 10000000);
  const amount = '$' + (Math.random() * 1000).toFixed(2);
  
  useEffect(() => {
    // Simulating confetti effect on success page load
    const confettiElements = [];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = styles.confetti;
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      document.getElementById('confetti-container').appendChild(confetti);
      confettiElements.push(confetti);
    }
    
    return () => {
      // Cleanup confetti elements
      confettiElements.forEach(element => element.remove());
    };
  }, []);

  return (
    <>
      <div id="confetti-container" className={styles.confettiContainer}></div>
      <Container className={styles.successContainer}>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className={styles.successCard}>
              <div className={styles.checkmarkContainer}>
                <div className={styles.checkmark}>✓</div>
              </div>
              
              <Card.Body className="text-center">
                <Card.Title as="h1" className={styles.successTitle}>
                  Payment Successful!
                </Card.Title>
                
                <div className={styles.successMessage}>
                  Your transaction has been completed successfully.
                  Thank you for your payment.
                </div>
                
                <div className={styles.transactionDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Transaction ID:</span>
                    <span className={styles.detailValue}>{transactionId}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Amount Paid:</span>
                    <span className={styles.detailValue}>{amount}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Date:</span>
                    <span className={styles.detailValue}>
                      {new Date().toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className={styles.actionsContainer}>
                  <Button variant="primary" className={styles.actionButton}>
                    View Receipt
                  </Button>
                  <Button variant="outline-primary" as={Link} to="/" className={styles.actionButton}>
                    Back to Home
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PaymentSuccessPage;