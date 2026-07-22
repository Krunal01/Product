import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { authApi } from "./apis/authApi";
import { profileApi } from "./apis/profileApi";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware),
});

export default store;
