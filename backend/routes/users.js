import express from "express";
import { updateUser, getUsers, getUserById, deleteUser } from "../controllers/user.js";
import { verifyToken, isAdmin, isOwnerOrAdmin } from "../middlewares/authRole.js";

const router = express.Router();

// Update a user
router.put("/:id", verifyToken, isOwnerOrAdmin, updateUser);

// Get all users
router.get("/", verifyToken, isAdmin, getUsers);

// Get a user by ID
router.get("/:id", verifyToken, isOwnerOrAdmin, getUserById);

// Delete a user
router.delete("/:id", verifyToken, isOwnerOrAdmin, deleteUser);

export default router;