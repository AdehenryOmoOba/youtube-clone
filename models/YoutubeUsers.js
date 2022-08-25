import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    img: { type: String },
    subscribers: { type: Number, default: 0 },
    subscribedUsers: { type: [String], default: [] },
    fromGoogle: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const YoutubeUsersModel = mongoose.model("youtube_users", usersSchema);

export default YoutubeUsersModel;
