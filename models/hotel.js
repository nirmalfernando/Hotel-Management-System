import mongoose from "mongoose"

const HotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        distance: {
            type: String,
        },
        photos: {
            type: [String]
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        rating: {
            type: Number,
            min: 0,
            max: 5
        },
        rooms: {
            type: [String]
        },
        cheapestPrice: {
            type: Number,
            required: true
        },
        featured: {
            type: Boolean,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Hotel", HotelSchema)