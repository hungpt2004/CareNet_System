"use client"
import { Navbar, Container, Nav, Button, Badge, Dropdown, Image } from "react-bootstrap"
import { Menu, Bell, User, ChevronDown, LogOut, Settings } from "lucide-react"

// Custom CSS variables for the color scheme
const customStyles = {
  primaryColor: "#5DB996",
}

const AdminNavbar = ({ toggleSidebar }) => {
  return (
    <Navbar bg="white" expand="lg" className="top-navbar shadow-sm py-2" fixed="top">
      <Container fluid className="px-4">
        <div className="d-flex align-items-center">
          <Button variant="light" className="me-2 border-0" onClick={toggleSidebar}>
            <Menu size={20} />
          </Button>
          <Navbar.Brand href="/admin" className="d-flex align-items-center">
            <div className="logo-circle me-2">
              <span>ED</span>
            </div>
            <span className="fw-bold">EduAdmin</span>
          </Navbar.Brand>
        </div>

        <Nav className="ms-auto d-flex align-items-center">
          <Nav.Item className="me-3">
            <Button variant="light" className="position-relative rounded-circle p-1 border-0">
              <Bell size={20} />
              <Badge
                bg="danger"
                className="position-absolute top-0 end-0 rounded-circle"
                style={{ fontSize: "0.6rem", padding: "0.2rem 0.4rem" }}
              >
                3
              </Badge>
            </Button>
          </Nav.Item>

          <Dropdown align="end">
            <Dropdown.Toggle
              as="div"
              className="d-flex align-items-center cursor-pointer"
              style={{ cursor: "pointer" }}
            >
              <Image
                src="https://via.placeholder.com/40"
                alt="User"
                className="rounded-circle me-2"
                width="40"
                height="40"
              />
              <div className="d-none d-md-block">
                <h6 className="mb-0">John Doe</h6>
                <small className="text-muted">Administrator</small>
              </div>
              <ChevronDown size={16} className="ms-2" />
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-end shadow-sm border-0 mt-2">
              <Dropdown.Item href="#profile">
                <User size={16} className="me-2" />
                My Profile
              </Dropdown.Item>
              <Dropdown.Item href="#settings">
                <Settings size={16} className="me-2" />
                Settings
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#logout">
                <LogOut size={16} className="me-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>

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
      `}</style>
    </Navbar>
  )
}

export default AdminNavbar

