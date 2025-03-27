import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Tình Nguyện',
      icon: '01',
      description: 'Cung cấp các cơ hội tình nguyện dựa trên kỹ năng và nhu cầu. Chỉ cần đóng góp khi bạn có thể.',
      iconColor: '#ff7a59',
    },
    {
      id: 2,
      title: 'Hỗ Trợ',
      icon: '02',
      description: 'Một chuyên gia trò chuyện trực tiếp với người cần hỗ trợ về một vấn đề cụ thể.',
      iconColor: '#ff7a59',
    },
    {
      id: 3,
      title: 'Nghiên Cứu',
      icon: '03',
      description: 'Một phần thiết yếu cho các thách thức xã hội mà cộng đồng đang đối mặt. Quyết định dựa trên bằng chứng là đáng giá.',
      iconColor: '#ff7a59',
    },
  ];

  return (
    <Container className="py-5">
      <Row>
        {services.map((service) => (
          <Col md={4} key={service.id} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    background: service.iconColor,
                    color: 'white'
                  }}
                >
                  <span className="fw-bold">{service.icon}</span>
                </div>
                
                <h4 className="mb-3">{service.title}</h4>
                <p className="text-muted">{service.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;