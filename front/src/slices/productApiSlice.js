import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";
import products from '../data/products';

const ProductApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            queryFn: () => {
                return { data: products };
            },
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getProductDetails: builder.query({
            queryFn: (productId) => {
                const product = products.find(p => p._id === productId);
                if (product) {
                    return { data: product };
                }
                return { error: { status: 404, data: 'Product not found' } };
            },
            keepUnusedDataFor: 5
        }),
        getTopProducts: builder.query({
            queryFn: () => {
                const topProducts = [...products]
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 3);
                return { data: topProducts };
            },
            keepUnusedDataFor: 5,
        }),
    })
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useGetTopProductsQuery } = ProductApiSlice;
export default ProductApiSlice;
