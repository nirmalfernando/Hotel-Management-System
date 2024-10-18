import Booking from "../models/booking.js";
import Hotel from "../models/hotel.js";
import User from "../models/user.js";
import logger from "../middlewares/logger.js";
import { validationResult, body } from "express-validator";

// Validation rules for creating/updating a booking
export const bookingValidationRules = (isUpdate = false) => [
  body("bookingType")
    .if(() => !isUpdate)
    .isIn(["single", "double", "suite"])
    .withMessage("Booking type must be either 'single', 'double', or 'suite'"),
  body("totalPrice")
    .if(() => !isUpdate)
    .isFloat({ min: 0 })
    .withMessage("Total price must be a positive number"),
  body("checkInDate")
    .if(() => !isUpdate)
    .isISO8601()
    .withMessage(
      "Check-in date must be a valid date in ISO format (YYYY-MM-DD)"
    ),
  body("checkOutDate")
    .if(() => !isUpdate)
    .isISO8601()
    .withMessage(
      "Check-out date must be a valid date in ISO format (YYYY-MM-DD)"
    ),
  body("numOfGuests")
    .if(() => !isUpdate)
    .isInt({ min: 1 })
    .withMessage("Number of guests must be at least 1"),
  body("specialRequests")
    .if(() => !isUpdate)
    .optional()
    .isString()
    .withMessage("Special requests must be a string"),
  body("paymentStatus")
    .if(() => !isUpdate)
    .isIn(["pending", "completed"])
    .withMessage("Payment status must be either 'pending' or 'completed'"),
  body("userId")
    .if(() => !isUpdate)
    .isInt({ min: 1 })
    .withMessage("User ID must be a positive integer"),
  body("hotelId")
    .if(() => !isUpdate)
    .isInt({ min: 1 })
    .withMessage("Hotel ID must be a positive integer"),
];

// Create a new booking
export const createBooking = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error("Validation errors creating booking", errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    bookingType,
    totalPrice,
    checkInDate,
    checkOutDate,
    numOfGuests,
    specialRequests,
    paymentStatus,
    userId,
    hotelId,
  } = req.body;

  try {
    const newBooking = await Booking.create({
      bookingType,
      totalPrice,
      checkInDate,
      checkOutDate,
      numOfGuests,
      specialRequests,
      paymentStatus,
      userId,
      hotelId,
    });

    logger.info(
      "Booking created successfully: ${newBooking.id}, ${newBooking.userId}, ${newBooking.hotelId}"
    );
    return res
      .status(201)
      .json({ message: "Booking created successfully!", booking: newBooking });
  } catch (error) {
    logger.error("Error creating booking", error);
    return res
      .status(500)
      .json({ message: "Unable to create the booking", error: error.message });
  }
};

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: Hotel,
          as: "hotel",
          attributes: ["id", "name", "location", "pricePerNight"],
        },
      ],
    });

    logger.info("Bookings fetched successfully!");
    return res.status(200).json({ bookings });
  } catch (error) {
    logger.error("Error fetching bookings", error);
    return res
      .status(500)
      .json({ message: "Unable to fetch bookings", error: error.message });
  }
};

// Get a booking by id
export const getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: Hotel,
          as: "hotel",
          attributes: ["id", "name", "location", "pricePerNight"],
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    logger.info(
      "Booking fetched successfully: ${booking.id}, ${booking.userId}, ${booking.hotelId}"
    );
    return res.status(200).json({ booking });
  } catch (error) {
    logger.error("Error fetching booking by id", error);
    return res
      .status(500)
      .json({ message: "Unable to fetch the booking", error: error.message });
  }
};

// Update a booking by id
export const updateBooking = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error("Validation errors updating booking", errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const {
    bookingType,
    totalPrice,
    checkInDate,
    checkOutDate,
    numOfGuests,
    specialRequests,
    paymentStatus,
    userId,
    hotelId,
  } = req.body;

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    // Update fields if they are provided
    if (bookingType) {
      booking.bookingType = bookingType;
    }
    if (totalPrice) {
      booking.totalPrice = totalPrice;
    }
    if (checkInDate) {
      booking.checkInDate = checkInDate;
    }
    if (checkOutDate) {
      booking.checkOutDate = checkOutDate;
    }
    if (numOfGuests) {
      booking.numOfGuests = numOfGuests;
    }
    if (specialRequests) {
      booking.specialRequests = specialRequests;
    }
    if (paymentStatus) {
      booking.paymentStatus = paymentStatus;
    }
    if (userId) {
      booking.userId = userId;
    }
    if (hotelId) {
      booking.hotelId = hotelId;
    }

    await booking.save();

    logger.info(
      "Booking updated successfully: ${booking.id}, ${booking.userId}, ${booking.hotelId}"
    );
    return res
      .status(200)
      .json({ message: "Booking updated successfully!", booking });
  } catch (error) {
    logger.error("Error updating booking", error);
    return res
      .status(500)
      .json({ message: "Unable to update the booking", error: error.message });
  }
};

// Delete a booking (set status to "cancelled")
export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found!" });
    }

    // set status to "cancelled"
    booking.bookingStatus = "cancelled";
    await booking.save();

    logger.info(
      "Booking cancelled successfully: ${booking.id}, ${booking.userId}, ${booking.hotelId}"
    );
    return res
      .status(200)
      .json({ message: "Booking cancelled successfully!", booking });
  } catch (error) {
    logger.error("Error deleting booking", error);
    return res
      .status(500)
      .json({ message: "Unable to delete the booking", error: error.message });
  }
};
