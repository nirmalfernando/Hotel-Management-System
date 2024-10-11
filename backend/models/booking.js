import { DataTypes } from "sequelize";
import sequelize from "../connect.js";
import User from "./user.js";
import Hotel from "./hotel.js";

// Define the Booking model
const Booking = sequelize.define("Booking", {
    bookingType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    checkInDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    bookingStatus: {
        type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
        defaultValue: "pending",
        allowNull: false,
    },
    numOfGuests: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    specialRequests: {
        type: DataTypes.STRING,
    },
    paymentStatus: {
        type: DataTypes.ENUM("pending", "completed", "failed"),
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id",
        },
    },
    hotelId: {
        type: DataTypes.INTEGER,
        references: {
            model: Hotel,
            key: "id",
        },
    }
},
{ timestamps: true }
)

export default Booking;