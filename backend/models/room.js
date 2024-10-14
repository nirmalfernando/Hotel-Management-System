import { DataTypes } from "sequelize";
import sequelize from "../connect.js";

// Define the Room model
const Room = sequelize.define("Room", {
  roomNumber:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  maxPeople: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookedDates: {
    type: DataTypes.JSON, // JSON is recommended for better querying in PostgreSQL
    allowNull: false,
    defaultValue: [], // Initialize as an empty array
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
}, 
{ timestamps: true });

export default Room;