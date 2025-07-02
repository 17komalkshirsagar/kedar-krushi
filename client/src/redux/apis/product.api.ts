
import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomBaseQuery } from "./customBaseQuery.api";
import { IPagination } from "../../models/pagination.interface";
import { IProduct } from "../../models/product.interface";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/product`;
const customBaseQuery = createCustomBaseQuery(baseUrl);

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: customBaseQuery,
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<{ result: IProduct[]; pagination: IPagination }, Partial<{ page: number; limit: number; searchQuery: string }>>({
            query: (params = {}) => ({
                url: "/product/list",
                method: "GET",
                params,
            }),
            transformResponse: (data: { result: IProduct[]; pagination: IPagination }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            providesTags: ["Product"],
        }),

        getProductById: builder.query<IProduct, string>({
            query: (id) => ({
                url: `/product/details/${id}`,
                method: "GET",
            }),
            transformResponse: (data: { result: IProduct }) => data.result,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            providesTags: ["Product"],
        }),

        createAddProduct: builder.mutation<{ message: string; result: IProduct }, Partial<IProduct>>({
            query: (body) => ({
                url: "/product-create",
                method: "POST",
                body,
            }),
            transformResponse: (data: { message: string; result: IProduct }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["Product"],
        }),

        updateProduct: builder.mutation<{ message: string; result: IProduct }, { id: string; data: Partial<IProduct> }>({
            query: ({ id, data }) => ({
                url: `/product/update/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (data: { message: string; result: IProduct }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["Product"],
        }),

        deleteProduct: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/product-delete/${id}`,
                method: "DELETE",
            }),
            transformResponse: (data: { message: string }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["Product"],
        }),

        updateProductStatus: builder.mutation<{ message: string }, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `/product/status/${id}`,
                method: "PATCH",
                body: { status },
            }),
            transformResponse: (data: { message: string }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["Product"],
        }),

        blockProduct: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/product/block/${id}`,
                method: "PATCH",
            }),
            transformResponse: (data: { message: string }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["Product"],
        }),
        sellProduct: builder.mutation<{ message: string; result: IProduct }, Partial<IProduct>>({
            query: (body) => ({
                url: "/product/sell",
                method: "POST",
                body,
            }),
            transformResponse: (data: { message: string; result: IProduct }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["Product"],
        }),

    }),
});

export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useCreateAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useUpdateProductStatusMutation,
    useBlockProductMutation, useSellProductMutation
} = productApi;
