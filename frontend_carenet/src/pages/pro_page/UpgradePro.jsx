import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Check, Crown } from "lucide-react";
import styles from '../../css/UpgradeProPage.module.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { handleUpgradeServiceForOrganization } from "../../services/payment-service/organization.payment";
import OrganizationService from "../../services/organization-service/organization.service";

const _orgService = new OrganizationService();

const UpgradePro = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [currentOrganization, setCurrentOrganization] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const [isBasic, setIsBasic] = useState(false);

  // Feature lists for each plan
  const freeFeatures = [
    "Đăng tuyển cơ bản 1 bài",
    "Quản lý nhân sự của tổ chức",
    "Xem hồ sơ ứng viên giới hạn",
    "Thống kê cơ bản"
  ];

  const proFeatures = [
    "Tất cả tính năng của gói Free",
    "Đăng tuyển không giới hạn",
    "Tìm kiếm ứng viên nâng cao",
    "Gửi email hàng loạt cho ứng viên",
    "Ưu tiên duyệt sự kiện",
    "Báo cáo và thống kê chi tiết"
  ];

  const enterpriseFeatures = [
    "Tất cả tính năng của gói Pro",
    "Tùy chỉnh thương hiệu",
    "Quản lý đa chi nhánh",
    "API tích hợp hệ thống",
    "Hỗ trợ 24/7",
    "Giải pháp tùy chỉnh theo yêu cầu"
  ];

  const handleUpgrade = async () => {
    try {
      const { checkoutUrl } = await handleUpgradeServiceForOrganization();
      if (checkoutUrl) {
        window.location.href = checkoutUrl; // Redirect to payment page
      }
    } catch (error) {
      console.error("Error upgrading:", error);
    }
  };

  const fetchCurrentOrganization = async () => {
    const { data } = await _orgService.fetchCurrentOrganization();
    if (data) {
      setCurrentOrganization(data);
    }
  };

  useEffect(() => {
    fetchCurrentOrganization();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (currentOrganization?.levelId.name === 'Pro') {
      setIsPro(true);
      setIsBasic(false);
    } else if (currentOrganization?.levelId.name === 'basic') {  
      setIsBasic(true);
      setIsPro(false);
    } else {
      setIsPro(false);
      setIsBasic(false);
    }
  }, [currentOrganization]);

  return (
    <Container className={styles.mainContainer}>
      <div className="w-100">
        <h1 className={`${styles.heading} ${animate ? styles.headingVisible : ''}`}>
          Bảng Giá Dịch Vụ
        </h1>

        

        <Row className="g-4">
          {/* Free Plan */}
          <Col md={4}>
            <Card className={`
              ${styles.pricingCard} 
              ${styles.pricingCardFree}
              ${animate ? styles.pricingCardVisible : ''}
              border-0 shadow-sm
            `}>
              <Card.Body className="d-flex flex-column">
                <div className={styles.pricingHeader}>
                  <h2 className={styles.pricingTitle}>Miễn phí</h2>
                  <div className={styles.price}>0đ</div>
                  <p className={styles.description}>
                    Trải nghiệm các tính năng cơ bản để bắt đầu tuyển dụng
                  </p>
                </div>

                <ul className={styles.featureList}>
                  {freeFeatures.map((feature, index) => (
                    <li
                      key={index}
                      className={`${styles.featureItem} ${styles.featureAnimation}`}
                      style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                    >
                      <Check size={18} className={styles.checkIcon} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <button className={styles.buttonFree}>
                    {isBasic ? 'Đang sử dụng' : 'Dùng miễn phí'}
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Pro Plan */}
          <Col md={4}>
            <Card className={`
              ${styles.pricingCard} 
              ${styles.pricingCardPro}
              ${animate ? styles.pricingCardVisible : ''}
              ${styles.proCard}
              ${styles.highlightPlan}
              border-0 shadow
            `}>
              <div className={styles.popularBadge}>
                <Crown size={14} className="me-1" />
                Phổ biến
              </div>

              <Card.Body className="d-flex flex-column">
                <div className={styles.pricingHeader}>
                  <h2 className={styles.pricingTitle}>Pro</h2>
                  <div className={styles.price}>
                    {isYearly ? '424.150' : '499.000'}
                    <span className={styles.pricePeriod}>
                      /{isYearly ? 'tháng' : 'tháng'}
                    </span>
                  </div>
                  <p className={styles.description}>
                    Giải pháp toàn diện cho doanh nghiệp chuyên nghiệp
                  </p>
                </div>

                <ul className={styles.featureList}>
                  {proFeatures.map((feature, index) => (
                    <li
                      key={index}
                      className={`${styles.featureItem} ${styles.featureAnimation}`}
                      style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                    >
                      <Check size={18} className={styles.checkIcon} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <button
                    className={styles.buttonPro}
                    onClick={handleUpgrade}
                    disabled={isPro}
                    style={{ backgroundColor: isPro ? '#ccc' : '#007bff' }}
                  >
                    {isPro ? 'Đang sử dụng' : 'Nâng cấp ngay'}
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Enterprise Plan */}
          <Col md={4}>
            <Card className={`
              ${styles.pricingCard} 
              ${styles.pricingCardEnterprise}
              ${animate ? styles.pricingCardVisible : ''}
              border-0 shadow-sm
            `}>
              <Card.Body className="d-flex flex-column">
                <div className={styles.pricingHeader}>
                  <h2 className={styles.pricingTitle}>Doanh nghiệp</h2>
                  <div className={styles.price}>
                    Liên hệ
                    <span className={styles.pricePeriod}>
                      <span className={styles.customText}>
                        thanh toán theo năm
                      </span>
                    </span>
                  </div>
                  <p className={styles.description}>
                    Giải pháp tùy chỉnh cho doanh nghiệp lớn
                  </p>
                </div>

                <ul className={styles.featureList}>
                  {enterpriseFeatures.map((feature, index) => (
                    <li
                      key={index}
                      className={`${styles.featureItem} ${styles.featureAnimation}`}
                      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    >
                      <Check size={18} className={styles.checkIcon} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <button className={styles.buttonEnterprise}>
                    Liên hệ bộ phận kinh doanh
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default UpgradePro;
