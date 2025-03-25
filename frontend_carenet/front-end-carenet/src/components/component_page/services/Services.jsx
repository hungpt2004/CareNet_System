import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Volunteer',
      icon: '01',
      description: 'Provides skill-based, on-demand volunteer opportunities. Only give what you can, when you can.',
      iconColor: '#ff7a59',
    },
    {
      id: 2,
      title: 'Support',
      icon: '02',
      description: 'In which an expert has a one-to-one conversation with someone seeking help on a specific problem.',
      iconColor: '#ff7a59',
    },
    {
      id: 3,
      title: 'Research',
      icon: '03',
      description: 'An essential component for social challenges facing communities. Evidence-based decisions are worth making.',
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