import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseApi,
  endpoints: (builder) => ({
    getCartItems: builder.query({
      query: () => ({
        url: "/api/cart",
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    AddToCart: builder.mutation({
      query: (payload) => ({
        url: "/api/cart",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["cart"],
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/api/cart/${id}`,
        method: "Delete",
      }),
      invalidatesTags: ["cart"],
    }),
    updateQuantity: builder.mutation({
      query: (payload) => ({
        url: `/api/cart/${payload?._id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["cart"],
    }),
  }),
  tagTypes: ["cart"],
});

export const {
  useGetCartItemsQuery,
  useAddToCartMutation,
  useUpdateQuantityMutation,
  useRemoveFromCartMutation,
} = cartApi;
