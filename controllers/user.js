import User from "../models/user.js";
import bcrypt from "bcryptjs";

// Update a user's profile
export const updateUser = async (req, res) => {
  const username = req.params.username; // Extract username from request params
  const loggedInUser = req.user.username; // Extract logged in user
  const loggedInUserRole = req.user.role; // Extract logged in user role

  // Check if the logged in user is an admin or updating their own profile
  if (loggedInUser !== username && loggedInUserRole !== "admin") {
    return res.status(403).json({
      message: "You are not authorized to update this user's profile",
    });
  }

  const { email, password, firstName, lastName, contactNumber, country } =
    req.body;

  try {
    const updatedUser = {
      email,
      password,
      firstName,
      lastName,
      contactNumber,
      country,
    };

    // Hash the password before saving it to the database
    if (password) {
      const salt = await bcrypt.genSalt(20);
      updatedUser.password = await bcrypt.hash(password, salt);
    }

    // Find the user by username and update the user
    await User.findOneAndUpdate({ username }, updatedUser, { new: true });

    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    // Fetch all users, excluding the passwords for security reasons
    const users = await User.find({}, { password: 0 });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get a user by username
export const getUser = async (req, res) => {
  const username = req.params.username; // Extract username from request params

  try {
    // Fetch the user by username, excluding the password for security reasons
    const user = await User.findOne({ username }, { password: 0 });

    // If the user does not exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete a user by username
export const deleteUser = async (req, res) => {
  const username = req.params.username; // Extract username from request params
  const loggedInUser = req.user.username; // Extract logged in user
  const loggedInUserRole = req.user.role; // Extract logged in user role

  // Check if the logged in user is an admin or deleting their own profile
  if (loggedInUser !== username && loggedInUserRole !== "admin") {
    return res.status(403).json({
      message: "You are not authorized to delete this user's profile",
    });
  }

  try {
    // Find the user by username and delete the user
    await User.findOneAndDelete({ username });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
