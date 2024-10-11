import User from "../models/user.js";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

// Update a user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password, firstName, lastName, contactNumber, country, role } = req.body;

    try{
        // Find the user by ID
        const user = await User.findByPk(id);

        if (!user){
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

        return res.status(200).json({ message: "User updated successfully!", user }); 
    }
    catch (error){
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Unable to update user", error: error.message });
    }
}

// Get all users
export const getUsers = async (req, res) => {
    try{
        // Find all users with the status filter
        const users = await User.findAll({ where: { status: true } });

        return res.status(200).json({ users });
    }
    catch (error){
        console.error("Error getting users:", error);
        return res.status(500).json({ message: "Unable to get users", error: error.message });
    }
}

// Get a user by ID
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try{
        // Fibd the user by ID
        const user = await User.findByPk(id);

        if (!user){
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    }
    catch (error){
        console.error("Error fetching user:", error);
    }
}    

// Delete a user (Set status to false)
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try{
        // Find the user by ID
        const user = await User.findByPk(id);

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        // Set user status to inactive
        user.status = false;
        await user.save();

        return res.status(200).json({ message: "User deleted successfully!" });
    }
    catch (error){
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Unable to delete user", error: error.message });
    }
}