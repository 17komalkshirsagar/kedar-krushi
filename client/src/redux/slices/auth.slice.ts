import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apis/auth.api";
import { IAdmin } from "../../models/admin.interface";

interface InitialState {
    admin: IAdmin | null
    sessionExpiredOpen: boolean
}

const initialState: InitialState = {
    admin: localStorage.getItem("admin")
        ? JSON.parse(localStorage.getItem("admin") as string)
        : null,
    sessionExpiredOpen: false
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        logoutAdmin: (state) => {
            state.admin = null
            localStorage.removeItem("admin")
        },
        openSessionExpiredModal: (state) => {
            state.sessionExpiredOpen = true
        },
        closeSessionExpiredModal: (state) => {
            state.sessionExpiredOpen = false
        }
    },
    extraReducers: builder => builder

        .addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, { payload }) => {
            state.admin = payload.result
        })
        .addMatcher(authApi.endpoints.signOut.matchFulfilled, (state) => {
            state.admin = null
        })
})

export const {
    logoutAdmin,
    openSessionExpiredModal,
    closeSessionExpiredModal
} = authSlice.actions

export default authSlice.reducer

export type { InitialState }