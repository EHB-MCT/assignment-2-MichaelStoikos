import React, { useState } from "react";
import { registerUser } from "../api/authApi";
import {  Link } from "react-router-dom";

const RegisterForm = () => {

  // State to hold form input values (username, email, and password)
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  // State to hold success or error messages
  const [message, setMessage] = useState("");

  /**
 * Handles input changes for the registration form.
 * 
 * @function handleChange
 * @param {Object} e - Event object from the input field
 * Dynamically updates the `formData` state based on the input field's name and value.
 */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  /**
 * Handles form submission for registering a new user.
 * 
 * @function handleSubmit
 * @param {Object} e - Event object from the form submission
 * Prevents default form submission, calls the `registerUser` API, and manages success or error messages.
 * 
 * - If registration is successful:
 *   - Displays the success message from the server.
 * - If registration fails:
 *   - Displays an error message from the API response or a generic fallback message.
 */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Call the `registerUser` API function with the form data
      const data = await registerUser(formData);
      // Display the success message from the API response
      setMessage(data.message);
    } catch (error) {
      // Display error message from the API response or a fallback message
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-container">
    <div className="login-card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
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
        <button type="submit" className="login-button">Register</button>
      </form>
      {message && <p className="login-message">{message}</p>}
      <p>
        Already have an account? <Link to="/">Log In</Link>
      </p>
    </div>
    </div>
  );
};

export default RegisterForm;
