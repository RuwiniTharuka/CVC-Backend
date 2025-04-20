import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default function verifyJWT(req, res, next) {
  // header eka null nam error ekk throw krnn epa eka waradi.. header eka thiynm eka decode krnnwa nathm next kiyala
  // ilaga step ekt danwa ethakot token eka oni nathm oyata oni data fetch krla denwa
  const header = req.header("Authorization");
  if (header != null) {
    const token = header.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      console.log(decoded);
      if (decoded != null) {
        req.user = decoded;
      }
    });
  }
  next();
}
