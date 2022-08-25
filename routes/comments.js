import express from "express";
import {
  getAllCommentsController,
  deleteCommentsController,
  addCommentsController,
} from "../controllers/comments.js";
import { verifyToken } from "../verify.js";

export const router = express.Router();

router.post("/", verifyToken, addCommentsController);
router.get("/:videoId", getAllCommentsController);
router.delete("/:id", verifyToken, verifyToken, deleteCommentsController);
