import jwt from "jsonwebtoken";

export default function verifyJWT(req, res, next) {
  const header = req.headers["authorization"]; // Correct header access

  if (!header) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = header.replace("Bearer ", "");

  jwt.verify(token, "random456", (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    req.user = decoded; // Attach decoded token to request
    next(); // Only proceed if token is valid
  });
}
