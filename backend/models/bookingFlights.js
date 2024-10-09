import { DataTypes } from "sequelize";
import sequelize from "../connect.js";

// Define the BookingFlight model
const BookingFlight = sequelize.define("BookingFlight", {
    seatNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    baggageAllowed: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    mealPreference: {
        type: DataTypes.STRING,
    },
    specialRequests: {
        type: DataTypes.STRING,
    },
},
{ timestamps: true }
)