import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.status = false;
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }; 
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
