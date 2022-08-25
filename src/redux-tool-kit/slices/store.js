import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import videoReducer from "./videoSlice";

const store = configureStore({
  reducer: {
    userReducer,
    videoReducer,
  },
});

export default store;
