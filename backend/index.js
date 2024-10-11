import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import sequelize from './connect.js';
import './models/associations.js'; 
import authRoutes from './routes/auth.js'; 
import userRoutes from "./routes/user.js";
import hotelRoutes from "./routes/hotel.js";
import bookingRoutes from "./routes/booking.js";

dotenv.config(); // Load environment variables

// Initialize the database
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync the models with the database
    await sequelize.sync({ force: false });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Call the function to initialize the database
initializeDatabase();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());  // Use body-parser to parse JSON bodies
app.use(cookieParser()); // Use cookie-parser to parse cookies

// Setup the routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/hotels', hotelRoutes);
app.use('/bookings', bookingRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})