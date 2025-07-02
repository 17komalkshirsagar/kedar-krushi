

import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomBaseQuery } from "./customBaseQuery.api";
import { IDelivery } from "../../models/delivery.interface";
import { IPagination } from "../../models/pagination.interface";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/delivery`;
const customBaseQuery = createCustomBaseQuery(baseUrl);

export const deliveryApi = createApi({
    reducerPath: "deliveryApi",
    baseQuery: customBaseQuery,
    tagTypes: ["Delivery"],

    endpoints: (builder) => ({
        // Get all deliveries
        getAllDeliveries: builder.query<
            { result: IDelivery[]; pagination: IPagination },
            Partial<{ page: number; limit: number; searchQuery: string }>
        >({
            query: (params) => ({
                url: "/delivery/list",
                method: "GET",
                params,
            }),
            transformResponse: (data: { result: IDelivery[]; pagination: IPagination }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            providesTags: ["Delivery"],
        }),

        // Get a delivery by ID
        getDeliveryById: builder.query<IDelivery, string>({
            query: (id) => ({
                url: `/delivery/details/${id}`,
                method: "GET",
            }),
            transformResponse: (data: { result: IDelivery }) => data.result,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            providesTags: ["Delivery"],
        }),


        createAddDelivery: builder.mutation<{ message: string; result: IDelivery }, Partial<IDelivery>>({
            query: (body) => ({
                url: "/delivery-create",
                method: "POST",
                body,
            }),
            transformResponse: (data: { message: string; result: IDelivery }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["Delivery"],
        }),


        // Update a delivery
        updateDelivery: builder.mutation<
            { message: string; result: IDelivery },
            { id: string; data: Partial<IDelivery> }
        >({
            query: ({ id, data }) => ({
                url: `/delivery/update/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (data: { message: string; result: IDelivery }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["Delivery"],
        }),

        // Delete a delivery
        deleteDelivery: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/delivery/delivery-delete/${id}`,
                method: "DELETE",
            }),
            transformResponse: (data: { message: string }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["Delivery"],
        }),

        // Update delivery 

        updateDeliveryStatus: builder.mutation<{ message: string; result: IDelivery }, { id: string; data: Partial<IDelivery> }>(
            {
                query: ({ id, data }) => ({
                    url: `/delivery/status/${id}`,
                    method: "PATCH",
                    body: data,
                }),
                transformResponse: (data: { message: string; result: IDelivery }) => data,
                transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                    error.data?.message,
                invalidatesTags: ["Delivery"],
            }
        ),








        // Block/unblock delivery
        blockDelivery: builder.mutation<string, string>({
            query: (id) => ({
                url: `/delivery/block/${id}`,
                method: "PATCH",
            }),
            transformResponse: (data: { message: string }) => data.message,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["Delivery"],
        }),
    }),
});

export const {
    useGetAllDeliveriesQuery,
    useGetDeliveryByIdQuery,
    useCreateAddDeliveryMutation,
    useUpdateDeliveryMutation,
    useDeleteDeliveryMutation,
    useUpdateDeliveryStatusMutation,
    useBlockDeliveryMutation,
} = deliveryApi;



