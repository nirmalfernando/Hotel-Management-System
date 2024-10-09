import { DataTypes } from "sequelize";
import sequelize from "../connect.js";

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
},
{timestamps: true}
)

export default Booking;