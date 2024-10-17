import React from 'react';
import '../styles/Register.css'; // Assuming you want to style it separately

const Register = () => {
  return (
    <div className="register-container">
      <div className="register-logo">
        
        <h1>Hotel Paradise</h1>
      </div>
      <div className="register-box">
        <h2>Create your account</h2>
        <form>
          <div className="form-group">
            
            <input type="text" id="name" name="name" placeholder="Full Name" required />
          </div>
          <div className="form-group">
           
            <input type="email" id="email" name="email" placeholder="Email Address" required />
          </div>
          <div className="form-group">
            
            <input type="password" id="password" name="password" placeholder="Password" required />
          </div>
          <div className="form-group">
            
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required />
          </div>
          <button type="submit" className="register-button">Register</button>
          <div className="success-message">Registration successful!</div> {/* Example success message */}
          <div className="error-message">Registration failed! Please try again.</div> {/* Example error message */}
          <div className='Reg-Text'>
          <a href="/login">Not Registered yet?</a>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
