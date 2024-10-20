import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import { Op } from "sequelize";
import logger from "../middlewares/logger.js";

dotenv.config();

const JWT_SECRET = process.env.JWT;

// Validation rules for user registration
export const registerValidationRules = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .matches(/^[a-zA-Z0-9_]*$/)
    .withMessage(
      "Username must contain only letters, numbers, and underscores"
    ),
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character"),
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("contactNumber")
    .matches(/^[0-9]+$/)
    .withMessage("Contact number can only contain digits")
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact number must be 10 digits long"),
  body("country").notEmpty().withMessage("Country is required"),
];

// Register a new user
export const register = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.error("Validation errors while creating user:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    username,
    email,
    password,
    firstName,
    lastName,
    contactNumber,
    country,
    role,
  } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] },
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      contactNumber,
      country,
      role,
      status: true,
    });

    logger.info(
      "User created successfully: ${newUser.username} (${newUser.email})"
    );

    return res
      .status(201)
      .json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    logger.error("Error creating user:", error);
    return res.status(500).json({
      message: "Unable to create user",
      error: error.message, // Include the error message for debugging
    });
  }
};

// Validation rules for user login
export const loginValidationRules = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Login a user
export const login = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.error("Validation errors while logging in user:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ where: { username, status: true } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Send the token and user details (without the password)
    const { password: userPassword, ...userData } = user.toJSON();
    res
      .cookie("accessToken", token, { httpOnly: true, secure: true })
      .status(200)
      .json({ user: userData });
    logger.info(
      "User logged in successfully: ${user.username} (${user.email})"
    );
  } catch (error) {
    logger.error("Error logging in user:", error);
    return res.status(500).json({
      message: "Unable to login user",
      error: error.message, // Include the error message for debugging
    });
  }
};

// Logout a user
export const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "User logged out" });
  logger.info(
    "User logged out successfully: ${req.user.username} (${req.user.email})"
  );
};
