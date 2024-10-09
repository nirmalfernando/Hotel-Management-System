import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Op } from "sequelize";

dotenv.config();

const JWT_SECRET = process.env.JWT;

// Register a new user
export const register = async (req, res) => {
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
    const salt = bcrypt.genSaltSync(20);
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

    return res
      .status(201)
      .json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      message: "Unable to create user",
      error: error.message, // Include the error message for debugging
    });
  }
};

// Login a user
export const login = async (req, res) => {
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
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json({ token, user: userData });
  } catch (error) {
    console.error("Error logging in user:", error);
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
};