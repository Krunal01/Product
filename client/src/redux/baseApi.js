import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { logout } from "./slices/authSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
export const baseApi = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    api.dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/login");
  }
  return result;
};
