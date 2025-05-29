import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import StaffSidebar from "../components/sidebar/StaffSidebar";

const StaffLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const isMobile = window.innerWidth < 992;

  return (
    <div className="staff-layout">
      <header className="header">
        <div className="header-content">
          <div className="d-flex align-items-center">
            <button
              className="toggle-sidebar-btn"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <span className="menu-icon"></span>
            </button>
            <div className="header-title">CareNet Staff</div>
          </div>
        </div>
      </header>

      <StaffSidebar showSidebar={showSidebar} isMobile={isMobile} />

      <main className={`main-content ${showSidebar ? "with-sidebar" : ""}`}>
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>

      <style>{`
        .staff-layout {
          min-height: 100vh;
          background-color: #f0f2f5;
        }

        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          z-index: 1030;
        }

        .header-content {
          height: 100%;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-title {
          font-size: 20px;
          font-weight: bold;
          color: #1890ff;
          margin-left: 16px;
        }

        .toggle-sidebar-btn {
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
        }

        .menu-icon {
          display: block;
          width: 20px;
          height: 2px;
          background-color: #1890ff;
          position: relative;
        }

        .menu-icon:before,
        .menu-icon:after {
          content: '';
          position: absolute;
          width: 20px;
          height: 2px;
          background-color: #1890ff;
          left: 0;
        }

        .menu-icon:before {
          top: -6px;
        }

        .menu-icon:after {
          bottom: -6px;
        }

        .main-content {
          margin-left: 0;
          padding-top: 60px;
          transition: margin-left 0.3s;
        }

        .main-content.with-sidebar {
          margin-left: 260px;
        }

        .content-wrapper {
          padding: 24px;
        }

        @media (max-width: 991.98px) {
          .main-content.with-sidebar {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default StaffLayout;
