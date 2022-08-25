import dontenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import { router as homePageRouter } from "./routes/home.js";
import { router as authRouter } from "./routes/auth.js";
import { router as commentsRouter } from "./routes/comments.js";
import { router as usersRouter } from "./routes/users.js";
import { router as videosRouter } from "./routes/videos.js";
import { router as pageNotFoundRouter } from "./routes/pageNotFound.js";
import cookieParser from "cookie-parser";

if (process.env.NODE_ENV !== "production") dontenv.config();

const databaseURI = process.env.DB_URI;
const PORT = 4100;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(homePageRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/videos", videosRouter);
app.use("/*", pageNotFoundRouter);
// Error handler middleware
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const errorMsg = error.message || "Something went wrong!";
  return res.status(status).json({ status, errorMsg });
});

mongoose.connect(
  databaseURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(`Database connection error: ${err.message}`);
    } else {
      console.log("Connection to database successful");
      app.listen(process.env.PORT || PORT, () => {
        console.log(`Server running on port ${PORT}...`);
      });
    }
  }
);
