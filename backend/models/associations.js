import User from './user.js';
import Hotel from './hotel.js';
import Flight from './flight.js';
import Room from './room.js';
import Booking from './booking.js';
import BookingFlights from './bookingFlights.js';
import BookingRooms from './bookingRooms.js';

// User ↔ Booking
User.hasMany(Booking);
Booking.belongsTo(User);

// Booking ↔ Flight (Many-to-Many)
Booking.belongsToMany(Flight, { through: BookingFlights });
Flight.belongsToMany(Booking, { through: BookingFlights });

// Hotel ↔ Room (One-to-Many)
Hotel.hasMany(Room);
Room.belongsTo(Hotel);

// Booking ↔ Room (Many-to-Many)
Booking.belongsToMany(Room, { through: BookingRooms });
Room.belongsToMany(Booking, { through: BookingRooms });

// Booking ↔ Hotel (One-to-One)
Booking.belongsTo(Hotel);

export default {
  User,
  Flight,
  Hotel,
  Room,
  Booking,
  BookingFlights,
  BookingRooms,
};