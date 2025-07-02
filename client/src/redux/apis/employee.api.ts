
import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomBaseQuery } from "./customBaseQuery.api";
import { IEmployee } from "../../models/employee.interface";
import { IPagination } from "../../models/pagination.interface";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/employee`;
const customBaseQuery = createCustomBaseQuery(baseUrl);

export const employeeApi = createApi({
    reducerPath: "employeeApi",
    baseQuery: customBaseQuery,
    tagTypes: ["Employee"],
    endpoints: (builder) => ({


        getAllEmployees: builder.query<{ result: IEmployee[], pagination: IPagination }, Partial<{ page: number, limit: number, searchQuery: string, isFetchAll: boolean, selectedUser: string }>>({
            query: (queryParams = {}) => {
                return {
                    url: "/employee/list",
                    method: "GET",
                    params: queryParams
                }
            },
            transformResponse: (data: { result: IEmployee[], pagination: IPagination }) => {
                return data
            },
            transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                return error.data?.message
            },
            providesTags: ["Employee"]
        }),











        getEmployeeById: builder.query<IEmployee, string>({
            query: (id) => ({
                url: `/employee/details/${id}`,
                method: "GET",
            }),
            transformResponse: (response: { result: IEmployee }) => response.result,
            providesTags: ["Employee"],
        }),

        createAddEmployee: builder.mutation<{ message: string; result: IEmployee }, Partial<IEmployee>>({
            query: (body) => ({
                url: "/employee-create",
                method: "POST",
                body,
            }),
            transformResponse: (data: { message: string; result: IEmployee }) => data,
            invalidatesTags: ["Employee"],
        }),

        updateEmployee: builder.mutation<
            { message: string; result: IEmployee },
            { id: string; data: Partial<IEmployee> }
        >({
            query: ({ id, data }) => ({
                url: `/employee/update/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (data: { message: string; result: IEmployee }) => data,
            invalidatesTags: ["Employee"],
        }),

        deleteEmployee: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/employee-delete/${id}`,
                method: "DELETE",
            }),
            transformResponse: (data: { message: string }) => data,
            invalidatesTags: ["Employee"],
        }),



        updateEmployeeStatus: builder.mutation<{ message: string; result: IEmployee }, { id: string; data: Partial<IEmployee> }>(
            {
                query: ({ id, data }) => ({
                    url: `/employee/status/${id}`,
                    method: "PATCH",
                    body: data,
                }),
                transformResponse: (data: { message: string; result: IEmployee }) => data,
                transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                    error.data?.message,
                invalidatesTags: ["Employee"],
            }),



        blockEmployee: builder.mutation<string, string>({
            query: (id) => ({
                url: `/employee/block/${id}`,
                method: "PATCH",
            }),
            transformResponse: (data: { message: string }) => data.message,
            invalidatesTags: ["Employee"],
        }),
    }),
});

export const {
    useGetAllEmployeesQuery,
    useGetEmployeeByIdQuery,
    useCreateAddEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
    useUpdateEmployeeStatusMutation,
    useBlockEmployeeMutation,
} = employeeApi;
