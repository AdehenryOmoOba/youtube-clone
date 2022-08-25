import express from "express";
import {
  addVideoController,
  addViewsController,
  deleteVideoController,
  getVideoController,
  randomVideosController,
  subscribedVideosController,
  trendVideoController,
  updateVideoController,
  getAllVideosController,
  searchByTagsController,
  searchByTitleController,
} from "../controllers/videos.js";
import { verifyToken } from "../verify.js";

export const router = express.Router();

router.get("/find/:id", getVideoController);
router.post("/", verifyToken, addVideoController);
router.put("/:id", verifyToken, updateVideoController);
router.delete("/:id", verifyToken, deleteVideoController);
router.get("/", getAllVideosController);
router.put("/view:id", addViewsController);
router.get("/random", randomVideosController);
router.get("/trend", trendVideoController);
router.get("/subscribed", verifyToken, subscribedVideosController);
router.get("/search-by-tags", searchByTagsController);
router.get("/search-by-title", searchByTitleController);
