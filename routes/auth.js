import express from "express";
import {
  authController,
  signUpController,
  signInController,
  gmailSignInController,
} from "../controllers/auth.js";

export const router = express.Router();

router.get("/", authController);

// Sign up
router.post("/signup", signUpController);

// Sign in
router.post("/signin", signInController);

// Google sign in
router.post("/google-signin", gmailSignInController);
