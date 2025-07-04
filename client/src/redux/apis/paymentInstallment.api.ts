import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomBaseQuery } from "./customBaseQuery.api";

import { IPagination } from "../../models/pagination.interface";
import { CreateInstallment, IInstallment, UpdateInstallment } from "../../models/paymentInstallment.interface";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment-installment`;
const customBaseQuery = createCustomBaseQuery(baseUrl);

export const paymentInstallmentApi = createApi({
    reducerPath: "paymentInstallmentApi",
    baseQuery: customBaseQuery,
    tagTypes: ["installment"],
    endpoints: (builder) => ({

        // Create Installment
        createInstallment: builder.mutation<{ message: string; result: IInstallment }, CreateInstallment>({
            query: (body) => ({
                url: "/installment/create",
                method: "POST",
                body,
            }),
            transformResponse: (data: { message: string; result: IInstallment }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["installment"],
        }),

        // Get All Installments with Pagination and Search
        getAllInstallments: builder.query<{ result: IInstallment[]; pagination: IPagination }, Partial<{ page: number; limit: number; searchQuery: string }>>({
            query: (params = {}) => ({
                url: "/installment/list",
                method: "GET",
                params,
            }),
            transformResponse: (data: { result: IInstallment[]; pagination: IPagination }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            providesTags: ["installment"],
        }),

        getInstallmentById: builder.query<IInstallment, string>({
            query: (id) => ({
                url: `/installment/details/${id}`,
                method: "GET",
            }),
            transformResponse: (data: { result: IInstallment }) => data.result,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            providesTags: ["installment"],

        }),

        // Update Installment
        updateInstallment: builder.mutation<{ message: string; result: IInstallment }, { id: string; data: UpdateInstallment }>({
            query: ({ id, data }) => ({
                url: `/installment/update/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (data: { message: string; result: IInstallment }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["installment"],
        }),

        // Delete Installment
        deleteInstallment: builder.mutation<string, string>({
            query: (id) => ({
                url: `/installment/delete/${id}`,
                method: "DELETE",
            }),
            transformResponse: (data: { message: string }) => data.message,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["installment"],
        }),

        // Get Installments By Customer ID
        getInstallmentsByCustomer: builder.query<{ message: string; result: IInstallment[] }, string>({
            query: (id) => ({
                url: `/installment/customer/${id}`,
                method: "GET",
            }),
            transformResponse: (data: { message: string; result: IInstallment[] }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            providesTags: ["installment"],
        }),

        // Block/Unblock Installment
        toggleInstallmentBlock: builder.mutation<{ message: string; result: IInstallment }, string>({
            query: (id) => ({
                url: `/installment/block/${id}`,
                method: "PUT",
            }),
            transformResponse: (data: { message: string; result: IInstallment }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) => error.data?.message,
            invalidatesTags: ["installment"],
        }),

    }),
});

export const {
    useCreateInstallmentMutation,
    useGetAllInstallmentsQuery,
    useGetInstallmentByIdQuery,
    useUpdateInstallmentMutation,
    useDeleteInstallmentMutation,
    useGetInstallmentsByCustomerQuery,
    useToggleInstallmentBlockMutation,
} = paymentInstallmentApi;
