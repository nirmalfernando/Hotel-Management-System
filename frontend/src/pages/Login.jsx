import React from 'react';
import '../styles/Login.css'; // Assuming you want to style it separately

const Login = () => {
    return (
      <div className="login-container">
        <div className="login-logo">
          <h1>Hotel Paradise</h1>
        </div>
        <div className="login-box">
          <h2>Log in to your account</h2>
          <form>
            <div className="form-group">
             
              <input type="email" id="email" name="email" placeholder="Email address"  />
            </div>
            <div className="form-group">
              
              <input type="password" id="password" name="password" placeholder="Password" />
            </div>
            <button type="submit" className="login-button">Login</button>
            <div className="success-message">Login successful!</div> {/* Example success message */}
            <div className="error-message">Login failed! Please try again.</div> {/* Example error message */}
          </form>
          <div className="Reg-Text">
            <a href="/register">Not Registered yet?</a>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;