import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  postedAt: { type: String, default: new Date().toString() },
});

const BlogModel = mongoose.model("blogs", blogSchema);

export default BlogModel;
