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
    updateProfile: build.mutation({
      query: (payload) => ({
        url: "/api/profile/update",
        method: "PUT",
        body: payload,
      }),
    }),
    changeEmail: build.mutation({
      query: (payload) => ({
        url: "/api/profile/update-email",
        method: "PUT",
        body: payload,
      }),
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
  useChangeEmailMutation,
  useUpdateProfileMutation,
  useSaveProfileImageMutation,
  useDeleteProfileImageMutation,
} = profileApi;
