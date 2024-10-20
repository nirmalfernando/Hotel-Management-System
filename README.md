# Hotel Management System

## Overview

This project is a Hotel management system with modular API architecture. It includes endpoints for user registration, login, and logout, as well as for managing hotels and their rooms with a frontend that is designed where user can Register, Login, and Logout, Checkout and Search Hotels and Book the Rooms based on the availability

## Prerequisites

- Node.js and npm (Node Package Manager)
- `nvm` (Node Version Manager)
- PostgreSQL (for Database)

## Setup Instruction

### 1. Clone the Repository

```bash
git clone https://github.com/nirmalfernando/Hotel-Management-System.git
cd Hotel-Management-System
```

### 2. Setup Node.js with `nvm`

1. **Install `nvm` (Node Version Manager)**

Follow the installation instructions from the [nvm repository](https://github.com/nvm-sh/nvm#installing-and-updating)

2. **Install Node.js**

Use `nvm` to install the required version of Node.js:

```bash
nvm install # This installs the required node version
nvm use node
```

3. **Install Dependencies**
   With Node.js set up, install project dependencies:

For backend:

```bash
cd Hotel-Management-System/backend/
npm install
```

For frontend:

```bash
cd Hotel-Management-System/frontend/
npm install
```

### 3. Database Setup

You have to use PostgreSQL to set up the database

1. **Install PostgreSQL**

Follow the installation instructions for your operating system from the [PostgreSQL official website](https://www.postgresql.org/download/).

2. **Configure Database Connection**

Create a '.env' file in the root directory of the backend folder by copying `.env.example` and update it with your PostgreSQL connection details:

```plaintext
DB_HOST=localhost
DB_USER=postgres || <db_user>
DB_PASS=<db_password>
DB_NAME=tms || <db_name>
DB_DIALECT=postgres
DB_PORT=5432
```

**Update `backend/connect.js`** to use environment variables:

```javascript
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

// Create a new Sequelize instance and configure the database connection
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database username
  process.env.DB_PASS, // Database password
  {
    host: process.env.DB_HOST, // Database host (e.g., localhost)
    dialect: process.env.DB_DIALECT, // Database dialect (e.g., postgres)
    port: process.env.DB_PORT || 5432, // Database port, default to 5432
    logging: true, // Enable SQL logging
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
```

### 4. Running the Application

1. **Start the Backend**

Run the application using Node.js:

```bash
npm start
```
2. **Start the Frontend**

Run the application using following command:

```bash
npm run dev
```