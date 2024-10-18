import React from 'react';
import Header from '../components/header';
import SingleProduct from '../components/SingleProduct';
import '../styles/SingleProduct.css';

const SingleProductPage = () => {
    return (
      <div className="home-container">
        
        {/* Header Section */} 
        
        <Header />
        <SingleProduct />
  
        {/* Main Search Section */}
        
      </div>
    
    );
  };
  
  export default SingleProductPage;