// src/redux/apis/payment.api.ts

import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomBaseQuery } from "./customBaseQuery.api";
import { IPagination } from "../../models/pagination.interface";
import { IPayment } from "../../models/payment.interface";
import { CreatePayment } from '../../models/payment.types';

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/payment`;
const customBaseQuery = createCustomBaseQuery(baseUrl);

export const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: customBaseQuery,
    tagTypes: ["payment"],
    endpoints: (builder) => ({
        getAllPayments: builder.query<
            { result: IPayment[]; pagination: IPagination },
            Partial<{ page: number; limit: number; searchQuery: string }>>({
                query: (params = {}) => ({
                    url: "/payment/list",
                    method: "GET",
                    params,
                }),
                transformResponse: (data: { result: IPayment[]; pagination: IPagination }) => data,
                transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                    error.data?.message,
                providesTags: ["payment"],
            }),

        getPaymentById: builder.query<IPayment, string>({
            query: (id) => ({
                url: `/payment/details/${id}`,
                method: "GET",
            }),
            transformResponse: (data: { result: IPayment }) => data.result,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            providesTags: ["payment"],
        }),

        // createPayment: builder.mutation<{ message: string; result: IPayment }, Partial<IPayment>>({
        createPayment: builder.mutation<{ message: string; result: IPayment }, CreatePayment>({
            query: (body) => ({
                url: "/payment/create",
                method: "POST",
                body,
            }),
            transformResponse: (data: { message: string; result: IPayment }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["payment"],
        }),

        updatePayment: builder.mutation<
            { message: string; result: IPayment },
            { id: string; data: Partial<IPayment> }
        >({
            query: ({ id, data }) => ({
                url: `/payment/update/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (data: { message: string; result: IPayment }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["payment"],
        }),

        deletePayment: builder.mutation<string, string>({
            query: (id) => ({
                url: `/payment/delete/${id}`,
                method: "DELETE",
            }),
            transformResponse: (data: { message: string }) => data.message,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["payment"],
        }),

        updatePaymentStatus: builder.mutation<string, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `/payment/status/${id}`,
                method: "PATCH",
                body: { status },
            }),
            transformResponse: (data: { message: string }) => data.message,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["payment"],
        }),

        blockPayment: builder.mutation<string, { id: string; block: boolean }>({
            query: ({ id, block }) => ({
                url: `/payment/block/${id}`,
                method: "PATCH",
                body: { block },
            }),
            transformResponse: (data: { message: string }) => data.message,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["payment"],
        }),

        getCustomerPaymentSummary: builder.query<IPayment, void>({
            query: () => ({
                url: "/summary",
                method: "GET",
            }),
            transformResponse: (data: { result: IPayment }) => data.result,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            providesTags: ["payment"],
        }),
        getCustomerPaymentHistory: builder.query<{ result: IPayment[]; totals: any; purchaseInfo: any; }, string>({
            query: (customerId) => ({
                url: `/payments/history/${customerId}`,
                method: "GET",
            }),
            transformResponse: (data: {
                result: IPayment[]; totals: any; purchaseInfo: any;
            }) => ({ result: data.result, totals: data.totals, purchaseInfo: data.purchaseInfo, }),
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            providesTags: ["payment"],
        }),


    }),
});

export const {
    useGetAllPaymentsQuery,
    useGetPaymentByIdQuery,
    useCreatePaymentMutation,
    useUpdatePaymentMutation,
    useDeletePaymentMutation,
    useUpdatePaymentStatusMutation,
    useBlockPaymentMutation, useGetCustomerPaymentHistoryQuery, useGetCustomerPaymentSummaryQuery
} = paymentApi;
