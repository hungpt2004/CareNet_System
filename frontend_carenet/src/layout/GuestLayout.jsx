import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Footer } from "../components/footer/Footer";
import CustomNavbar from "../components/navbar/CustomNavbar";
import useAuthStore from "../hooks/authStore";
import CustomNavbarLogged from "../components/navbar/CustomNavbarLogged";
import Breadcrumbs from "./Breadcrumb";

const GuestLayout = () => {
  // Kiểm tra xem người dùng có đăng nhập không
  const {currentUser} = useAuthStore();

  return (
    <div className="d-flex flex-column min-vh-100">
      {currentUser ? <CustomNavbarLogged/> : <CustomNavbar />}

      {/* Main Content with padding for fixed navbar */}
      <main className="flex-grow-1" style={{ paddingTop: '100px' }}>
        <Container fluid>
          <div className="px-4">
            <Breadcrumbs />
            <Outlet />
          </div>
        </Container>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GuestLayout;
