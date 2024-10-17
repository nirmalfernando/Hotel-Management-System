import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../styles/Login.css'; // Assuming you want to style it separately

const Login = () => {
    const navigate = useNavigate();

    // Sample user credentials
    const sampleUser = {
        email: 'test@example.com',
        password: 'password123'
    };

    // States to manage form input and feedback messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh

        // Check if input matches sample user credentials
        if (email === sampleUser.email && password === sampleUser.password) {
            setErrorMessage(''); // Clear any previous error messages
            setSuccessMessage('Login successful!');

            // Redirect to the Home page after a delay or immediately
            setTimeout(() => {
                navigate('/'); // Assuming Home.jsx is mapped to '/home' route
            }, 1000); // Simulate a delay before redirecting
        } else {
            setSuccessMessage(''); // Clear success messages
            setErrorMessage('Login failed! Please try again.');
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
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Update email state
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update password state
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                {/* Display success or error messages */}
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <div className="Reg-Text">
                    <a href="/register">Not Registered yet?</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
