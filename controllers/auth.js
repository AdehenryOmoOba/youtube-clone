import YoutubeUsersModel from "../models/YoutubeUsers.js";
import bcrypt from "bcrypt";
import { createError } from "../customErrors.js";
import jwt from "jsonwebtoken";

export const authController = (req, res) => {
  res.send(
    `<h1 style="color:blue; text-align:center; font-family:verdana;">Authentication</h1>`
  );
};

// Sign up
export const signUpController = async (req, res, next) => {
  const { password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new YoutubeUsersModel({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();
    res.json({ success: "New user created successfully!" });
  } catch (error) {
    next(createError(error.status, error.message));
  }
};

// Sign in
export const signInController = async (req, res, next) => {
  const { username } = req.body;
  let matchPassword;

  try {
    const user = await YoutubeUsersModel.findOne({ name: username });
    if (!user) return next(createError(404, "user not found!"));
    matchPassword = await bcrypt.compare(req.body.password, user.password);
    if (!matchPassword) return next(createError(400, "Incorrect Password"));

    const { password, ...others } = user._doc;

    const token = jwt.sign(
      { id: user._id, username: others.name },
      process.env.JWT_SECRETE_STRING
    );
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(others);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

// Google sign in
export const gmailSignInController = async (req, res, next) => {
  try {
    const user = await YoutubeUsersModel.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, username: user.email },
        process.env.JWT_SECRETE_STRING
      );
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(user._doc);
    } else {
      console.log(req.body);
      const newUser = new YoutubeUsersModel({ ...req.body, fromGoogle: true });
      const savedUser = await newUser.save();
      const token = jwt.sign(
        { id: user._id, email: savedUser.email },
        process.env.JWT_SECRETE_STRING
      );
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (error) {
    next(error);
  }
};
