import express from "express"
import { createHotel, updateHotel, deleteHotel, getHotel, getHotels, getCheapestHotels, getFeaturedHotels,  getHotelsByCity, getHotelsByDistance, getHotelsByRating, getHotelsByType} from "../controllers/hotel"

const router = express.Router()

// Create a new hotel
router.post("/", createHotel)

// Update a hotel
router.put("/:id", updateHotel)

// Delete a hotel
router.delete("/:id", deleteHotel)

// Get a hotel
router.get("/:id", getHotel)

// Get all hotels
router.get("/", getHotels)

// Get featured hotels
router.get("/featured", getFeaturedHotels)

// Get cheapest hotels
router.get("/cheapest", getCheapestHotels)

// Get hotels by city
router.get("/city/:city", getHotelsByCity)

// Get hotels by distance
router.get("/distance/:distance", getHotelsByDistance)

// Get hotels by rating
router.get("/rating", getHotelsByRating)

// Get hotels by type
router.get("/type/:type", getHotelsByType)

export default router;