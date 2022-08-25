import express from "express";
export const router = express.Router();
import {
  usersController,
  updateUserController,
  deleteUserController,
  getUserController,
  subscribeController,
  unsubscribeController,
  likeVideoController,
  dislikeVideoController,
} from "../controllers/users.js";
import { verifyToken } from "../verify.js";

router.get("/", usersController);

// update user
router.put("/:id", verifyToken, updateUserController);

// delete user
router.delete("/:id", verifyToken, deleteUserController);

// get a user
router.get("/find/:id", getUserController);

// subscribe a user
router.put("/sub/:id", verifyToken, subscribeController);

// unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribeController);

// like a video
router.put("/like/:videoId", verifyToken, likeVideoController);

// dislike a video
router.put("/dislike/:videoId", verifyToken, dislikeVideoController);
