import Room from "../models/room.js";
import Hotel from "../models/hotel.js";
import sequelize from "../connect.js";
import logger from "../middlewares/logger.js";
import { body, validationResult } from "express-validator";

// Validation Rules for creating/updating a Room
export const roomValidationRules = (isUpdate = false) => [
  body("title")
    .if(() => !isUpdate)
    .isString()
    .notEmpty()
    .withMessage("Title is required"),
  body("price")
    .if(() => !isUpdate)
    .isNumeric()
    .notEmpty()
    .withMessage("Price is required"),
  body("maxPeople")
    .if(() => !isUpdate)
    .isNumeric()
    .notEmpty()
    .withMessage("Max People is required"),
  body("description")
    .if(() => !isUpdate)
    .isString()
    .notEmpty()
    .withMessage("Description is required"),
  body("roomNumber")
    .if(() => !isUpdate)
    .isString()
    .notEmpty()
    .withMessage("Room Number is required"),
  body("bookedDates")
    .if(() => !isUpdate)
    .isArray()
    .optional()
    .withMessage("Booked Dates must be an array of dates"),
];

// Create a Room under the Hotel through the Hotel ID
export const createRoom = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error("Validation errors creating room", errors);
    return res.status(400).json({ errors: errors.array() });
  }

  const hotelId = req.params.hotelid;
  const { title, price, maxPeople, description, roomNumber, bookedDates } =
    req.body;

  try {
    const newRoom = await Room.create({
      title,
      price,
      maxPeople,
      description,
      roomNumber,
      bookedDates,
      status: true,
    });

    try {
      // Update the Hotel with the newly created Room's ID
      await Hotel.update(
        {
          rooms: sequelize.fn(
            "array_append",
            sequelize.col("rooms"),
            newRoom.id
          ),
        },
        { where: { id: hotelId } }
      );
    } catch (error) {
      logger.error("Error updating hotel with new room: ", error);
      return res.status(500).json({
        message: "Unable to update Hotel with new Room",
        error: error.message,
      });
    }

    logger.info("Room created successfully: ${newRoom.id}");
    return res
      .status(201)
      .json({ message: "Room created successfully!", room: newRoom });
  } catch (error) {
    logger.error("Error creating room: ", error);
    return res
      .status(500)
      .json({ message: "Unable to create Room", error: error.message });
  }
};

// Update a Room by ID
export const updateRoom = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title, price, maxPeople, description, roomNumber, bookedDates } =
    req.body;

  try {
    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (title) {
      room.title = title;
    }
    if (price) {
      room.price = price;
    }
    if (maxPeople) {
      room.maxPeople = maxPeople;
    }
    if (description) {
      room.description = description;
    }
    if (roomNumber) {
      room.roomNumber = roomNumber;
    }
    if (bookedDates) {
      room.bookedDates = bookedDates;
    }

    await room.save();

    logger.info("Room updated successfully: ${room.id}");
    return res
      .status(200)
      .json({ message: "Room updated successfully!", room });
  } catch (error) {
    logger.error("Error updating room: ", error);
    return res
      .status(500)
      .json({ message: "Unable to update Room", error: error.message });
  }
};

// Delete a Room by ID
export const deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    room.status = false;
    await room.save();

    logger.info("Room deleted successfully: ${room.id}");
    return res.status(200).json({ message: "Room deleted successfully!" });
  } catch (error) {
    logger.error("Error deleting room: ", error);
    return res
      .status(500)
      .json({ message: "Unable to delete Room", error: error.message });
  }
};

// Get all Rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll({ where: { status: true } });

    logger.info("Rooms fetched successfully");
    return res.status(200).json({ rooms });
  } catch (error) {
    logger.error("Error getting rooms: ", error);
    return res
      .status(500)
      .json({ message: "Unable to get Rooms", error: error.message });
  }
};

// Get Room by ID
export const getRoomById = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    logger.info("Room fetched successfully: ${room.id}");
    return res.status(200).json({ room });
  } catch (error) {
    logger.error("Error getting room: ", error);
    return res
      .status(500)
      .json({ message: "Unable to get Room", error: error.message });
  }
};

// Book a Room by ID
export const bookRoom = async (req, res) => {
  const { id } = req.params;
  const { bookedDates } = req.body; // Make sure to use bookedDates here

  try {
    const room = await Room.findByPk(id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Check if the room is already booked for the given dates
    for (let date of bookedDates) {
      if (room.bookedDates.includes(date)) {
        return res
          .status(400)
          .json({ message: "Room already booked for the given dates" });
      }
    }

    // Update the room's bookedDates with the new dates
    room.bookedDates = [...room.bookedDates, ...bookedDates]; // Use bookedDates here

    await room.save();

    logger.info("Room booked successfully: ${room.id}");
    return res.status(200).json({ message: "Room booked successfully!", room });
  } catch (error) {
    logger.error("Error booking room: ", error);
    return res
      .status(500)
      .json({ message: "Unable to book Room", error: error.message });
  }
};
