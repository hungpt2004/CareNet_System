import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Button, Container, Nav, Navbar, Image } from "react-bootstrap";
import { Footer } from "../components/footer/Footer";
import CustomNavbarLogged from "../components/navbar/CustomNavbarLogged";

const CustomerLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <CustomNavbarLogged/>

      {/* Main Content with padding for fixed navbar */}
      <main className="flex-grow-1" style={{ paddingTop: '100px' }}>
        <Container fluid>
          <Outlet />
        </Container>
      </main>

      {/* Footer could be added here */}
      <Footer/>
    </div>
  );
};

export default CustomerLayout;