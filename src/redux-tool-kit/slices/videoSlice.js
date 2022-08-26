import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  video: null,
  error: "",
};

const videoSlice = createSlice({
  name: "video",
  initialState: initialState,
  reducers: {
    fetchVideo: (state) => {
      state.loading = true;
      state.video = null;
      state.error = "";
    },
    fetchVideoSuccess: (state, action) => {
      state.loading = false;
      state.video = action.payload;
      state.error = "";
    },
    fetchVideoFailure: (state, action) => {
      state.loading = false;
      state.video = null;
      state.error = action.payload;
    },
    likeVideoSuccess: (state, action) => {
      state.video.likes = action.payload.likes;
      state.video.dislikes = action.payload.dislikes;
    },
    dislikeVideoSuccess: (state, action) => {
      state.video.dislikes = action.payload.dislikes;
      state.video.likes = action.payload.likes;
    },
  },
});

export default videoSlice.reducer;
export const {
  fetchVideo,
  fetchVideoSuccess,
  fetchVideoFailure,
  likeVideoSuccess,
  dislikeVideoSuccess,
} = videoSlice.actions;
