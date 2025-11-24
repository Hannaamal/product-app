import React, { useState } from "react";
import api from "../api";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setToken, setRole, setUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/auth/login", form);
       setToken(res.data.accessToken);
      setRole(res.data.data.role);
      setUser(res.data.data.user); 
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleSubmit}>
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <div className="login-footer">
          Don't have an account? <Link to="/Register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
