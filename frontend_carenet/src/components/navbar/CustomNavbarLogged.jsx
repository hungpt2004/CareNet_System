import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Nav, Navbar, Image, Row, Col } from "react-bootstrap";
import styles from '../../css/AppColors.module.css'
import useAuthStore from "../../hooks/authStore";
import { useNavigate } from "react-router-dom";

const CustomNavbarLogged = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Giả sử người dùng đã đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Get current user information
  const currentUser = useAuthStore((state) => state.currentUser);

  console.log(currentUser._id)

  const {logout} = useAuthStore();

  // const [userInfo, setUserInfo] = useState({
  //   name: user?.fullname || "",  // default empty string if undefined
  //   email: user?.email || "",
  //   avatarUrl: user?.avatarUrl || "/default-avatar.png" // fallback to a default avatar URL if none exists
  // });
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Đóng dropdown khi click bên ngoài
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    await logout();
    setTimeout(() => {
      navigate('/login');
    }, 0)
    setIsLoggedIn(false);
  };

  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    console.log("User object from localStorage:");
    console.log(JSON.stringify(storedUser, null, 2));
  } else {
    console.log("No user data in localStorage.");
  }
  

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
        <Navbar.Brand href="#home" className="fw-bold">
          <Row>
            <Col><Image
              src="/volunteer_img/Carenet.png"
              alt="User"
              className="rounded-circle me-2"
              width="60"
              height="60"
            /></Col>
            <Col><h1 style={{ letterSpacing: '10px'}} className={`fw-bold ${styles.textPrimary}`}>CARENET</h1></Col>
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

          {isLoggedIn ? (
            <div className="ms-3 position-relative" ref={dropdownRef}>
              <div
                onClick={toggleDropdown}
                style={{
                  cursor: 'pointer',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #5DB996'
                }}
              >
                <Image
                  src={currentUser?.avatar}
                  width="100%"
                  height="100%"
                  style={{ objectFit: 'cover' }}
                  alt="Avatar"
                />
              </div>

              {dropdownOpen && (
                <div
                  className="position-absolute end-0 mt-2 py-2 bg-white rounded shadow"
                  style={{
                    width: '220px',
                    zIndex: 1051,
                  }}
                >
                  <div className="px-4 py-2 border-bottom">
                    <div className="fw-bold">{currentUser?.fullname}</div>
                    <div className="text-muted small">{currentUser?.email}</div>
                  </div>
                  <Nav className="flex-column">
                    <Nav.Link href="/profile-information" className="px-4 py-2">Thông tin cá nhân</Nav.Link>
                    <Nav.Link href="/support" className="px-4 py-2">CSKH</Nav.Link>
                    <Nav.Link href="/my-events" className="px-4 py-2">Quản Lý Ghi Danh</Nav.Link>
                    <Nav.Link href="/feedback-page" className="px-4 py-2">Quản Lý Đánh Giá</Nav.Link>
                    <Nav.Link href="/owner-post" className="px-4 py-2">Tài khoản Organization</Nav.Link>
                    <Nav.Link href="/dashboard" className="px-4 py-2">Tài khoản Admin</Nav.Link>
                    <Nav.Link onClick={handleLogout} className="px-4 py-2 text-danger">Đăng xuất</Nav.Link>
                  </Nav>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button style={{ backgroundColor: '#5DB996', borderColor: '#5DB996' }} className="ms-2">
                Đăng nhập
              </Button>
              <Button style={{ backgroundColor: '#FBF6E9', borderColor: 'grey' }} className="ms-2 text-dark">
                Đăng Kí
              </Button>
            </>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbarLogged;