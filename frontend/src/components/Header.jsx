import React from 'react';
import '../styles/Header.css';
import Home from '../pages/Home';



const Header = () => {
    return (
        <header className="header">
            <div className="logo">YourLogo</div>
            <nav className="nav-links">
                <a href="/" className="nav-link">Home</a>
                <a href="/Hotels" className="nav-link">Hotels</a>
                <a href="#room-management" className="nav-link">Rooms</a>
                <a href="#flight-management" className="nav-link">Flights</a>
                <a href="#booking-management" className="nav-link">Bookings</a>
            </nav>
            <div className="user-actions">
                <a href="/register" className="register-btn">Register</a>
                <a href="/login" className="login-btn">Sign In</a>
            </div>
        </header>
    );
}

export default Header;