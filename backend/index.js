import express from 'express';
import bodyParser from 'body-parser'; // Import body-parser for parsing request bodies
import cookieParser from 'cookie-parser'; // Import cookie-parser for parsing cookies
import authRoutes from './routes/auth.js';  // Import the auth routes
import sequelize from './connect.js';  // Import your Sequelize connection
import './models/associations.js'; // Import your model associations
import dotenv from 'dotenv';

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

// Use the auth routes
app.use('/auth', authRoutes);  // Mount the auth routes under /auth

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
