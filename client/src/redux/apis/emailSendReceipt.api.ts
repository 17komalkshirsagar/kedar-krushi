

import { createApi } from "@reduxjs/toolkit/query/react";
import { createCustomBaseQuery } from "./customBaseQuery.api";
import { ISendReceiptEmail } from "../../models/sendReceiptEmail.interface";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/send-receipt`;
const customBaseQuery = createCustomBaseQuery(baseUrl);

export const sendReceiptApi = createApi({
    reducerPath: "sendReceiptApi",
    baseQuery: customBaseQuery,
    tagTypes: ["sendReceiptEmail"],

    endpoints: (builder) => ({

        sendReceiptEmail: builder.mutation<{ message: string; result: ISendReceiptEmail }, Partial<ISendReceiptEmail>>({
            query: (body) => ({
                url: "/send-receipt",
                method: "POST",
                body
            }),
            transformResponse: (data: { message: string; result: ISendReceiptEmail }) => data,
            transformErrorResponse: (error: { status: number; data: { message: string } }) =>
                error.data?.message,
            invalidatesTags: ["sendReceiptEmail"]
        }),

    })
});

export const {
    useSendReceiptEmailMutation } = sendReceiptApi;
