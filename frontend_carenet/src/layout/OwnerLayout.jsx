"use client"

import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import AdminNavbar from "../components/navbar/AdminNavbar"
import AdminSidebar from "../components/sidebar/AdminSidebar"
import OwnerSidebar from "../components/sidebar/OwnerSidebar"
import OwnerNavbar from "../components/navbar/OwnerNavbar"

const OwnerLayout = () => {
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
      <OwnerNavbar toggleSidebar={toggleSidebar} />

      {/* Main Content with Sidebar */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <OwnerSidebar showSidebar={showSidebar} isMobile={isMobile} />

        {/* Main Content */}
        <main className="main-content">
          <Container fluid className="p-4">
            <Outlet />
          </Container>
        </main>
      </div>


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

export default OwnerLayout

