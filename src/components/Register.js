import React, { useState } from "react";
import api from "../api";
import "./Register.css";
import { useNavigate,Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone:""
  });
 const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/api/auth/register", form);
    alert("Registration successful!");
    navigate("/")
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2 className="register-title">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />
          <input name="phone" placeholder="phone" type="number" onChange={handleChange}/>

          <button className="register-btn" type="submit">
            Register
          </button>

        </form>

        <div className="register-footer">
          Already have an account? <Link to ="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

