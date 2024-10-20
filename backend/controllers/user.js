import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import logger from "../middlewares/logger.js";
import { body, validationResult } from "express-validator";

// Validation Rules for creating/updating a User
export const userValidationRules = (isUpdate = false) => [
  body("username")
    .if(() => !isUpdate)
    .isString()
    .notEmpty()
    .withMessage("Username is required"),
  body("email")
    .if(() => !isUpdate)
    .isEmail()
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .if(() => !isUpdate)
    .isString()
    .notEmpty()
    .withMessage("Password is required"),
  body("firstName")
    .if(() => !isUpdate)
    .isString()
    .notEmpty()
    .withMessage("First Name is required"),
  body("lastName")
    .if(() => !isUpdate)
    .isString()
    .notEmpty()
    .withMessage("Last Name is required"),
  body("contactNumber")
    .if(() => !isUpdate)
    .isString()
    .notEmpty()
    .withMessage("Contact Number is required"),
  body("country")
    .if(() => !isUpdate)
    .isString()
    .notEmpty()
    .withMessage("Country is required"),
  body("role")
    .if(() => !isUpdate)
    .isString()
    .notEmpty()
    .withMessage("Role is required"),
];

// Update a user
export const updateUser = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error("Validation errors updating user", errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
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
    // Find the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the fields if they are provided
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      const salt = bcrypt.genSaltSync(20);
      const hashedPassword = bcrypt.hashSync(password, salt);
      user.password = hashedPassword;
    }
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (contactNumber) {
      user.contactNumber = contactNumber;
    }
    if (country) {
      user.country = country;
    }
    if (role) {
      user.role = role;
    }

    // Save the updated user
    await user.save();

    logger.info("User updated successfully: ${user.username} (${user.email})");
    return res
      .status(200)
      .json({ message: "User updated successfully!", user });
  } catch (error) {
    logger.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "Unable to update user", error: error.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    // Find all users with the status filter
    const users = await User.findAll({ where: { status: true } });

    logger.info("Users fetched successfully");
    return res.status(200).json({ users });
  } catch (error) {
    logger.error("Error getting users:", error);
    return res
      .status(500)
      .json({ message: "Unable to get users", error: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fibd the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    logger.info("User fetched successfully: ${user.username} (${user.email})");
    return res.status(200).json({ user });
  } catch (error) {
    logger.error("Error fetching user:", error);
  }
};

// Delete a user (Set status to false)
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Set user status to inactive
    user.status = false;
    await user.save();

    logger.info("User deleted successfully: ${user.username} (${user.email})");
    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    logger.error("Error deleting user:", error);
    return res
      .status(500)
      .json({ message: "Unable to delete user", error: error.message });
  }
};
