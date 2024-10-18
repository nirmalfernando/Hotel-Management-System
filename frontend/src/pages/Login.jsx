import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        username: formData.username,
        password: formData.password,
      });

      console.log("Login successful!", response.data);
      setSuccess("Login successful!");
      setError(null);

      // Redirect to the Home page after successful login
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed! Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <h1>Hotel Paradise</h1>
      </div>
      <div className="login-box">
        <h2>Log in to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {/* Display success or error messages */}
        {successMessage && (
          <div className="success-message">Login Successful</div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div className="Reg-Text">
          <a href="/register">Not Registered yet? Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
