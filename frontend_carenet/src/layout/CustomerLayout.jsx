import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Footer } from "../components/footer/Footer";
import CustomNavbarLogged from "../components/navbar/CustomNavbarLogged";
import useAuthStore from "../hooks/authStore";
import Breadcrumbs from "./Breadcrumb";

const CustomerLayout = () => {
  const { currentUser } = useAuthStore();

  return (
    <div className="d-flex flex-column min-vh-100">
      <CustomNavbarLogged />

      {/* Spacer để tránh bị che bởi navbar fixed */}
      <div style={{ height: '50px' }} /> {/* Đúng bằng chiều cao navbar */}

      <main className="flex-grow-1">
        <Container fluid>
          <div className="p-5 mt-5">
            <Breadcrumbs />
            <Outlet />
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerLayout;
