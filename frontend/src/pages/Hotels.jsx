import React from 'react';
import HotelListings from '../components/HotelListings';
import Header from '../components/header';
import '../styles/Hotels.css';

const Hotels = () => {
  return (
    <>
      <div className="home-container">
        <Header />
        <div className="Hotels-Listings">
        <HotelListings />
      </div>
      </div>
      
    </>
  );
};

export default Hotels;
