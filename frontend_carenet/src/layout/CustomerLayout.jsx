import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Footer } from "../components/footer/Footer";
import CustomNavbarLogged from "../components/navbar/CustomNavbarLogged";
import CustomNavbar from "../components/navbar/CustomNavbar";
import useAuthStore from "../hooks/authStore";

const CustomerLayout = () => {
  // Kiểm tra xem người dùng có đăng nhập không
  const { currentUser } = useAuthStore();

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar: Sử dụng CustomNavbarLogged nếu người dùng đã đăng nhập, ngược lại sử dụng CustomNavbar */}
      <CustomNavbarLogged />

      {/* Main Content with padding for fixed navbar */}
      <main className="flex-grow-1" style={{ paddingTop: '100px' }}>
        <Container fluid>
          <Outlet />
        </Container>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CustomerLayout;
