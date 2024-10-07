import express from "express";
import { updateUser, getUser, getUsers, deleteUser } from "../controllers/user";

const router = express.Router();

// Update a user by username
router.put("/:username", updateUser);

// Get a user by username
router.get("/:username", getUser);

// Get all users
router.get("/", getUsers);

// Delete a user by username
router.delete("/:username", deleteUser);

export default router;
