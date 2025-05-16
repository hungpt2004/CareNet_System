import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Nav, Navbar, Image, Row, Col, Badge } from "react-bootstrap";
import styles from '../../css/AppColors.module.css'
import useAuthStore from "../../hooks/authStore";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import io from 'socket.io-client';

const CustomNavbarLogged = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const socketRef = useRef(null);

  // Giả sử người dùng đã đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Get current user information
  const currentUser = useAuthStore((state) => state.currentUser);
  const {logout} = useAuthStore();

  useEffect(() => {
    // Kết nối Socket.IO
    socketRef.current = io('http://localhost:5000', {
      withCredentials: true
    });

    // Debug log khi kết nối thành công
    socketRef.current.on('connect', () => {
      console.log('Socket.IO connected successfully');
    });

    // Debug log khi có lỗi kết nối
    socketRef.current.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
    });

    // Join vào room của user
    if (currentUser?._id) {
      console.log('Joining user room:', currentUser._id);
      socketRef.current.emit('joinUserRoom', currentUser._id);
    }

    // Lắng nghe sự kiện requestApproved
    socketRef.current.on('requestApproved', (data) => {
      console.log('Received requestApproved event:', data);
      const newNotification = {
        id: Date.now(),
        message: data.message,
        time: 'Vừa xong',
        eventId: data.eventId,
        eventTitle: data.eventTitle,
        startAt: data.startAt,
        endAt: data.endAt,
        location: data.location
      };

      setNotifications(prev => [newNotification, ...prev]);
    });

    // Lắng nghe sự kiện requestRejected
    socketRef.current.on('requestRejected', (data) => {
      console.log('Received requestRejected event:', data);
      const newNotification = {
        id: Date.now(),
        message: data.message,
        time: 'Vừa xong',
        eventId: data.eventId,
        eventTitle: data.eventTitle,
        startAt: data.startAt,
        endAt: data.endAt,
        location: data.location
      };

      setNotifications(prev => [newNotification, ...prev]);
    });

    return () => {
      if (currentUser?._id) {
        console.log('Leaving user room:', currentUser._id);
        socketRef.current.emit('leaveUserRoom', currentUser._id);
      }
      socketRef.current.disconnect();
    };
  }, [currentUser?._id]);

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
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
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

  const toggleNotification = () => {
    setNotificationOpen(!notificationOpen);
  };

  const handleLogout = async () => {
    await logout();
    setTimeout(() => {
      navigate('/login');
    }, 0)
    setIsLoggedIn(false);
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
            <Nav.Link href="/" className="fw-bold hover-underline mx-3">TRANG CHỦ</Nav.Link>
            <Nav.Link href="#features" className="fw-bold hover-underline mx-3">THÀNH TỰU</Nav.Link>
            <Nav.Link href="#how-it-works" className="fw-bold hover-underline mx-3">VẬN HÀNH</Nav.Link>
            <Nav.Link href="#testimonials" className="fw-bold hover-underline mx-3">CHIA SẺ</Nav.Link>
            <Nav.Link href="#contact" className="fw-bold hover-underline mx-3">LIÊN HỆ</Nav.Link>
          </Nav>

          {isLoggedIn ? (
            <div className="d-flex align-items-center">
              {/* Notification Bell */}
              <div className="position-relative me-3 mx-3" ref={notificationRef}>
                <div
                  onClick={toggleNotification}
                  style={{ cursor: 'pointer' }}
                  className="d-flex align-items-center"
                >
                  <FaBell size={24} className='text-dark' />
                  {notifications.length > 0 && (
                    <Badge 
                      bg="danger" 
                      className="position-absolute top-0 start-100 translate-middle rounded-circle"
                      style={{ fontSize: '0.7rem', padding: '0.25rem 0.4rem' }}
                    >
                      {notifications.length}
                    </Badge>
                  )}
                </div>

                {notificationOpen && (
                  <div
                    className="position-absolute end-0 mt-2 py-2 bg-white rounded shadow"
                    style={{
                      width: '300px',
                      zIndex: 1051,
                      maxHeight: '400px',
                      overflowY: 'auto'
                    }}
                  >
                    <div className="px-3 py-2 border-bottom">
                      <h6 className="mb-0">Thông báo</h6>
                    </div>
                    {notifications.map((notification) => (
                      <div key={notification.id} className="px-3 py-2 border-bottom hover-bg-light">
                        <div className="d-flex justify-content-between align-items-start">
                          <p className="mb-1">{notification.message}</p>
                          <small className="text-muted">{notification.time}</small>
                        </div>
                      </div>
                    ))}
                    <div className="px-3 py-2 text-center">
                      <Button variant="link" className="text-decoration-none">Xem tất cả</Button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              <div className="position-relative" ref={dropdownRef}>
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