import config from "../config/config.js";
import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const accessToken = req.header("x-auth-token");
  if (!accessToken)
    return res
      .status(401)
      .send("Access denied. No token provided. Please login!");

  try {
    const payload = jwt.verify(accessToken, config.secretKey);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
}
