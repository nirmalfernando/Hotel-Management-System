import mongoose from "mongoose"

const TicketSchema = new mongoose.Schema(
    {
        airline: { 
            typ: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        departure: {
            type: String,
            required: true
        },
        destination: {
            type: String,
            required: true
        },
        departureTime: {
            type: Date,
            required: true
        },
        arrivalTime: {
            type: Date,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        seatNumbers: [{ number: Number, availability: {type: Boolean}}],
        status: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

export default mongoose.model("Ticket", TicketSchema)