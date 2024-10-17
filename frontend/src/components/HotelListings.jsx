import React from 'react';
import '../styles/HotelListings.css'; // Import the CSS file
import { FaHeart } from 'react-icons/fa';
import image1 from '../assets/1.jpg';
import image2 from '../assets/2.jpg';
import image3 from '../assets/3.jpg';
import image4 from '../assets/4.jpg';


const HotelListings = () => {
  const homes = [
    {
      id: 1,
      image: image1, // Replace with actual image URL
      title: 'Aparthotel Stare Miasto',
      location: 'Old Town, Poland, Krakow',
      rating: 8.8,
      reviews: 3031,
      reviewType: 'Excellent',
      price: '50,642',
    },
    {
      id: 2,
      image: image2, // Replace with actual image URL
      title: '7Seasons Apartments Budapest',
      location: '06. Terézváros, Hungary, Budapest',
      rating: 8.8,
      reviews: 11422,
      reviewType: 'Excellent',
      price: '45,879',
    },
    {
      id: 3,
      image: image3, // Replace with actual image URL
      title: 'Villa Domina',
      location: 'Split City Center, Croatia, Split',
      rating: 9.3,
      reviews: 1331,
      reviewType: 'Wonderful',
      price: '25,170',
    },
    {
      id: 4,
      image: image4, // Replace with actual image URL
      title: 'Numa I Vita Apartments',
      location: 'Santa Maria Novella, Italy, Florence',
      rating: 9.2,
      reviews: 1517,
      reviewType: 'Wonderful',
      price: '95,263',
    },
  ];

  return (
    <div className="homes-guests-love">
      <div className="header">
        <h2>Book a hotel </h2>
        <a href="/discover-homes" className="discover-link">Discover homes</a>
      </div>
      <div className="homes-list">
        {homes.map((home) => (
          <div className="home-card" key={home.id}>
            <img src={home.image} alt={home.title} className="home-image" />
            <div className="home-details">
              <h3>{home.title}</h3>
              <p>{home.location}</p>
              <div className="review-section">
                <span className="rating-box">{home.rating}</span>
                <span className="review-type">{home.reviewType}</span>
                <span className="reviews">• {home.reviews} reviews</span>
              </div>
              <p className="price">Starting from LKR {home.price}</p>
            </div>
            <div className="heart-icon">
              <button className="favorite-button">
              <FaHeart /> {/* You can replace this with an actual icon */}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelListings;
