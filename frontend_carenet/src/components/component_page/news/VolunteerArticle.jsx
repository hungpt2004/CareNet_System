import React from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { ArrowRight } from 'lucide-react';
import styles from '../../../css/VolunteerArticle.module.css';

const { Title, Paragraph } = Typography;

const articles = [
  {
    id: 1,
    title: 'Lợi Ích Của Hoạt Động Tình Nguyện',
    image: '/volunteer_img/new1.jpg',
    summary:
      'Khám phá cách hoạt động tình nguyện không chỉ thay đổi cộng đồng mà còn thay đổi chính bản thân người tham gia.',
  },
  {
    id: 2,
    title: '5 Kỹ Năng Bạn Học Được Từ Tình Nguyện',
    image: '/volunteer_img/new2.jpg',
    summary:
      'Tìm hiểu cách tình nguyện giúp bạn phát triển những kỹ năng quý giá cho sự nghiệp và cuộc sống.',
  },
  {
    id: 3,
    title: 'Những Câu Chuyện Truyền Cảm Hứng Về Tình Nguyện',
    image: '/volunteer_img/new3.jpg',
    summary:
      'Đọc những câu chuyện đầy cảm hứng từ những người đã tạo ra sự khác biệt thông qua hoạt động tình nguyện.',
  },
];

function VolunteerArticles() {
  return (
    <section className={styles.sectionContainer} id="articles">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        <Row gutter={[24, 24]}>
          {articles.map((article) => (
            <Col key={article.id} xs={24} sm={12} lg={8}>
              <Card
                className={styles.card}
                cover={
                  <div className={styles.cardCover}>
                    <img
                      alt={article.title}
                      src={article.image || '/placeholder.svg'}
                    />
                  </div>
                }
                bordered={false}
              >
                <div className={styles.cardBody}>
                  <Title level={4} className={styles.cardTitle}>
                    {article.title}
                  </Title>
                  <Paragraph className={styles.cardSummary}>
                    {article.summary}
                  </Paragraph>
                  <button className={styles.readMoreButton}>
                    Xem Thêm
                    <ArrowRight className={styles.lucideIcon} size={16} />
                  </button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default VolunteerArticles;