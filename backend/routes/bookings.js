import express from "express";
import {
  createBooking,
  updateBooking,
  getBookings,
  getBookingById,
  deleteBooking,
  bookingValidationRules,
} from "../controllers/booking.js";
import {
  verifyToken,
  isOwnerOrAdmin,
  isAdmin,
} from "../middlewares/authRole.js";

const router = express.Router();

// Create a new booking
router.post("/", verifyToken, bookingValidationRules(), createBooking);

// Update a booking
router.put(
  "/:id",
  verifyToken,
  bookingValidationRules(true),
  isOwnerOrAdmin,
  updateBooking
);

// Get all bookings
router.get("/", verifyToken, isAdmin, getBookings);

// Get a booking by id
router.get("/:id", verifyToken, isOwnerOrAdmin, getBookingById);

// Delete a booking
router.delete("/:id", verifyToken, isOwnerOrAdmin, deleteBooking);

export default router;
