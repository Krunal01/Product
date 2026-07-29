import { createApi } from "@reduxjs/toolkit/query/react";
import { baseApi } from "../baseApi";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseApi,
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (payload) => ({
        url: "/api/product/add",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["product"],
    }),
    getProducts: builder.query({
      query: () => ({
        url: "/api/product/",
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/api/product/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "product", id }],
    }),
  }),
  tagTypes: ["product"],
});

export const {
  useGetProductByIdQuery,
  useAddProductMutation,
  useGetProductsQuery,
} = productApi;
