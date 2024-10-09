import { DataTypes } from "sequelize";
import sequelize from "../connect.js";

// Define the Flight model
const Flight = sequelize.define("Flight", {
    airline: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    departure: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    departureTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    seatNumbers: {
        type: DataTypes.JSON
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    }
},
{timestamps: true}
)

export default Flight;