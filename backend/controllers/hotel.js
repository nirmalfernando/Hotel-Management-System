import Hotel from "../models/hotel.js";
import logger from "../middlewares/logger.js";
import { validationResult, body } from "express-validator";

// Validation for creating/updating a new Hotel
export const hotelValidationRules = (isUpdate = false) => [
  body("name")
    .if(() => !isUpdate)
    .notEmpty()
    .withMessage("Hotel Name is required"),
  body("type")
    .if(() => !isUpdate)
    .notEmpty()
    .withMessage("Hotel Type is required"),
  body("city")
    .if(() => !isUpdate)
    .notEmpty()
    .withMessage("City is required"),
  body("address")
    .if(() => !isUpdate)
    .notEmpty()
    .withMessage("Address is required"),
  body("distance")
    .if(() => !isUpdate)
    .notEmpty()
    .withMessage("Distance is required")
    .isNumeric()
    .withMessage("Distance must be a number"),
  body("photos")
    .if(() => !isUpdate)
    .notEmpty()
    .withMessage("Photos are required")
    .isArray()
    .withMessage("Photos must be an array"),
  body("title")
    .if(() => !isUpdate)
    .notEmpty()
    .withMessage("Title is required"),
  body("description")
    .if(() => !isUpdate)
    .notEmpty()
    .withMessage("Description is required"),
  body("rating")
    .if(() => !isUpdate)
    .notEmpty()
    .withMessage("Rating is required")
    .isNumeric()
    .withMessage("Rating must be a number")
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),
  body("cheapestPrice")
    .if(() => !isUpdate)
    .notEmpty()
    .withMessage("Cheapest Price is required")
    .isNumeric()
    .withMessage("Cheapest Price must be a number"),
  body("featured")
    .if(() => !isUpdate)
    .notEmpty()
    .withMessage("Featured is required")
    .isBoolean()
    .withMessage("Featured must be a boolean"),
];

// Create a new Hotel
export const createHotel = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.error("Validation errors creating hotel", errors);
    return res.status(400).json({ errors: errors.array() });
  }

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

    logger.info("Hotel created successfully: ${newHotel.id}");
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

    logger.info("Hotels retrieved successfully");
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

    logger.info("Hotel retrieved successfully: ${hotel.id}");
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
  // Handle validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.error("Validation errors updating hotel", errors);
    return res.status(400).json({ errors: errors.array() });
  }

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

    logger.info("Hotel updated successfully: ${hotel.id}");
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

    logger.info("Hotel deleted successfully: ${hotel.id}");
    return res.status(200).json({ message: "Hotel deleted successfully!" });
  } catch (error) {
    logger.error("Error deleting hotel:", error);
    return res
      .status(500)
      .json({ message: "Unable to delete the hotel!", error: error.message });
  }
};
