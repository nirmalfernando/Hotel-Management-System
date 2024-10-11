import express from "express";
import { createBooking, updateBooking, getBookings, getBookingById, deleteBooking } from "../controllers/booking.js";
import { verifyToken, isOwnerOrAdmin, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Create a new booking
router.post("/", verifyToken, createBooking);

// Update a booking
router.put("/:id", verifyToken, isOwnerOrAdmin, updateBooking);

// Get all bookings
router.get("/", verifyToken, isAdmin, getBookings);

// Get a booking by id
router.get("/:id", verifyToken, isOwnerOrAdmin, getBookingById);

// Delete a booking
router.delete("/:id", verifyToken, isOwnerOrAdmin, deleteBooking);

export default router;