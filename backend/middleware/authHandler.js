import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authHandler = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const [, token] = req.headers.authorization.split(" ");

      const { _id } = jwt.verify(token, process.env.JWT_SECRET);

      let user = await User.findById(_id).select("-password");
      req.user = user;
      next();
    } catch (error) {
      res.statusCode = 401;
      throw new Error("Unauthorized");
    }
  } else {
    res.statusCode = 401;
    throw new Error("Unauthorized");
  }
});

export const adminHandler = asyncHandler((req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.statusCode = 403;
    throw new Error("Forbidden");
  }
});
