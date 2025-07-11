import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react"
import { IAdmin } from "../../models/admin.interface"
import { RootState } from "../store"
import { logoutAdmin, openSessionExpiredModal } from "../slices/auth.slice";
console.log("VITE_BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`,
    credentials: "include",
    prepareHeaders(headers, { getState }) {
        const state = getState() as RootState;
        const token = state.auth.admin?.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const customBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const response = await baseQuery(args, api, extraOptions);

    if (response.error?.status === 401) {
        const errorData = response.error.data as { message?: string };
        if (errorData?.message === "Session has expired. Please log in again.") {
            api.dispatch(logoutAdmin());
            api.dispatch(openSessionExpiredModal())
        }
    }

    return response;
};

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: customBaseQuery,
    endpoints: (builder) => {
        return {
            signIn: builder.mutation<{ message: string, result: IAdmin }, { email: string, password: string }>({
                query: userData => {
                    return {
                        url: "/sign-in",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: (data: { message: string, result: IAdmin }) => {
                    localStorage.setItem("admin", JSON.stringify(data.result))
                    return data
                },
                transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                    return error.data?.message
                }
            }),

            signOut: builder.mutation<string, void>({
                query: () => {
                    return {
                        url: "/sign-out",
                        method: "POST",
                    }
                },
                transformResponse: (data: { message: string }) => {
                    localStorage.removeItem("admin")
                    return data.message
                },
                transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                    return error.data?.message
                }
            }),

            sendOTP: builder.mutation<string, { adminName: string }>({
                query: (username) => {
                    return {
                        url: "/send-otp",
                        method: "POST",
                        body: username
                    }
                },
                transformResponse: (data: { message: string }) => {
                    return data.message
                },
                transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                    return error.data?.message
                }
            }),

            verifyOTP: builder.mutation<string, { adminName: string, otp: string }>({
                query: (userData) => {
                    return {
                        url: "/verify-otp",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: (data: { message: string }) => {
                    return data.message
                },
                transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                    return error.data?.message
                }
            }),

            forgotPassword: builder.mutation<string, string>({
                query: (email) => {
                    return {
                        url: "/forgot-password",
                        method: "POST",
                        body: { email }
                    }
                },
                transformResponse: (data: { message: string }) => {
                    return data.message
                },
                transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                    return error.data?.message
                }
            }),

            resetPassword: builder.mutation<string, { password: string, confirmPassword: string, token: string }>({
                query: (passwordData) => {
                    return {
                        url: "/reset-password",
                        method: "PUT",
                        body: passwordData
                    }
                },
                transformResponse: (data: { message: string }) => {
                    return data.message
                },
                transformErrorResponse: (error: { status: number, data: { message: string } }) => {
                    return error.data?.message
                }
            }),

            register: builder.mutation<
                { message: string; result: IAdmin },
                {
                    firstName: string;
                    lastName: string;
                    email: string;
                    phone: string;
                    password: string;
                    confirmPassword: string;
                }>({
                    query: (newUser) => ({
                        url: "/register",
                        method: "POST",
                        body: newUser,
                    }),
                    transformResponse: (data: { message: string; result: IAdmin }) => data,
                    transformErrorResponse: (error: { status: number; data: { message: string } }) => {
                        return error.data?.message || "Registration failed";
                    },
                }),


            continueWithGoogle: builder.mutation({
                query: (googleData) => ({
                    url: "/continue-with-google",
                    method: "POST",
                    body: googleData,
                }),
                transformResponse: (data: { message: string; result: IAdmin }) => {
                    localStorage.setItem("admin", JSON.stringify(data.result));
                    return data;
                },
                transformErrorResponse: (error: { status: number; data: { message: string } }) => {
                    return error.data?.message || "Google login failed";
                },
            }),


        }
    }
})

export const {
    useSignInMutation,
    useSignOutMutation,
    useSendOTPMutation,
    useVerifyOTPMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useRegisterMutation, useContinueWithGoogleMutation

} = authApi
