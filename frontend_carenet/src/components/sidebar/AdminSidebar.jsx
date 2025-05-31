import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { 
  Home, Users, BookOpen, Calendar, BarChart2, Award, 
  MessageSquare, DollarSign, Layers, Settings, ChevronDown, 
  ChevronRight, Crown, Building2, LogOut, Shield 
} from 'lucide-react';
import useAuthStore from "../../hooks/authStore";
import styles from '../../css/AdminSidebar.module.css';

const AdminSidebar = ({ showSidebar, isMobile }) => {
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
      title: "Tổng Quan",
      icon: <Home size={20} />,
      path: "/dashboard",
    },
    {
      id: "requests",
      title: "Duyệt Yêu Cầu",
      icon: <Users size={20} />,
      submenu: [
        { title: "Duyệt tạo tổ chức", path: "/request-organization" },
        { title: "Duyệt tạo sự kiện", path: "/request-event" },
      ],
    },
    {
      id: "organizations",
      title: "Quản Lý Tổ Chức",
      icon: <Building2 size={20} />,
      submenu: [
        { title: "Danh sách tổ chức", path: "/admin-organization" },
        { title: "Quản lý bài đăng", path: "/admin-post" },
        { title: "Hoàn tiền tổ chức", path: "/organization-refund" },
      ],
    },
    {
      id: "users",
      title: "Quản Lý Người Dùng",
      icon: <Users size={20} />,
      submenu: [
        { title: "Tất cả người dùng", path: "/admin-users" },
        { title: "Người dùng bị khóa", path: "/admin-blocked-users" },
      ],
    },
    {
      id: "system",
      title: "Hệ Thống",
      icon: <Settings size={20} />,
      submenu: [
        { title: "Cài đặt hệ thống", path: "/admin-settings" },
        { title: "Logs hệ thống", path: "/admin-logs" },
      ],
    },
    {
      id: "analytics",
      title: "Thống Kê",
      icon: <BarChart2 size={20} />,
      submenu: [
        { title: "Báo cáo tổng quan", path: "/admin-analytics" },
        { title: "Thống kê hoạt động", path: "/admin-activity-stats" },
      ],
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
      <div className={`${styles.adminSidebar} ${showSidebar ? styles.show : ''} ${isMobile ? styles.mobile : ''}`}>
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
              src={currentUser?.avatar || "https://i.pinimg.com/736x/13/c2/9e/13c29eee725ec2125487ddf0cf119c3c.jpg"} 
              alt="Avatar" 
            />
          </div>
          <div className={styles.userDetails}>
            <h4 className={styles.userName}>{currentUser?.fullname || "CareNet Admin"}</h4>
            <p className={styles.userRole}>
              <Shield size={14} />
              Quản trị hệ thống
            </p>
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

export default AdminSidebar;