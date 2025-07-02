
import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomBaseQuery } from "./customBaseQuery.api";
import { ICustomer } from "../../models/customer.interface";
import { IPagination } from "../../models/pagination.interface";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/customer`;
const customBaseQuery = createCustomBaseQuery(baseUrl);

export const customerApi = createApi({
    reducerPath: "customerApi",
    baseQuery: customBaseQuery,
    tagTypes: ["Customer"],

    endpoints: (builder) => ({

        getAllCustomers: builder.query<{ result: ICustomer[]; pagination: IPagination }, Partial<{ page: number; limit: number; searchQuery: string }>>({
            query: (params) => ({
                url: "/customer/list",
                method: "GET",
                params
            }),
            transformResponse: (data: { result: ICustomer[]; pagination: IPagination }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            providesTags: ["Customer"]
        }),

        // Get customer by ID
        getCustomerById: builder.query<ICustomer, string>({
            query: (id) => ({
                url: `/customer/details/${id}`,
                method: "GET"
            }),
            transformResponse: (data: { result: ICustomer }) => data.result,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            providesTags: ["Customer"]
        }),

        // Create customer
        createAddCustomer: builder.mutation<{ message: string; result: ICustomer }, Partial<ICustomer>>({
            query: (body) => ({
                url: "/customer-create",
                method: "POST",
                body
            }),
            transformResponse: (data: { message: string; result: ICustomer }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["Customer"]
        }),

        // Update customer
        updateCustomer: builder.mutation<{ message: string; result: ICustomer }, { id: string; data: Partial<ICustomer> }>({
            query: ({ id, data }) => ({
                url: `/customer/update/${id}`,
                method: "PUT",
                body: data
            }),
            transformResponse: (data: { message: string; result: ICustomer }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["Customer"]
        }),

        // Delete customer
        deleteCustomer: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/customer-delete/${id}`,
                method: "DELETE"
            }),
            transformResponse: (data: { message: string; result: ICustomer }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["Customer"]
        }),

        // Update customer status
        updateCustomerStatus: builder.mutation<{ message: string; result: ICustomer }, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `/customer/status/${id}`,
                method: "PATCH",
                body: { status }
            }),
            transformResponse: (data: { message: string; result: ICustomer }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["Customer"]
        }),

        // Block customer
        blockCustomer: builder.mutation<{ message: string; result: ICustomer }, string>({
            query: (id) => ({
                url: `/customer/block/${id}`,
                method: "PATCH"
            }),
            transformResponse: (data: { message: string; result: ICustomer }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["Customer"]
        })
    })
});

export const {
    useGetAllCustomersQuery,
    useGetCustomerByIdQuery,
    useCreateAddCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
    useUpdateCustomerStatusMutation,
    useBlockCustomerMutation
} = customerApi;
