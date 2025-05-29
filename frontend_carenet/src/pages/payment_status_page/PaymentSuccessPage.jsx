import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import styles from '../../css/PaymentSuccess.module.css';
import axiosInstance from '../../utils/AxiosInstance';
import { CustomFailedToast, CustomSuccessToast } from '../../components/toast/CustomToast';
import { formatDateVN } from '../../utils/FormatDateVN';
import { formatCurrencyVND } from '../../utils/FormatPriceVN';

function PaymentSuccessPage() {

  const [certificatePurchase, setCertificatePurchase] = useState(null);
  const [certificate, setCertificate] = useState(null);

  const { certificateId } = useParams();
  
  const changeSuccessPayment = async () => {
  
    try {
      const response = await axiosInstance.post('/payment/success-payment', {
        certificateId: certificateId
      });

      if(response.data.status === 'success' && response.data.certificatePurchase && response.data.certificate){
        CustomSuccessToast('Thanh toán thành công');
        setCertificatePurchase(response.data.certificatePurchase);
        setCertificate(response.data.certificate);
      } else {
        CustomFailedToast('Thanh toán thất bại');
      }

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    changeSuccessPayment();
  }, []);

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
                    <span className={styles.detailLabel}>Mã chứng chỉ:</span>
                    <span className={styles.detailValue}>{certificateId}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Giá tiền:</span>
                    <span className={styles.detailValue}>{formatCurrencyVND(30000)}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Ngày trả:</span>
                    <span className={styles.detailValue}>
                      {formatDateVN(Date.now())}
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