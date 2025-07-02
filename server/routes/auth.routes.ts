import express from "express"
// import * as authController from "../controllers/auth.controller"
import { protectedRoute } from "../utils/protected"
import * as authController from "../controllers/auth.controller"
// import { protectedRoute } from "../utils/protected"

const authRouter = express.Router()

authRouter
    // .post("/sign-in", protectedRoute, signIn)
    // .post("/sign-out", protectedRoute, signOut)
    // .post("/send-otp", authController.sendOTP)
    // .post("/verify-otp", authController.verifyOTP)
    // .post("/forgot-password", authController.forgotPassword)
    // .put("/reset-password", authController.resetPassword)
    .post("/sign-in", authController.signIn)
    .post("/sign-out", authController.signOut)
    .post("/send-otp", authController.sendOTP)
    .post("/verify-otp", authController.verifyOTP)
    .post("/forgot-password", authController.forgotPassword)
    .put("/reset-password", authController.resetPassword)
    .post("/register", authController.register)
    .post("/continue-with-google", authController.continueWithGoogle);


export default authRouter