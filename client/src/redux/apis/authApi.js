import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseApi,
  endpoints: (build) => ({
    login: build.mutation({
      query: (payload) => ({
        url: "/api/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
    register: build.mutation({
      query: (payload) => ({
        url: "/api/auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    changePassword: build.mutation({
      query: (payload) => ({
        url: "/api/auth/change-password",
        method: "POST",
        body: payload,
      }),
    }),
    forgotPassword: build.mutation({
      query: (payload) => ({
        url: "/api/auth/forgot-password",
        method: "POST",
        body: payload,
      }),
    }),
    verifyOTP: build.mutation({
      query: (payload) => ({
        url: "/api/auth/verify-otp",
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: build.mutation({
      query: (payload) => ({
        url: "/api/auth/reset-password",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
} = authApi;
