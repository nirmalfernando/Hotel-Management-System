import Flight from "../models/flight.js";
import logger from "../middlewares/logger.js";

// Create a new Flight
export const createFlight = async (req, res) => {
  const {
    airline,
    type,
    departure,
    destination,
    departureTime,
    arrivalTime,
    price,
    seatNumbers,
  } = req.body;

  try {
    const newFlight = await Flight.create({
      airline,
      type,
      departure,
      destination,
      departureTime,
      arrivalTime,
      price,
      seatNumbers,
      status: true,
    });

    return res
      .status(201)
      .json({ message: "Flight created successfully!", flight: newFlight });
  } catch (error) {
    logger.error("Error creating flight: ", error);
    return res
      .status(500)
      .json({ message: "Unable to create Flight", error: error.message });
  }
};

// Get all Flights
export const getFlights = async (req, res) => {
  try {
    const flights = await Flight.findAll({
      where: { status: true },
    });
    return res.status(200).json({ flights });
  } catch (error) {
    logger.error("Error getting flights: ", error);
    return res
      .status(500)
      .json({ message: "Unable to get flights", error: error.message });
  }
};

// Get a Flight by ID
export const getFlight = async (req, res) => {
  const { id } = req.params;

  try {
    const flight = await Flight.findByPk(id);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    return res.status(200).json({ flight });
  } catch (error) {
    logger.error("Error getting flight by ID: ", error);
    return res
      .status(500)
      .json({ message: "Unable to get flight by ID", error: error.message });
  }
};

// Update a Flight by ID
export const updateFlight = async (req, res) => {
  const { id } = req.params;
  const {
    airline,
    type,
    departure,
    destination,
    departureTime,
    arrivalTime,
    price,
    seatNumbers,
  } = req.body;

  try {
    const flight = await Flight.findByPk(id);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    if (airline) {
      flight.airline = airline;
    }
    if (type) {
      flight.type = type;
    }
    if (departure) {
      flight.departure = departure;
    }
    if (destination) {
      flight.destination = destination;
    }
    if (departureTime) {
      flight.departureTime = departureTime;
    }
    if (arrivalTime) {
      flight.arrivalTime = arrivalTime;
    }
    if (price) {
      flight.price = price;
    }
    if (seatNumbers) {
      flight.seatNumbers = seatNumbers;
    }

    await flight.save();

    return res
      .status(200)
      .json({ message: "Flight updated successfully!", flight });
  } catch (error) {
    logger.error("Error updating flight by ID: ", error);
    return res
      .status(500)
      .json({ message: "Unable to update flight by ID", error: error.message });
  }
};

// Delete a Flight by ID
export const deleteFlight = async (req, res) => {
  const { id } = req.params;

  try {
    const flight = await Flight.findByPk(id);

    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }

    flight.status = false;
    await flight.save();

    return res.status(200).json({ message: "Flight deleted successfully!" });
  } catch (error) {
    logger.error("Error deleting flight by ID: ", error);
    return res
      .status(500)
      .json({ message: "Unable to delete flight by ID", error: error.message });
  }
};
