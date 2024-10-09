import { DataTypes } from "sequelize";
import sequelize from "../connect.js";

// Define the Hotel model
const Hotel = sequelize.define("Hotel", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  distance: {
    type: DataTypes.FLOAT,
  },
  photos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 5,
    },
  },
  cheapestPrice: {
    type: DataTypes.FLOAT,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
},
{timestamps: true}
)

export default Hotel;