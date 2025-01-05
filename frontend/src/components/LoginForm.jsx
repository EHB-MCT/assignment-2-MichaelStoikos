import React, { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
// State to hold form input values (email and password)
const [formData, setFormData] = useState({ email: "", password: "" });

// State to hold success or error messages
const [message, setMessage] = useState("");

// Hook to navigate to different routes
const navigate = useNavigate();

/**
 * Handles input changes for the login form.
 * 
 * @function handleChange
 * @param {Object} e - Event object from the input field
 * Updates the `formData` state dynamically based on the input's name and value.
 */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission for logging in a user.
   * 
   * @function handleSubmit
   * @param {Object} e - Event object from the form submission
   * Prevents default form submission, calls the `loginUser` API, and manages session tokens and navigation.
   * 
   * - If login is successful:
   *   - Stores the session token in `localStorage`.
   *   - Displays a success message.
   *   - Redirects the user to the home page.
   * - If login fails:
   *   - Displays an error message from the API response or a generic message.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
       // Call the `loginUser` API function with form data
      const data = await loginUser(formData);

      // Save the session token in localStorage for authentication
      localStorage.setItem("sessionToken", data.sessionToken);

      // Display success message and navigate to the home page
      setMessage("Login successful");
      navigate("/home");
    } catch (error) {
      // Display error message from the API response or a fallback message
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
