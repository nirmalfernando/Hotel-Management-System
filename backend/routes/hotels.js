import express from "express";
import {
  createHotel,
  updateHotel,
  getHotels,
  getHotelById,
  deleteHotel,
  hotelValidationRules,
} from "../controllers/hotel.js";
import { verifyToken, isAdmin } from "../middlewares/authRole.js";

const router = express.Router();

// Create a new hotel
router.post("/", verifyToken, hotelValidationRules(), isAdmin, createHotel);

// Update a hotel
router.put(
  "/:id",
  verifyToken,
  hotelValidationRules(true),
  isAdmin,
  updateHotel
);

// Get all hotels
router.get("/", getHotels);

// Get a hotel by id
router.get("/:id", getHotelById);

// Delete a hotel
router.delete("/:id", verifyToken, isAdmin, deleteHotel);

export default router;
