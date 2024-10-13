import express from "express";
import {
  createFlight,
  updateFlight,
  getFlights,
  getFlight,
  deleteFlight,
} from "../controllers/flight.js";
import { verifyToken, isAdmin } from "../middlewares/authRole.js";

const router = express.Router();

// Create a new Flight
router.post("/", verifyToken, isAdmin, createFlight);

// Get all Flights
router.get("/", verifyToken, getFlights);

// Get a Flight by ID
router.get("/:id", verifyToken, getFlight);

// Update a Flight by ID
router.put("/:id", verifyToken, isAdmin, updateFlight);

// Delete a Flight by ID
router.delete("/:id", verifyToken, isAdmin, deleteFlight);

export default router;