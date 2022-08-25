import express from "express";
import { homePageController } from "../controllers/home.js";

export const router = express.Router();

router.get("/", homePageController);
