import { DataTypes } from "sequelize";
import sequelize from "../connect.js";

// Define the Room model
const Room = sequelize.define("Room",{
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
  },
  roomNumbers: {
    type: DataTypes.JSON,
  }
},
{timestamps: true}
)

export default Room;