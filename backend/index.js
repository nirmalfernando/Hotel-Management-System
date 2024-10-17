import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import sequelize from "./connect.js";
import logger from "./middlewares/logger.js";
import "./models/associations.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import hotelRoutes from "./routes/hotels.js";
import bookingRoutes from "./routes/bookings.js";
import flightRoutes from "./routes/flights.js";
import roomRoutes from "./routes/rooms.js";

dotenv.config(); // Load environment variables

// Initialize the database
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync the models with the database
    await sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Call the function to initialize the database
initializeDatabase();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to log errors
app.use((err, req, res, next) => {
  logger.error(err.message, err);
  res.status(500).json({
    message: "Something went wrong. Please try again later.",
  });
});

// Middleware to handle JSON and cookie parsing
app.use(bodyParser.json()); // Use body-parser to parse JSON bodies
app.use(cookieParser()); // Use cookie-parser to parse cookies

// Setup the routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/hotels", hotelRoutes);
app.use("/bookings", bookingRoutes);
app.use("/flights", flightRoutes);
app.use("/rooms", roomRoutes);

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
