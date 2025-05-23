"use client"
import { Navbar, Container, Nav, Button, Badge, Dropdown, Image, Offcanvas } from "react-bootstrap"
import { Menu, Bell, User, ChevronDown, LogOut, Settings, DollarSign, FileText } from "lucide-react"
import useAuthStore from "../../hooks/authStore";
import io from 'socket.io-client';
import { useState, useEffect } from "react";
import { formatDateVN } from "../../utils/FormatDateVN";

// Custom CSS variables for the color scheme
const customStyles = {
  primaryColor: "#5DB996",
}

const OwnerNavbar = ({ toggleSidebar }) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const {logout} = useAuthStore();

  useEffect(() => {
    // Khởi tạo socket connection
    const socket = io(window.location.origin.replace('3000', '5000'), {
      withCredentials: true
    });

    // Join organization room khi component mount
    const organizationId = localStorage.getItem('organizationId');
    if (organizationId) {
      socket.emit('joinOrganizationRoom', organizationId);
    }

    // Lắng nghe sự kiện mua chứng chỉ
    socket.on('certificatePurchased', (data) => {
      const newNotification = {
        id: Date.now(),
        type: 'certificate_purchased',
        message: data.message,
        amount: data.amount,
        timestamp: data.timestamp,
        read: false
      };
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    });

    // Lắng nghe sự kiện cập nhật doanh thu
    socket.on('revenueUpdated', (data) => {
      const newNotification = {
        id: Date.now(),
        type: 'revenue_updated',
        message: 'Doanh thu đã được cập nhật',
        month: data.data.month,
        year: data.data.year,
        amount: data.data.totalRevenue,
        timestamp: data.timestamp,
        read: false
      };
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
    });

    return () => {
      if (organizationId) {
        socket.emit('leaveOrganizationRoom', organizationId);
      }
      socket.off('certificatePurchased');
      socket.off('revenueUpdated');
      socket.disconnect();
    };
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(true);
    // Đánh dấu tất cả thông báo là đã đọc
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'certificate_purchased':
        return <FileText size={16} className="me-2" />;
      case 'revenue_updated':
        return <DollarSign size={16} className="me-2" />;
      default:
        return <Bell size={16} className="me-2" />;
    }
  };

  const formatNotificationMessage = (notification) => {
    switch (notification.type) {
      case 'certificate_purchased':
        return `${notification.message} - ${notification.amount.toLocaleString()}đ`;
      case 'revenue_updated':
        return `${notification.message} tháng ${notification.month}/${notification.year} - ${notification.amount.toLocaleString()}đ`;
      default:
        return notification.message;
    }
  };

  return (
    <>
      <Navbar bg="white" expand="lg" className="top-navbar shadow-sm py-2" fixed="top">
        <Container fluid className="px-4">
          <div className="d-flex align-items-center">
            <Button variant="light" className="me-2 border-0" onClick={toggleSidebar}>
              <Menu size={20} />
            </Button>
            <Navbar.Brand href="/admin" className="d-flex align-items-center">
              <div className="logo-circle me-2">
                <span>CN</span>
              </div>
              <span className="fw-bold">CARENET</span>
            </Navbar.Brand>
          </div>

          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Item className="me-3">
              <Button 
                variant="light" 
                className="position-relative rounded-circle p-1 border-0"
                onClick={handleNotificationClick}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <Badge
                    bg="danger"
                    className="position-absolute top-0 end-0 rounded-circle"
                    style={{ fontSize: "0.6rem", padding: "0.2rem 0.4rem" }}
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </Nav.Item>

            <Dropdown align="end">
              <Dropdown.Toggle
                as="div"
                className="d-flex align-items-center cursor-pointer"
                style={{ cursor: "pointer" }}
              >
                <Image
                  src="https://i.pinimg.com/736x/8a/a9/c5/8aa9c5d8429f561000f1de8e7f6d5a32.jpg"
                  alt="User"
                  className="rounded-circle me-2"
                  width="40"
                  height="40"
                />
                <div className="d-none d-md-block">
                  <h6 className="mb-0">{currentUser?.fullname}</h6>
                  <small className="text-muted">{currentUser?.email}</small>
                </div>
                <ChevronDown size={16} className="ms-2" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-end shadow-sm border-0 mt-2">
                <Dropdown.Item href="#profile">
                  <User size={16} className="me-2" />
                  Thông tin cá nhân
                </Dropdown.Item>
                <Dropdown.Item href="#settings">
                  <Settings size={16} className="me-2" />
                  Cài đặt
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout}>
                  <LogOut size={16} className="me-2" />
                  Đăng xuất
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      {/* Notification Panel */}
      <Offcanvas
        show={showNotifications}
        onHide={() => setShowNotifications(false)}
        placement="end"
        title="Thông báo"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Thông báo</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {notifications.length === 0 ? (
            <div className="text-center text-muted py-4">
              Không có thông báo mới
            </div>
          ) : (
            <div className="notification-list">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`notification-item p-3 border-bottom ${!notification.read ? 'bg-light' : ''}`}
                >
                  <div className="d-flex align-items-center">
                    {getNotificationIcon(notification.type)}
                    <div>
                      <p className="mb-1">{formatNotificationMessage(notification)}</p>
                      <small className="text-muted">
                        {formatDateVN(notification.timestamp)}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      <style>{`
        .top-navbar {
          height: 60px;
          z-index: 1030;
        }
        
        .logo-circle {
          width: 36px;
          height: 36px;
          background: ${customStyles.primaryColor};
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
        }

        .notification-list {
          max-height: calc(100vh - 120px);
          overflow-y: auto;
        }

        .notification-item {
          transition: background-color 0.2s;
        }

        .notification-item:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </>
  )
}

export default OwnerNavbar

