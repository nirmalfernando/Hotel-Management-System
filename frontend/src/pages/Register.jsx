import React from "react";
import axios from "axios";
import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
    country: "",
    role: "user",
  });

  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        contactNumber: formData.contactNumber,
        country: formData.country,
        role: formData.role,
      });

      console.log("Registration successful!", response.data);
      setSuccess("Registration successful!", true);
      setError(null);
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Registration failed! Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-logo">
        <h1>Hotel Paradise</h1>
      </div>
      <div className="register-box">
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>

          {success && (
            <div className="success-message">Registration successful!</div>
          )}
          {error && <div className="error-message">{error}</div>}

          <div className="Reg-Text">
            <a href="/login">Already have an account? Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
