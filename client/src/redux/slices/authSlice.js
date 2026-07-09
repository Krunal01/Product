import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    token: null,
  },
  reducers: {
    setLoginDetails: (state, action) => {
      state.data = action.payload.data;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.data = null;
      state.token = null;
    },
  },
});

export const { setLoginDetails, logout } = authSlice.actions;
export default authSlice.reducer;
