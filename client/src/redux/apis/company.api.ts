import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomBaseQuery } from "./customBaseQuery.api";
import { IPagination } from "../../models/pagination.interface";
import { ICompany } from "../../models/company.interface";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/company`;
const customBaseQuery = createCustomBaseQuery(baseUrl);

export const companyApi = createApi({
    reducerPath: "companyApi",
    baseQuery: customBaseQuery,
    tagTypes: ["company"],
    endpoints: (builder) => ({
        getAllCompanies: builder.query<{ result: ICompany[], pagination: IPagination }, Partial<{ page: number; limit: number; searchQuery: string }>>({
            query: (queryParams = {}) => ({
                url: "/list",
                method: "GET",
                params: queryParams
            }),
            transformResponse: (data: { result: ICompany[], pagination: IPagination }) => data,
            transformErrorResponse: (error: { status: number, data: { message: string } }) => error.data?.message,
            providesTags: ["company"],
        }),

        getCompanyById: builder.query<ICompany, string>({
            query: (id) => ({
                url: `/details/${id}`,
                method: "GET",
            }),
            transformResponse: (data: { result: ICompany }) => data.result,
            transformErrorResponse: (error: { status: number, data: { message: string } }) => error.data?.message,
            providesTags: ["company"],
        }),

        addcreateCompany: builder.mutation<{ message: string, result: ICompany }, FormData>({
            query: (companyData) => ({
                url: "/create",
                method: "POST",
                body: companyData,
            }),
            transformResponse: (data: { message: string, result: ICompany }) => data,
            transformErrorResponse: (error: { status: number, data: { message: string } }) => error.data?.message,
            invalidatesTags: ["company"],
        }),

        updateCompany: builder.mutation<string, { id: string, companyData: FormData }>({
            query: ({ id, companyData }) => ({
                url: `/update/${id}`,
                method: "PUT",
                body: companyData,
            }),
            transformResponse: (data: { message: string }) => data.message,
            transformErrorResponse: (error: { status: number, data: { message: string } }) => error.data?.message,
            invalidatesTags: ["company"],
        }),

        updateCompanyStatus: builder.mutation<string, { id: string, status: string }>({
            query: ({ id, status }) => ({
                url: `/status/${id}`,
                method: "PATCH",
                body: { status },
            }),
            transformResponse: (data: { message: string }) => data.message,
            transformErrorResponse: (error: { status: number, data: { message: string } }) => error.data?.message,
            invalidatesTags: ["company"],
        }),

        blockCompany: builder.mutation<string, string>({
            query: (id) => ({
                url: `/company/status/${id}`,
                method: "PATCH",
            }),
            transformResponse: (data: { message: string }) => data.message,
            transformErrorResponse: (error: { status: number, data: { message: string } }) => error.data?.message,
            invalidatesTags: ["company"],
        }),

        deleteCompany: builder.mutation<string, string>({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE",
            }),
            transformResponse: (data: { message: string }) => data.message,
            transformErrorResponse: (error: { status: number, data: { message: string } }) => error.data?.message,
            invalidatesTags: ["company"],
        }),
    }),
});

export const {
    useGetAllCompaniesQuery,
    useGetCompanyByIdQuery,
    useAddcreateCompanyMutation,
    useUpdateCompanyMutation,
    useUpdateCompanyStatusMutation,
    useBlockCompanyMutation,
    useDeleteCompanyMutation,
} = companyApi;
