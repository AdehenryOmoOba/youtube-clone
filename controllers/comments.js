import { createError } from "../customErrors.js";
import CommentsModel from "../models/comments.js";
import VideoModel from "../models/Video.js";

export const addCommentsController = async (req, res, next) => {
  try {
    const comment = new CommentsModel({ ...req.body, userId: req.userInfo.id });
    console.log({ ...req.body, userId: req.userInfo.id });
    const savedComment = await comment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    next(error);
  }
};

export const deleteCommentsController = async (req, res, next) => {
  try {
    const comment = await CommentsModel.findById(req.params.id);
    const video = await VideoModel.findById(req.params.id);

    if (
      req.userInfo.id === comment.userId ||
      req.userInfo.id === video.userId
    ) {
      await CommentsModel.findByIdAndDelete(comment.id);
      res.status(200).json({ success: "Comment deleted successfully" });
    } else {
      return next(
        createError(403, "You can only delete comments posted by you!")
      );
    }
  } catch (error) {
    next(error);
  }
};

export const getAllCommentsController = async (req, res, next) => {
  try {
    const comments = await CommentsModel.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
