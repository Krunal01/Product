import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export const profileApi = createApi({
  reducerPath: "profile",
  baseQuery: baseApi,
  tagTypes: ["profile"],
  endpoints: (build) => ({
    myProfile: build.query({
      query: () => ({
        url: "/api/profile",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    saveProfileImage: build.mutation({
      query: (payload) => ({
        url: "api/profile/image",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["profile"],
    }),
    deleteProfileImage: build.mutation({
      query: (payload) => ({
        url: `api/profile/image`,
        method: "DELETE",
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useMyProfileQuery,
  useSaveProfileImageMutation,
  useDeleteProfileImageMutation,
} = profileApi;
