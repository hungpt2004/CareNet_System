import React, { useState, useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

const CustomNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        backdropFilter: "blur(10px)",
      }}
    >
      <Container fluid>
        <Navbar.Brand href="#home" className="fw-bold">
          VolunteerTech
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="hover-underline">
              Home
            </Nav.Link>
            <Nav.Link href="#features" className="hover-underline">
              Features
            </Nav.Link>
            <Nav.Link href="#how-it-works" className="hover-underline">
              How It Works
            </Nav.Link>
            <Nav.Link href="#testimonials" className="hover-underline">
              Testimonials
            </Nav.Link>
            <Nav.Link href="#contact" className="hover-underline">
              Contact
            </Nav.Link>
          </Nav>
          <Button variant="outline-primary" className="ms-2">
            Sign In
          </Button>
          <Button variant="primary" className="ms-2">
            Register
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
