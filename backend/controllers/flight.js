import Flight from "../models/flight.js";
import logger from "../middlewares/logger.js";
import { body, validationResult } from "express-validator";

// Validation rules for creating/updating a flight
export const flightValidationRules = (isUpdate = false) => [
  body("airline")
    .if(() => !isUpdate)
    .isString()
    .withMessage("Airline must be a string")
    .isNotEmpty()
    .withMessage("Airline cannot be empty"),
  body("type")
    .if(() => !isUpdate)
    .isIn(["one-way", "round-trip"])
    .withMessage("Flight type must be either 'one-way' or 'round-trip'"),
  body("departure")
    .if(() => !isUpdate)
    .isString()
    .withMessage("Departure must be a string")
    .isNotEmpty()
    .withMessage("Departure cannot be empty"),
  body("destination")
    .if(() => !isUpdate)
    .isString()
    .withMessage("Destination must be a string")
    .isNotEmpty()
    .withMessage("Destination cannot be empty"),
  body("departureTime")
    .if(() => !isUpdate)
    .isISO8601()
    .withMessage(
      "Departure time must be a valid date in ISO format (YYYY-MM-DDTHH:MM:SSZ)"
    ),
  body("arrivalTime")
    .if(() => !isUpdate)
    .isISO8601()
    .withMessage(
      "Arrival time must be a valid date in ISO format (YYYY-MM-DDTHH:MM:SSZ)"
    ),
  body("price")
    .if(() => !isUpdate)
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("seatNumbers")
    .if(() => !isUpdate)
    .isArray()
    .withMessage("Seat numbers must be an array")
    .custom((seatNumbers) => seatNumbers.length > 0)
    .withMessage("Seat numbers cannot be empty"),
];

// Create a new Flight
export const createFlight = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.error("Validation errors creating flight", errors);
    return res.status(400).json({ errors: errors.array() });
  }

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

    logger.info("Flight created successfully: ${newFlight.id}");
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

    logger.info("Flights retrieved successfully");
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

    logger.info("Flight retrieved successfully: ${flight.id}");
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
  // Handle validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.error("Validation errors updating flight", errors);
    return res.status(400).json({ errors: errors.array() });
  }

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

    logger.info("Flight updated successfully: ${flight.id}");
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

    logger.info("Flight deleted successfully: ${flight.id}");
    return res.status(200).json({ message: "Flight deleted successfully!" });
  } catch (error) {
    logger.error("Error deleting flight by ID: ", error);
    return res
      .status(500)
      .json({ message: "Unable to delete flight by ID", error: error.message });
  }
};
