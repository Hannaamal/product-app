import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    window.scrollTo({ top: -20, behavior: "smooth" });
    setTimeout(() => navigate(path), 300); // Delay to allow smooth scroll
  };
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2>YourStore</h2>
          <p>
            Bringing fresh groceries and essentials right to your doorstep.
            Fast, easy, and reliable delivery service.
          </p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              {" "}
              <NavLink
                to="/"
                onClick={() => handleNavigation("/")}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink
                to="/add-product"
                onClick={() => handleNavigation("/add-product")}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Add Product
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink
                to="/Login"
                onClick={() => handleNavigation("/Login")}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Login
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink
                to="/Cart"
                onClick={() => handleNavigation("/Cart")}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Cart
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact</h3>
          <p>
            Email:{" "}
            <a href="mailto:support@yourstore.com" className="email-link">
              support@yourstore.com
            </a>
          </p>

          <p>
            Phone:{" "}
            <a href="tel:+919876543210" className="phone-link">
              +91 98765 43210
            </a>
          </p>
          <p>
            Address:{" "}
            <a
              href="https://www.google.com/maps?q=culicut,+Kerala"
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              calicut, Kerala
            </a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 YourStore. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
