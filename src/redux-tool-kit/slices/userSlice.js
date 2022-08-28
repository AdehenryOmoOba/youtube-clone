import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    fetchUser: (state) => {
      state.loading = true;
      state.user = null;
      state.error = "";
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    },
    fetchUserFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state = initialState;
    },
    subscription: (state, action) => {
      state.user.subscribedUsers = action.payload;
    },
  },
});

export default userSlice.reducer;
export const {
  fetchUser,
  fetchUserSuccess,
  fetchUserFailure,
  logout,
  subscription,
} = userSlice.actions;
