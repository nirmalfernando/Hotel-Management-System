import Room from "../models/room.js";
import Hotel from "../models/hotel.js";
import sequelize from "../connect.js";

// Create a Room under the Hotel through the Hotel ID
export const createRoom = async (req, res) => {
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
      console.error("Error updating hotel with new room: ", error);
      return res.status(500).json({
        message: "Unable to update Hotel with new Room",
        error: error.message,
      });
    }

    return res
      .status(201)
      .json({ message: "Room created successfully!", room: newRoom });
  } catch (error) {
    console.error("Error creating room: ", error);
    return res
      .status(500)
      .json({ message: "Unable to create Room", error: error.message });
  }
};

// Update a Room by ID
export const updateRoom = async (req, res) => {
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

    return res
      .status(200)
      .json({ message: "Room updated successfully!", room });
  } catch (error) {
    console.error("Error updating room: ", error);
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

    return res.status(200).json({ message: "Room deleted successfully!" });
  } catch (error) {
    console.error("Error deleting room: ", error);
    return res
      .status(500)
      .json({ message: "Unable to delete Room", error: error.message });
  }
};

// Get all Rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll({ where: { status: true } });

    return res.status(200).json({ rooms });
  } catch (error) {
    console.error("Error getting rooms: ", error);
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

    return res.status(200).json({ room });
  } catch (error) {
    console.error("Error getting room: ", error);
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

    return res.status(200).json({ message: "Room booked successfully!", room });
  } catch (error) {
    console.error("Error booking room: ", error);
    return res
      .status(500)
      .json({ message: "Unable to book Room", error: error.message });
  }
};