import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseApi,
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload) => ({
        url: "/login",
        method: "POST",
        body: payload,
      }),
    }),
    register: build.mutation({
      query: (payload) => ({
        url: "/register",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
