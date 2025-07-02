import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomBaseQuery } from "./customBaseQuery.api";
import { IBatch } from "../../models/batch.interface";
import { IPagination } from "../../models/pagination.interface";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/batch`;
const customBaseQuery = createCustomBaseQuery(baseUrl);

export const batchApi = createApi({
    reducerPath: "batchApi",
    baseQuery: customBaseQuery,
    tagTypes: ["batch"],
    endpoints: (builder) => ({
        getAllBatches: builder.query<{ result: IBatch[]; pagination: IPagination }, Partial<{ page: number; limit: number; productId?: string }>>({
            query: (queryParams = {}) => ({
                url: `/batch/list`,
                method: "GET",
                params: queryParams,
            }),
            transformResponse: (data: { result: IBatch[]; pagination: IPagination }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            providesTags: ["batch"],
        }),

        getBatchById: builder.query<IBatch, string>({
            query: (id) => ({
                url: `/batch/details/${id}`,
                method: "GET",
            }),
            transformResponse: (data: { result: IBatch }) => data.result,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            providesTags: ["batch"],
        }),

        addCreateBatch: builder.mutation<{ message: string; result: IBatch }, Partial<IBatch>>({
            query: (batchData) => ({
                url: `/batch-create`,
                method: "POST",
                body: batchData,
            }),
            transformResponse: (data: { message: string; result: IBatch }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["batch"],
        }),

        updateBatch: builder.mutation<string, { id: string; batchData: Partial<IBatch> }>({
            query: ({ id, batchData }) => ({
                url: `/batch/update/${id}`,
                method: "PUT",
                body: batchData,
            }),
            transformResponse: (data: { message: string }) => data.message,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["batch"],
        }),

        deleteBatch: builder.mutation<string, string>({
            query: (id) => ({
                url: `/batch-delete/${id}`,
                method: "DELETE",
            }),
            transformResponse: (data: { message: string }) => data.message,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["batch"],
        }),

        markBatchExpired: builder.mutation<string, string>({
            query: (id) => ({
                url: `/batch/mark-expired/${id}`,
                method: "PATCH",
            }),
            transformResponse: (data: { message: string }) => data.message,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["batch"],
        }),

        sellFromBatch: builder.mutation<string, { batchId: string; quantity: number }>({
            query: (batchData) => ({
                url: `/batch/sell`,
                method: "POST",
                body: batchData,
            }),
            transformResponse: (data: { message: string }) => data.message,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["batch"],
        }),

        sellProductFromOldestBatch: builder.mutation<string, { productId: string; quantity: number }>({
            query: (batchData) => ({
                url: `/batch/sell-from-oldest`,
                method: "POST",
                body: batchData,
            }),
            transformResponse: (data: { message: string }) => data.message,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["batch"],
        }),

        getExpiredBatches: builder.query<IBatch[], void>({
            query: () => ({
                url: `/batch/expired`,
                method: "GET",
            }),
            transformResponse: (data: { result: IBatch[] }) => data.result,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            providesTags: ["batch"],
        }),
    }),
});

export const {
    useGetAllBatchesQuery,
    useGetBatchByIdQuery,
    useUpdateBatchMutation,
    useAddCreateBatchMutation,
    useDeleteBatchMutation,
    useMarkBatchExpiredMutation,
    useSellFromBatchMutation,
    useSellProductFromOldestBatchMutation,                          //ProductTable.tsx
    useGetExpiredBatchesQuery,
} = batchApi;
