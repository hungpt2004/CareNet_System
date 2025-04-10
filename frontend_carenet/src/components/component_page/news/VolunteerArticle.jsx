import React from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import '../../../css/LandingPage.css'

const articles = [
  {
    id: 1,
    title: 'Lợi Ích Của Hoạt Động Tình Nguyện',
    image: '/volunteer_img/new1.jpg',
    summary: 'Khám phá cách hoạt động tình nguyện không chỉ thay đổi cộng đồng mà còn thay đổi chính bản thân người tham gia.',
  },
  {
    id: 2,
    title: '5 Kỹ Năng Bạn Học Được Từ Tình Nguyện',
    image: '/volunteer_img/new2.jpg',
    summary: 'Tìm hiểu cách tình nguyện giúp bạn phát triển những kỹ năng quý giá cho sự nghiệp và cuộc sống.',
  },
  {
    id: 3,
    title: 'Những Câu Chuyện Truyền Cảm Hứng Về Tình Nguyện',
    image: '/volunteer_img/new3.jpg',
    summary: 'Đọc những câu chuyện đầy cảm hứng từ những người đã tạo ra sự khác biệt thông qua hoạt động tình nguyện.',
  },
];

function VolunteerArticles() {
  return (
    <section className="py-5" id="articles" style={{ backgroundColor: '#f8f9fa' }}>
      <Container>
        <Row className="g-4">
          {articles.map((article) => (
            <Col key={article.id} md={6} lg={4}>
              <Card className="h-100 shadow rounded-4 border-0">
                <Card.Img
                  variant="top"
                  src={article.image}
                  alt={article.title}
                  className="rounded-top-4"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold mb-2">{article.title}</Card.Title>
                  <Card.Text className="text-muted flex-grow-1">{article.summary}</Card.Text>
                  <Button className="button mt-3 align-self-start">Xem Thêm</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default VolunteerArticles;
