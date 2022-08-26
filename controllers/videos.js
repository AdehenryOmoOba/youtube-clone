import { createError } from "../customErrors.js";
import VideoModel from "../models/Video.js";
import YoutubeUsersModel from "../models/YoutubeUsers.js";

export const getAllVideosController = async (req, res, next) => {
  try {
    const allVideos = await VideoModel.find({});
    res.status(200).json(allVideos);
  } catch (error) {
    next(error);
  }
};

export const getVideoController = async (req, res, next) => {
  try {
    const videoInfo = await VideoModel.findById(req.params.id);
    res.status(200).json(videoInfo);
  } catch (error) {
    next(error);
  }
};

export const addVideoController = async (req, res, next) => {
  try {
    const newVideo = new VideoModel({ userId: req.userInfo.id, ...req.body });
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};

export const updateVideoController = async (req, res, next) => {
  try {
    const videoInfo = await VideoModel.findById(req.params.id);
    if (!videoInfo) return next(createError(404, "Video not found!"));
    if (req.userInfo.id !== videoInfo.userId) {
      return next(
        createError(403, "You are not authorised to update this video!")
      );
    }

    const updatedVideo = await VideoModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedVideo);
  } catch (error) {
    next(error);
  }
};

export const deleteVideoController = async (req, res, next) => {
  try {
    const videoInfo = await VideoModel.findById(req.params.id);
    if (!videoInfo) return next(createError(404, "Video not found!"));
    if (req.userInfo.id !== videoInfo.userId) {
      return next(
        createError(403, "You are not authorised to delete this video!")
      );
    }
    await VideoModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ videoDeleteSuccess: "Video deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

export const randomVideosController = async (req, res, next) => {
  try {
    const videos = await VideoModel.aggregate([{ $sample: { size: 4 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const subscribedVideosController = async (req, res, next) => {
  try {
    const user = await YoutubeUsersModel.findById(req.userInfo.id);
    const subscribedList = user.subscribedUsers;

    const subscribedVideosList = await Promise.all(
      subscribedList.map((channeelId) => {
        return VideoModel.find({ userId: channeelId });
      })
    );

    res
      .status(200)
      .json(
        subscribedVideosList.flat(1).sort((a, b) => b.createdAt - a.createdAt)
      );
  } catch (error) {
    next(error);
  }
};

export const searchByTagsController = async (req, res, next) => {
  try {
    console.log(req.query.tags.toLowerCase());
    const tagsArray = req.query.tags.toLowerCase().split(",");
    const videos = await VideoModel.find({
      tags: { $in: tagsArray },
    }).limit(20);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const searchByTitleController = async (req, res, next) => {
  try {
    const queryString = req.query.q;
    const videos = await VideoModel.find({
      title: { $regex: queryString, $options: "i" },
    }).limit(30);
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const addViewsController = async (req, res, next) => {
  try {
    await VideoModel.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
    res.status(200).json({ success: "Views has been incremented" });
  } catch (error) {
    next(error);
  }
};

export const trendVideoController = async (req, res, next) => {
  try {
    const video = await VideoModel.find({}).sort({ views: -1 });
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};
