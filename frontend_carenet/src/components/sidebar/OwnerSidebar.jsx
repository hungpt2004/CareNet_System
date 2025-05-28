import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { 
  Home, Users, BookOpen, Calendar, BarChart2, Award, 
  MessageSquare, DollarSign, Layers, Settings, ChevronDown, 
  ChevronRight, Crown, Building2, LogOut 
} from 'lucide-react';
import useAuthStore from "../../hooks/authStore";
import styles from '../../css/OwnerSidebar.module.css';

const OwnerSidebar = ({ showSidebar, isMobile }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const { currentUser, logout } = useAuthStore();

  // Toggle submenu
  const toggleSubmenu = (menuId) => {
    setExpandedMenus({
      ...expandedMenus,
      [menuId]: !expandedMenus[menuId],
    });
  };

  // Main menu items
  const mainMenuItems = [
    {
      id: "dashboard",
      title: "Thống Kê",
      icon: <BarChart2 size={20} />,
      path: "/owner-dashboard",
    },
    {
      id: "users",
      title: "Tình Nguyện Viên",
      icon: <Users size={20} />,
      submenu: [
        { title: "Phê duyệt tham gia", path: "/owner-user" },
        { title: "Phê duyệt hủy tham gia", path: "/owner-pending" },
      ],
    },
    {
      id: "events",
      title: "Quản Lý Sự Kiện",
      icon: <Calendar size={20} />,
      submenu: [
        { title: "Tất cả sự kiện", path: "/owner-events" },
        { title: "Tạo sự kiện mới", path: "/owner-post" },
        { title: "Danh sách sự kiện", path: "/owner-finished-events" },
      ],
    },
    {
      id: "staff",
      title: "Quản Lý Thành Viên",
      icon: <Award size={20} />,
      path: "/owner-staff",
    },
    {
      id: "messages",
      title: "Tin Nhắn",
      icon: <MessageSquare size={20} />,
      path: "/owner-messages",
    },
  ];

  // Bottom menu items
  const bottomMenuItems = [
    {
      id: "upgrade",
      title: "Nâng Cấp Gói",
      icon: <Crown size={20} />,
      path: "/upgrade-pro",
      className: styles.upgradeButton
    },
  ];

  const renderMenuItem = (item) => {
    if (item.submenu) {
      return (
        <div key={item.id} className={styles.sidebarMenuItem}>
          <div
            className={`${styles.sidebarLink} ${styles.submenuToggle}`}
            onClick={() => toggleSubmenu(item.id)}
          >
            <div className={styles.sidebarLinkContent}>
              <span className={styles.sidebarIcon}>{item.icon}</span>
              <span className={styles.sidebarText}>{item.title}</span>
            </div>
            <span className={styles.submenuArrow}>
              {expandedMenus[item.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          </div>
          <div className={`${styles.sidebarSubmenu} ${expandedMenus[item.id] ? styles.expanded : ''}`}>
            {item.submenu.map((subItem, index) => (
              <NavLink
                key={index}
                to={subItem.path}
                className={({ isActive }) => 
                  `${styles.sidebarSubmenuLink} ${isActive ? styles.active : ''}`
                }
              >
                <span className={styles.submenuText}>{subItem.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
      );
    }

    return (
      <NavLink
        key={item.id}
        to={item.path}
        className={({ isActive }) => 
          `${styles.sidebarLink} ${item.className || ''} ${isActive ? styles.active : ''}`
        }
      >
        <div className={styles.sidebarLinkContent}>
          <span className={styles.sidebarIcon}>{item.icon}</span>
          <span className={styles.sidebarText}>{item.title}</span>
        </div>
      </NavLink>
    );
  };

  return (
    <>
      <div className={`${styles.ownerSidebar} ${showSidebar ? styles.show : ''} ${isMobile ? styles.mobile : ''}`}>
        {/* Header */}
        <div className={styles.sidebarHeader}>
          <div className={styles.logoSection}>
            <div className={styles.logo}>
              <span className={styles.logoText}>CareNet</span>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className={styles.sidebarUserInfo}>
          <div className={styles.userAvatar}>
            <img 
              src={currentUser?.avatar || "https://i.pinimg.com/736x/8a/a9/c5/8aa9c5d8429f561000f1de8e7f6d5a32.jpg"} 
              alt="Avatar" 
            />
          </div>
          <div className={styles.userDetails}>
            <h4 className={styles.userName}>{currentUser?.fullname || "Admin"}</h4>
            <p className={styles.userRole}>Quản trị viên</p>
          </div>
        </div>

        {/* Main Navigation */}
        <div className={styles.sidebarContent}>
          <div className={styles.sidebarMainMenu}>
            <h6 className={styles.sidebarSectionTitle}>Menu Chính</h6>
            <Nav className={styles.sidebarNav}>
              {mainMenuItems.map(renderMenuItem)}
            </Nav>
          </div>

          {/* Bottom Section */}
          <div className={styles.sidebarBottomSection}>
            <h6 className={styles.sidebarSectionTitle}>Cài Đặt</h6>
            <Nav className={styles.sidebarNav}>
              {bottomMenuItems.map(renderMenuItem)}
            </Nav>
            
            {/* Logout Button */}
            <div className={styles.sidebarLogout}>
              <button 
                className={styles.logoutButton}
                onClick={logout}
              >
                <LogOut size={20} />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && showSidebar && (
        <div className={styles.sidebarOverlay}></div>
      )}
    </>
  );
};

export default OwnerSidebar;