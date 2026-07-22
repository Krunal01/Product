import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export const profileApi = createApi({
  reducerPath: "profile",
  baseQuery: baseApi,
  endpoints: (build) => ({
    myProfile: build.query({
      query: () => ({
        url: "/api/profile",
        method: "GET",
      }),
    }),
  }),
  tagTypes: ["profile"],
});

export const { useMyProfileQuery } = profileApi;
