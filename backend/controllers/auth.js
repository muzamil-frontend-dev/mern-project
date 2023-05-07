import User from "../models/user.js";
import asyncHandler from "express-async-handler";

// path     /api/auth/login
// type     Post
// Access   Public
// Desc     Login Existing User
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.statusCode = 400;
    throw new Error("Invalid email or password");
  }

  if (!(await user.ValidatePassword(password))) {
    res.statusCode = 400;
    throw new Error("Invalid email or password");
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: user.CreateToken(),
  });
});

// path     /api/auth/register
// type     Post
// Access   Public
// Desc     Register New User
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password,
  });

  const createdUser = await user.save();

  res.json({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
    token: createdUser.CreateToken(),
  });
});

// path     /api/auth/updateUser
// type     Put
// Access   Public
// Desc     Update Existing User
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (user) {
    const { name, password } = req.body;

    user.name = name;
    user.password = password;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: updatedUser.CreateToken(),
    });
  } else {
    res.statusCode = 404;
    throw new Error("User not Found.");
  }
});
