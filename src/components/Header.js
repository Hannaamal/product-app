import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../context/AuthContext"; // ⬅ MUST import this

const Header = () => {
  const navigate = useNavigate();

  const { token, role, user, logout } = useAuth(); // ✔ Context values

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <h2 className="logo" onClick={() => navigate("/")}>
          YourStore
        </h2>

        <nav className="nav-links">

          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>

          {role === "admin" && (
            <NavLink
              to="/add-product"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Add Product
            </NavLink>
          )}

          {token && role === "customer" && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "active-link cart-icon" : "cart-icon"
              }
            >
              🛒
            </NavLink>
          )}

          {token ? (
            <>
              {user && (
                <div className="header-profile" onClick={() => navigate("/profile")}>
                  <img
                    src={
                      user.image
                        ? `${process.env.REACT_APP_BACKEND_URL}/${user.image}`
                        : "/default-avatar.png"
                    }
                    alt="Profile"
                    className="header-profile-img"
                  />
                  <span className="header-profile-name">{user.name}</span>
                </div>
              )}
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "active-link login-animated" : "login-animated"
              }
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
