import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT;

// Middleware to verify the token and extract user information
export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied. No Token provided" });
  }

  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  }
  catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ message: "Unable to verify token", error: error.message });
  }
}  

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next ) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only" });
  }
  next();
}

// Middleware to check if the user is the owner of the account or an admin
export const isOwnerOrAdmin = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.id !== parseInt(req.params.id)) {
    return res.status(403).json({ message: "Access denied. Admin or Owner only" });
  }
  next();
}