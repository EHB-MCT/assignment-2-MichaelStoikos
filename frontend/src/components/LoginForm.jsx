import React, { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      localStorage.setItem("sessionToken", data.sessionToken);
      setMessage("Login successful");
      navigate("/home");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
    <div className="login-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      {message && <p className="login-message">{message}</p>}
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  </div>
  );
};

export default LoginForm;
