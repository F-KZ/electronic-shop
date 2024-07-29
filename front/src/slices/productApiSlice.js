import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";




const ProductApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
       getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),
        getProductDetails : builder.query({
            query : (productId) => ({
                url : `${PRODUCTS_URL}/${productId}`,
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }),
            keepUnusedDataFor : 5
        }),
        getTopProducts: builder.query({
      query: () => `${PRODUCTS_URL}/top`,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      keepUnusedDataFor: 5,
    }),

    })
})

export const { useGetProductsQuery, useGetProductDetailsQuery,  useGetTopProductsQuery } = ProductApiSlice;
export default ProductApiSlice;
