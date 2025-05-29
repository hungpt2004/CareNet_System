import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import {
//   Home,
//   Users,
//   BookOpen,
//   Calendar,
//   BarChart2,
//   Award,
//   MessageSquare,
//   DollarSign,
//   Layers,
//   Settings,
//   ChevronDown,
//   ChevronRight,
// } from "lucide-react";

// Custom CSS variables for the color scheme
const customStyles = {
  primaryColor: "#5DB996",
  darkColor: "#2A3F54",
};

import { 
  Home, Users, BookOpen, Calendar, BarChart2, Award, 
  MessageSquare, DollarSign, Layers, Settings, ChevronDown, 
  ChevronRight, Crown, Building2, LogOut 
} from 'lucide-react';
import useAuthStore from "../../hooks/authStore";
// import styles from '../../css/OwnerSidebar.module.css';
import OrganizationService from "../../services/organization-service/organization.service";

const OwnerSidebar = ({ showSidebar, isMobile }) => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const { currentUser, logout } = useAuthStore();
  const [currentOrganization, setCurrentOrganization] = useState();

  console.log(`Organization ở SideBar: ${JSON.stringify(currentOrganization)}`);

  const _orgService = new OrganizationService();

  const fetchCurrentOrganization = async () => {
    const {data} = await _orgService.fetchCurrentOrganization();
    if (data) {
      setCurrentOrganization(data);
    }
  }

  useEffect(() => {
    fetchCurrentOrganization();
  }, []);

  // Toggle submenu
  const toggleSubmenu = (menuId) => {
    setExpandedMenus({
      ...expandedMenus,
      [menuId]: !expandedMenus[menuId],
    });
  };

  // Sidebar menu items
  const menuItems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <Home size={20} />,
      path: "/dashboard",
    },
    {
      id: "users",
      title: "Tình Nguyện Viên",
      icon: <Users size={20} />,
      submenu: [
        { title: "Danh sách TNV", path: "/admin-participant" },
        { title: "Điểm danh TNV", path: "/owner-attendance" },
        { title: "Phê duyệt TNV", path: "/owner-user" },
        { title: "Đánh giá TNV", path: "/owner-feedback" },
      ],
    },
    {
      id: "organizations",
      title: "Quản Lý Nội Bộ ",
      icon: <Award size={20} />,
      submenu: [
        { title: "Quản Lý Bài Viết", path: "/owner-post" },
        { title: "Quản Lý Thành Viên", path: "/owner-user" },
      ],
    },
  ];

  return (
    <>
      <div className={`sidebar ${showSidebar ? "expanded" : "collapsed"}`}>
        <div className="sidebar-content">
          <div className="sidebar-user p-3 border-bottom">
            <div className="d-flex align-items-center">
              <div className="avatar-container me-3">
                <img
                  src="https://i.pinimg.com/736x/8a/a9/c5/8aa9c5d8429f561000f1de8e7f6d5a32.jpg"
                  alt="Admin User"
                  className="rounded-circle"
                  width="50"
                  height="50"
                />
              </div>
              <div>
                <h6 className="mb-0 text-white">FPT University</h6>
                <small className="text-light">Organization</small>
              </div>
            </div>
          </div>

          <div className="sidebar-menu p-2">
            <Nav className="flex-column">
              {menuItems.map((item) => (
                <div key={item.id} className="nav-item-container">
                  {item.submenu ? (
                    <>
                      <div
                        className="d-flex align-items-center justify-content-between sidebar-link"
                        onClick={() => toggleSubmenu(item.id)}
                        style={{ cursor: "pointer", padding: "0.5rem 1rem" }}
                      >
                        <div className="d-flex align-items-center">
                          <span className="icon-container me-2">
                            {item.icon}
                          </span>
                          <span>{item.title}</span>
                        </div>
                        {expandedMenus[item.id] ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
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
            <p className={styles.userRole}>Thành viên gói {currentOrganization?.levelId?.name}</p>
          </div>
        </div>

                      <div
                        className={`submenu ${
                          expandedMenus[item.id] ? "show" : ""
                        }`}
                      >
                        {item.submenu.map((subitem, index) => (
                          <NavLink
                            key={index}
                            to={subitem.path}
                            className={({ isActive }) =>
                              `sidebar-sublink d-block ${
                                isActive ? "active" : ""
                              }`
                            }
                          >
                            {subitem.title}
                          </NavLink>
                        ))}
                      </div>
                    </>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `d-flex align-items-center sidebar-link ${
                          isActive ? "active" : ""
                        }`
                      }
                    >
                      <span className="icon-container me-2">{item.icon}</span>
                      <span>{item.title}</span>
                    </NavLink>
                  )}
                </div>
              ))}
            </Nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && showSidebar && <div className="sidebar-overlay"></div>}

      <style>{`
        .sidebar {
          position: fixed;
          top: 60px;
          left: 0;
          bottom: 0;
          width: 260px;
          background-color: ${customStyles.darkColor};
          color: #fff;
          transition: all 0.3s;
          overflow-y: auto;
          z-index: 1020;
        }
        
        .sidebar.collapsed {
          width: 0;
          overflow: hidden;
        }
        
        .sidebar-content {
          width: 260px;
        }
        
        .sidebar-link {
          color: rgba(255, 255, 255, 0.8) !important;
          padding: 0.6rem 1rem;
          border-radius: 5px;
          margin-bottom: 2px;
          text-decoration: none;
        }
        
        .sidebar-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #fff !important;
        }
        
        .sidebar-link.active {
          background-color: ${customStyles.primaryColor};
          color: #fff !important;
        }
        
        .sidebar-sublink {
          color: rgba(255, 255, 255, 0.7) !important;
          padding: 0.5rem 1rem 0.5rem 2.5rem;
          font-size: 0.9rem;
          text-decoration: none;
        }
        
        .sidebar-sublink:hover {
          color: #fff !important;
          background-color: rgba(255, 255, 255, 0.05);
        }
        
        .sidebar-sublink.active {
          color: #fff !important;
          background-color: rgba(93, 185, 150, 0.3);
        }
        
        .submenu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }
        
        .submenu.show {
          max-height: 500px;
        }
        
        .icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
        }
        
        .sidebar-overlay {
          position: fixed;
          top: 60px;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1010;
        }
        
        @media (max-width: 991.98px) {
          .sidebar.expanded {
            width: 260px;
          }
        }
      `}</style>
    </>
  );
};

export default OwnerSidebar;
