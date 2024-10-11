import express from "express";
import { createHotel, updateHotel, getHotels, getHotelById, deleteHotel } from "../controllers/hotel.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// Create a new hotel
router.post("/", verifyToken, isAdmin, createHotel);

// Update a hotel
router.put("/:id", verifyToken, isAdmin, updateHotel);

// Get all hotels
router.get("/", getHotels);

// Get a hotel by id
router.get("/:id", getHotelById);

// Delete a hotel
router.delete("/:id", verifyToken, isAdmin, deleteHotel);

export default router;