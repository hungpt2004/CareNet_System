"use client"

import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import AdminNavbar from "../components/navbar/AdminNavbar"
import AdminSidebar from "../components/sidebar/AdminSidebar"

const AdminLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check if screen is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992)
      if (window.innerWidth < 992) {
        setShowSidebar(false)
      } else {
        setShowSidebar(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Toggle sidebar
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navbar */}
      <AdminNavbar toggleSidebar={toggleSidebar} />

      {/* Main Content with Sidebar */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <AdminSidebar showSidebar={showSidebar} isMobile={isMobile} />

        {/* Main Content */}
        <main className="main-content">
          <Container fluid className="p-4">
            <Outlet />
          </Container>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-top py-3">
        <Container fluid className="px-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="mb-0 text-muted">&copy; 2025 EduAdmin. All rights reserved.</p>
            </div>
            <div>
              <small className="text-muted">Version 1.0.0</small>
            </div>
          </div>
        </Container>
      </footer>

      {/* Custom CSS */}
      <style>{`
        .main-content {
          margin-left: 260px;
          margin-top: 60px;
          min-height: calc(100vh - 60px - 56px); /* Subtract navbar and footer height */
          width: calc(100% - 260px);
          transition: all 0.3s;
          flex: 1;
        }
        
        @media (max-width: 991.98px) {
          .main-content {
            margin-left: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default AdminLayout

