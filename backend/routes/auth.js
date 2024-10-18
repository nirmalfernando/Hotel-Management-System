import express from "express";
import {
  register,
  login,
  logout,
  registerValidationRules,
  loginValidationRules,
} from "../controllers/auth.js";

const router = express.Router();

// Register a new user
router.post("/register", registerValidationRules, register);

// Login a user
router.post("/login", loginValidationRules, login);

// Logout a user
router.post("/logout", logout);

export default router;
