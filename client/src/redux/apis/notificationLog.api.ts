import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomBaseQuery } from "./customBaseQuery.api";
import { INotificationLog } from "../../models/notificationLog.interface";
import { IPagination } from "../../models/pagination.interface";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/notification-log`;
const customBaseQuery = createCustomBaseQuery(baseUrl);

export const notificationLogApi = createApi({
    reducerPath: "notificationLogApi",
    baseQuery: customBaseQuery,
    tagTypes: ["NotificationLog"],
    endpoints: (builder) => ({
        // Get all logs

        getNotificationLogs: builder.query<{ result: INotificationLog[], pagination: IPagination }, Partial<{ page: number, limit: number, searchQuery: string, isFetchAll: boolean, selectedUser: string }>>({
            query: (queryParams = {}) => {
                return {
                    url: "/notification-log/list",
                    method: "GET",
                    params: queryParams
                }
            },
            transformResponse: (data: { result: INotificationLog[], pagination: IPagination }) => {
                return data
            },
            transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                return error.data?.message
            },
            providesTags: ["NotificationLog"]
        }),


        // Get by ID
        getNotificationLogById: builder.query<INotificationLog, string>({
            query: (id) => ({
                url: `/notification-log/details/${id}`,
                method: "GET",
            }),
            transformResponse: (data: { result: INotificationLog }) => data.result,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            providesTags: ["NotificationLog"],
        }),

        // Create
        createNotificationLog: builder.mutation<{ message: string; result: INotificationLog }, Partial<INotificationLog>>({
            query: (body) => ({
                url: "/notification-log/create",
                method: "POST",
                body,
            }),
            transformResponse: (data: { message: string; result: INotificationLog }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message, invalidatesTags: ["NotificationLog"],
        }),


        // Update
        updateNotificationLog: builder.mutation<{ message: string; result: INotificationLog }, { id: string; data: Partial<INotificationLog> }>({
            query: ({ id, data }) => ({
                url: `/notification-log/update/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (data: { message: string; result: INotificationLog }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["NotificationLog"],
        }),

        // Delete
        deleteNotificationLog: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/notification-log/delete/${id}`,
                method: "DELETE",
            }),
            transformResponse: (data: { message: string; result: INotificationLog }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["NotificationLog"],
        }),

        // Update status
        updateNotificationLogStatus: builder.mutation<{ message: string }, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `/notification-log/status/${id}`,
                method: "PATCH",
                body: { status },
            }),
            transformResponse: (data: { message: string; result: INotificationLog }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["NotificationLog"],
        }),

        // Block log
        blockNotificationLog: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/notification-log/block/${id}`,
                method: "PATCH",
            }),
            transformResponse: (data: { message: string; result: INotificationLog }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["NotificationLog"],
        }),
        sendReminder: builder.mutation<{ message: string; result: INotificationLog }, Partial<INotificationLog>>({
            query: (body) => ({
                url: "/notification-log/send",
                method: "POST",
                body,
            }),
            transformResponse: (data: { message: string; result: INotificationLog }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message, invalidatesTags: ["NotificationLog"],
        }),
        getReminderHistory: builder.query<{ message: string; result: INotificationLog }, Partial<INotificationLog>>({
            query: (customerId) => {
                return {
                    url: `/notification-log/history/${customerId}`,
                    method: "GET",

                }
            },
            transformResponse: (data: { message: string; result: INotificationLog }) => data,
            transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                return error.data?.message
            },
            providesTags: ["NotificationLog"]
        }),
    }),
});

export const {
    useGetNotificationLogsQuery,
    useGetNotificationLogByIdQuery,
    useCreateNotificationLogMutation,
    useUpdateNotificationLogMutation,
    useDeleteNotificationLogMutation,
    useUpdateNotificationLogStatusMutation,
    useBlockNotificationLogMutation, useSendReminderMutation,
    useGetReminderHistoryQuery,
} = notificationLogApi;

