import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Heart, Menu, X } from 'lucide-react';
import "./Navbar.css";

const CustomNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <Heart className="me-2" size={24} />
          <span>VolunteerHub</span>
        </Link>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/opportunities" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                Opportunities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/news" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                News
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                Contact
              </NavLink>
            </li>
          </ul>
          <Link to="/signup" className="btn btn-primary ms-lg-3 rounded-pill px-4">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
