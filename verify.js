import { createError } from "./customErrors.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not logged in!"));

  jwt.verify(token, process.env.JWT_SECRETE_STRING, (error, info) => {
    if (error) return next(createError(403, "Invalid token!"));
    req.userInfo = info;
  });

  next();
};
