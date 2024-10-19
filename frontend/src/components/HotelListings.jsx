import React, { useEffect } from "react";
import axios from "axios";
import "../styles/HotelListings.css";
import { FaHeart } from "react-icons/fa";

const HotelListings = () => {
  const [hotels, setHotels] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Fetch the hotel data from the backend
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:8000/hotels/");
        setHotels(response.data.hotels);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotels: ", error);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);


if (loading) {
  return <div>Loading Hotels...</div>;
}

return (
  <div className="homes-guests-love">
    <div className="header">
      <h2>Book a hotel</h2>
      <a href="/discover-homes" className="discover-link">
        Discover homes
      </a>
    </div>
    <div className="homes-list">
      {hotels.map((hotel) => (
        <div className="home-card" key={hotel.id}>
          <img src={hotel.photos[0]} alt={hotel.title} className="home-image" />
          <div className="home-details">
            <h3>{hotel.title}</h3>
            <p>
              {hotel.city}, {hotel.address}
            </p>
            <div className="review-section">
              <span className="rating-box">{hotel.rating}</span>
              <span className="review-type">{hotel.reviewType}</span>
              <span className="reviews">• {hotel.reviews || 0} reviews</span>
            </div>
            <p className="price">Starting from LKR {hotel.cheapestPrice}</p>
          </div>
          <div className="heart-icon">
            <button className="favorite-button">
              <FaHeart />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default HotelListings;
