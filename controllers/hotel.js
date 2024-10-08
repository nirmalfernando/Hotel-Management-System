import Hotel from "../models/hotel.js";

export const createHotel = async (req, res) => {
    const { name, address, contactNumber, email, rating, status } = req.body;
    
    try {
        const existingHotel = await Hotel.findOne({ name });
        if (existingHotel) {
            return res.status(409).json("Hotel already exists!");
        }

        const newHotel = new Hotel({
            name,
            type,
            city,
            address,
            distance,
            photos,
            title,
            description,
            rating,
            rooms,
            cheapestPrice,
            featured,
            status
        });

        await newHotel.save();
        return res.status(200).json("Hotel has been created!");
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}

export const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        return res.status(200).json(hotels);
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}

export const getHotel = async (req, res) => {
    const { id } = req.params;

    try {
        const hotel = await Hotel.findById(id);
        return res.status(200).json(hotel);
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}

export const updateHotel = async (req, res) => {
    const { name } = req.params;
    const { type, city, address, distance, photos, title, description, rating, rooms, cheapestPrice, featured  } = req.body;

    try {
        const updatedHotel = {
            type,
            city,
            address,
            distance,
            photos,
            title,
            description,
            rating,
            rooms,
            cheapestPrice,
            featured
        };

        await Hotel.findOneAndUpdate({ name }, updatedHotel, { new: true });
        return res.status(200).json("Hotel updated successfully");
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}

export const deleteHotel = async (req, res) => {
    const { name } = req.params;

    try {
        await Hotel.findOne({ name });
        return res.status(200).json("Hotel deleted successfully");
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}

export const getFeaturedHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({ featured: true });
        return res.status(200).json(hotels);
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}

export const getCheapestHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find().sort({ cheapestPrice: 1 });
        return res.status(200).json(hotels);
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}

export const getHotelsByRating = async (req, res) => {
    try {
        const hotels = await Hotel.find().sort({ rating: -1 });
        return res.status(200).json(hotels);
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}

export const getHotelsByCity = async (req, res) => {
    const { city } = req.params;

    try {
        const hotels = await Hotel.find({ city });
        return res.status(200).json(hotels);
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}

export const getHotelsByType = async (req, res) => {
    const { type } = req.params;

    try {
        const hotels = await Hotel.find({ type });
        return res.status(200).json(hotels);
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}

export const getHotelsByDistance = async (req, res) => {
    const { distance } = req.params;

    try {
        const hotels = await Hotel.find({ distance });
        return res.status(200).json(hotels);
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}