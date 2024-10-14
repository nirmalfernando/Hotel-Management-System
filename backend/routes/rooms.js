import express from "express"; 
import { createRoom, updateRoom, deleteRoom, getRoomById, getRooms, bookRoom } from "../controllers/room.js";
import { verifyToken, isAdmin } from "../middlewares/authRole.js";

const router = express.Router();

// Create a new Room
router.post("/", verifyToken, isAdmin, createRoom);

// Update a Room
router.put("/:id", verifyToken, isAdmin, updateRoom);

// Delete a Room
router.delete("/:id", verifyToken, isAdmin, deleteRoom);

// Get all Rooms
router.get("/", getRooms);

// Get a Room by ID
router.get("/:id", getRoomById);

// Book a Room by ID
router.post("/:id/book", verifyToken, bookRoom);

export default router;