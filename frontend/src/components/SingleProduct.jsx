import React from "react";
import { useParams } from "react-router-dom"; // Assuming you're passing product ID through the URL
import "../styles/SingleProduct.css"; // Assuming you want to style it separately
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";

const SingleProduct = () => {
  // Fetching hotel data based on ID
  const { id } = useParams();

  // Example hotel data (you would fetch this from an API)
  const hotel = {
    id: 1,
    name: "Aparthotel Stare Miasto",
    location: "Old Town, Poland, Krakow",
    rating: 8.8,
    reviews: 3031,
    description:
      "Aparthotel Stare Miasto is located in the heart of Krakow’s Old Town, just 200 m from the Main Market Square.",
    price: "LKR 50,642",
    images: [
      image1,
      image2,
      image3,
     
    ],
    amenities: ["Free WiFi", "Breakfast Included", "Air Conditioning"],
  };

  return (
    <div className="single-product">
      <div className="product-header">
        <h1>{hotel.name}</h1>
        <p>{hotel.location}</p>
        <div className="product-rating">
          <span>Rating: {hotel.rating} (Excellent)</span>
          <span>{hotel.reviews} reviews</span>
        </div>
        <p>Starting from {hotel.price}</p>
      </div>

      <div className="product-gallery">
        {hotel.images.map((image, index) => (
          <img key={index} src={image} alt={`${hotel.name} ${index}`} />
        ))}
      </div>

      <div className="product-details">
        <h2>About this place</h2>
        <p>{hotel.description}</p>
        <h3>Amenities</h3>
        <ul>
          {hotel.amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      </div>

      <div className="booking-section">
        <h3>Book Your Stay</h3>
        <label>
          Check-in date:
          <input type="date" />
        </label>
        <label>
          Check-out date:
          <input type="date" />
        </label>
        <label>
          Number of rooms:
          <select>
            <option>1 Room</option>
            <option>2 Rooms</option>
            <option>3 Rooms</option>
          </select>
        </label>
        <button>Proceed to Book</button>
      </div>
    </div>
  );
};

export default SingleProduct;