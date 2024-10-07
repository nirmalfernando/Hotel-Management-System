import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const authRole = (role) => {
  return (req, res, next) => {
    // Retrieve the JWT token from cookies or Authorization header
    const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json("Access token required");

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json("Invalid token");

      req.user = user; // Attach the user info from the JWT payload to req.user

      if (req.user.role !== role) {
        return res.status(403).json("You do not have permission to access this resource");
      }

      next();
    });
  };
};
