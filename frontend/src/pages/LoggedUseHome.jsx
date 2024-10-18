import React from 'react';
import '../styles/Home.css';
import Header from '../components/header';
import HotelListings from '../components/HotelListings';
import Header_loggedUser from '../components/Header_loggedUser';

const LoggedUseHome = () => {
  return (
    <div className="home-container">
      
      {/* Header Section */} 
      
      <Header_loggedUser />

      {/* Main Search Section */}
      <div className="main-search-section">
        <h1>Find your next stay</h1>
        <p>Search deals on hotels, homes, and much more...</p>
        <div className="search-bar">
          <div className="search-input">
            <label htmlFor="destination">Where are you going?</label>
            <input type="text" id="destination" placeholder="Enter destination" />
          </div>
          <div className="search-input">
            <label htmlFor="checkin">Check-in Date</label>
            <input type="date" id="checkin" />
          </div>
          <div className="search-input">
            <label htmlFor="checkout">Check-out Date</label>
            <input type="date" id="checkout" />
          </div>
          <div className="search-input">
            <label htmlFor="guests">Guests</label>
            <input type="text" id="guests" placeholder="2 adults · 0 children · 1 room" />
          </div>
          <button className="search-btn">Search</button>
        </div>
        {/* Hotel Lising Section */} 
        <HotelListings/>
      </div>
    </div>
  
  );
};

export default LoggedUseHome;
