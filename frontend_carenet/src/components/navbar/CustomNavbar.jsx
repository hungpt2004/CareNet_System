import React, { useState, useEffect } from "react";
import { Button, Col, Container, Nav, Navbar, Row, Image} from "react-bootstrap";
import styles from '../../css/AppColors.module.css'
import { useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      className="py-3 position-fixed w-100 shadow"
      style={{
        zIndex: 1050,
        top: 0,
        left: 0,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)"
      }}
    >
      <Container fluid>
        <Navbar.Brand href="/" className="fw-bold">
          <Row>
            <Col><Image
              src="/volunteer_img/Carenet.png"
              alt="User"
              className="rounded-circle me-2"
              width="60"
              height="60"
            /></Col>
            <Col><h1 style={{ letterSpacing: '10px' }} className={`fw-bold ${styles.textPrimary}`}>CARENET</h1></Col>
          </Row>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="hover-underline">Trang chủ</Nav.Link>
            <Nav.Link href="#features" className="hover-underline">Thành tựu</Nav.Link>
            <Nav.Link href="#how-it-works" className="hover-underline">Vận hành</Nav.Link>
            <Nav.Link href="#testimonials" className="hover-underline">Chia sẻ</Nav.Link>
            <Nav.Link href="#contact" className="hover-underline">Liên hệ</Nav.Link>
          </Nav>
          <Button style={{ backgroundColor: '#5DB996', borderColor: '#5DB996' }} className="ms-2" onClick={() => navigate('/login')}>
            Đăng nhập
          </Button>
          <Button style={{ backgroundColor: '#FBF6E9', borderColor: 'grey' }} className="ms-2 text-dark"  onClick={() => navigate('/login')}>
            Đăng Kí
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
