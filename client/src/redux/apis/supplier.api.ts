import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomBaseQuery } from "./customBaseQuery.api";
import { IPagination } from "../../models/pagination.interface";
import { ISupplier } from "../../models/supplier.interface";
import { IProduct } from "../../models/product.interface";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/supplier`;
const customBaseQuery = createCustomBaseQuery(baseUrl);

export const supplierApi = createApi({
    reducerPath: "supplierApi",
    baseQuery: customBaseQuery,
    tagTypes: ["Supplier"],
    endpoints: (builder) => ({
        getAllSuppliers: builder.query<{ result: ISupplier[]; pagination: IPagination }, Partial<{ page: number; limit: number; searchQuery: string }>>({
            query: (params = {}) => ({
                url: "/supplier/list",
                method: "GET",
                params,
            }),
            transformResponse: (data: { result: ISupplier[]; pagination: IPagination }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            providesTags: ["Supplier"],
        }),

        getSupplierById: builder.query<ISupplier, string>({
            query: (id) => ({
                url: `/supplier/details/${id}`,
                method: "GET",
            }),
            transformResponse: (data: { result: ISupplier }) => data.result,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            providesTags: ["Supplier"],
        }),

        getSupplierWithProducts: builder.query<{ supplier: ISupplier; products: IProduct[] }, string>({
            query: (id) => ({
                url: `/supplier/with-products/${id}`,
                method: "GET",
            }),
            transformResponse: (data: { supplier: ISupplier; products: IProduct[] }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            providesTags: ["Supplier"],
        }),

        createAddSupplier: builder.mutation<{ message: string; result: ISupplier }, Partial<ISupplier>>({
            query: (body) => ({
                url: "/supplier-create",
                method: "POST",
                body,
            }),
            transformResponse: (data: { message: string; result: ISupplier }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["Supplier"],
        }),

        updateSupplier: builder.mutation<{ message: string; result: ISupplier }, { id: string; data: Partial<ISupplier> }>({
            query: ({ id, data }) => ({
                url: `/supplier/update/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (data: { message: string; result: ISupplier }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["Supplier"],
        }),

        deleteSupplier: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/supplier-delete/${id}`,
                method: "DELETE",
            }),
            transformResponse: (data: { message: string }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["Supplier"],
        }),

        updateSupplierStatus: builder.mutation<{ message: string }, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `/supplier/status/${id}`,
                method: "PATCH",
                body: { status },
            }),
            transformResponse: (data: { message: string }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["Supplier"],
        }),

        blockSupplier: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/supplier/block/${id}`,
                method: "PATCH",
            }),
            transformResponse: (data: { message: string }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["Supplier"],
        }),
    }),
});

export const {
    useGetAllSuppliersQuery,
    useGetSupplierByIdQuery,
    useGetSupplierWithProductsQuery,
    useCreateAddSupplierMutation,
    useUpdateSupplierMutation,
    useDeleteSupplierMutation,
    useUpdateSupplierStatusMutation,
    useBlockSupplierMutation,
} = supplierApi;
