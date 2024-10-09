import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Create a new Sequelize instance and configure the database connection
const sequelize = new Sequelize(
  process.env.DB_NAME,        // Database name
  process.env.DB_USER,        // Database username
  process.env.DB_PASS,        // Database password
  {
    host: process.env.DB_HOST,      // Database host (e.g., localhost)
    dialect: process.env.DB_DIALECT, // Database dialect (e.g., postgres)
    port: process.env.DB_PORT || 5432,  // Database port, default to 5432
    logging: true,                 // Enable SQL logging
    pool: {
      max: 5, // Maximum number of connection in pool
      min: 0, // Minimum number of connection in pool
      acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000, // The maximum time, in milliseconds, that a connection can be idle before being released
    },
  }
);

// Test the connection to ensure it works
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testConnection();

export default sequelize; // Export the sequelize instance to use in other parts of your app
