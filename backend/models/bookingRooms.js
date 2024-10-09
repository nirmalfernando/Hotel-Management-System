import { DataTypes } from "sequelize";
import sequelize from "../connect.js";

// Define the BookingRoom model
const BookingRoom = sequelize.define("BookingRoom", {
    checkInDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    numberOfGuests: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    specialRequests: {
        type: DataTypes.STRING,
    },
},{
    timestamps: true
})

export default BookingRoom;