import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default function verifyJWT(req, res, next) {
  const header = req.headers["authorization"]; // Correct header access

  if (!header) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = header.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    req.user = decoded; // Attach decoded token to request
    next(); // Only proceed if token is valid
  });
}
