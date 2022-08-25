import express from "express";
import { pageNotFoundController } from "../controllers/pageNotFound.js";

export const router = express.Router();

router.get("/*", pageNotFoundController);
