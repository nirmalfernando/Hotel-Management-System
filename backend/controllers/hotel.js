import Hotel from "../models/hotel.js";
import logger from "../middlewares/logger.js";

// Create a new Hotel
export const createHotel = async (req, res) => {
  const {
    name,
    type,
    city,
    address,
    distance,
    photos,
    title,
    description,
    rating,
    cheapestPrice,
    featured,
  } = req.body;

  try {
    const newHotel = await Hotel.create({
      name,
      type,
      city,
      address,
      distance,
      photos,
      title,
      description,
      rating,
      cheapestPrice,
      featured,
      status: true,
    });

    return res
      .status(201)
      .json({ message: "Hotel created successfully!", hotel: newHotel });
  } catch (error) {
    logger.error("Error creating hotel: ", error);
    return res
      .status(500)
      .json({ message: "Unable to create Hotel", error: error.message });
  }
};

// Get all Hotels
export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll({
      where: { status: true },
    });
    return res.status(200).json({ hotels });
  } catch (error) {
    logger.error("Error getting hotels: ", error);
    return res
      .status(500)
      .json({ message: "Unable to get hotels", error: error.message });
  }
};

// Get a Hotel by ID
export const getHotelById = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    return res.status(200).json({ hotel });
  } catch (error) {
    logger.error("Error getting hotel by ID: ", error);
    return res
      .status(500)
      .json({ message: "Unable to get hotel by ID", error: error.message });
  }
};

// Update a Hotel by ID
export const updateHotel = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    type,
    city,
    address,
    distance,
    photos,
    title,
    description,
    rating,
    cheapestPrice,
    featured,
  } = req.body;

  try {
    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Update the fields if they are provided
    if (name) {
      hotel.name = name;
    }
    if (type) {
      hotel.type = type;
    }
    if (city) {
      hotel.city = city;
    }
    if (address) {
      hotel.address = address;
    }
    if (distance) {
      hotel.distance = distance;
    }
    if (photos) {
      hotel.photos = photos;
    }
    if (title) {
      hotel.title = title;
    }
    if (description) {
      hotel.description = description;
    }
    if (rating) {
      hotel.rating = rating;
    }
    if (cheapestPrice) {
      hotel.cheapestPrice = cheapestPrice;
    }
    if (featured) {
      hotel.featured = featured;
    }

    // Save the updated hotel
    await hotel.save();

    return res
      .status(200)
      .json({ message: "Hotel updated successfully!", hotel });
  } catch (error) {
    logger.error("Error updating hotel: ", error);
    return res
      .status(500)
      .json({ message: "Unable to update hotel", error: error.message });
  }
};

// Delete hotel (set status to inactive)
export const deleteHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Set status to inactive for a soft delete instead of deleting the data record from the database
    hotel.status = false;
    await hotel.save();

    return res.status(200).json({ message: "Hotel deleted successfully!" });
  } catch (error) {
    logger.error("Error deleting hotel:", error);
    return res
      .status(500)
      .json({ message: "Unable to delete the hotel!", error: error.message });
  }
};
