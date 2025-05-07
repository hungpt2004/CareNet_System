import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../../css/PaymentCancel.module.css';

function PaymentCancelPage() {
  return (
    <Container className={styles.cancelContainer}>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className={styles.cancelCard}>
            <div className={styles.iconContainer}>
              <div className={styles.cancelIcon}>✕</div>
            </div>
            
            <Card.Body className="text-center">
              <Card.Title as="h1" className={styles.cancelTitle}>
                Payment Cancelled
              </Card.Title>
              
              <div className={styles.cancelMessage}>
                <p>Your payment process has been cancelled.</p>
                <p>No charges were made to your account.</p>
              </div>
              
              <div className={styles.reasonContainer}>
                <h4>Common reasons for cancellation:</h4>
                <ul className={styles.reasonList}>
                  <li>Transaction was manually cancelled</li>
                  <li>Payment verification failed</li>
                  <li>Session timeout during payment</li>
                  <li>Technical issue with payment gateway</li>
                </ul>
              </div>
              
              <div className={styles.actionsContainer}>
                <Button variant="danger" as={Link} to="/payment/success" className={styles.actionButton}>
                  Try Again
                </Button>
                <Button variant="outline-secondary" as={Link} to="/" className={styles.actionButton}>
                  Back to Home
                </Button>
                <Button variant="outline-primary" className={styles.actionButton}>
                  Contact Support
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentCancelPage;