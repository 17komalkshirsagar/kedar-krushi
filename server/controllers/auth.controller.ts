import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"
import bcryptjs from "bcryptjs"
import jwt, { JwtPayload } from "jsonwebtoken"
import crypto from "crypto"
import { sendEmail } from "../utils/email"
import { customValidator } from "../utils/validator"
import { forgotPasswordRules, resetPasswordRules, sendOTPRules, signInRules, verifyOTPRules } from "../rules/auth.rules"
import { generateResetToken, generateToken } from "../utils/generateToken"
import { otpVerificationTemplate } from "../templates/otpVerificationTemplate"
import { resetPasswordTemplate } from "../templates/resetPasswordTemplate"
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

import { IAdminProtected, } from "../utils/protected"
import { Admin, IAdmin, IOTP, OTP, } from "../models/Admin"
dotenv.config({})

// Sign In
export const signIn = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { email, password }: IAdmin = req.body

    const { isError, error } = customValidator(req.body, signInRules)

    if (isError) {
        return res.status(422).json({ message: "Validation errors", error })
    }

    const admin = await Admin.findOne({ email }).select("-password, -__v, -updatedAt, -createdAt").lean()

    if (!admin) {
        return res.status(401).json({ message: "Invalid Credential - Email not found" })
    }


    const verifyPassword = await bcryptjs.compare(password, admin.password)
    if (!verifyPassword) {
        return res.status(401).json({ message: "Invalid Credential - Password do not match" })
    }

    if (admin.status === "inactive") {
        return res.status(403).json({ message: "Your account has been deactivated. Contact support." });
    }

    const token = generateToken({ adminId: admin._id, role: admin.role })


    const result = {
        _id: admin._id,

        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        profile: admin.profile,
        role: admin.role, token
    }
    res.status(200).json({ message: "Logged in successfully", result })
})

// Sign Out
export const signOut = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    // const { adminId } = req.admin as IAdminProtected

    if (!req.admin) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { adminId } = req.admin;

    await Admin.findByIdAndUpdate(adminId, { sessionToken: null })

    res.status(200).json({ message: "Logged out successfully" });
});

// Send OTP
export const sendOTP = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const { adminName }: IOTP = req.body
    const { isError, error } = customValidator(req.body, sendOTPRules)
    console.log("Validation Error:", error);
    if (isError) {
        return res.status(422).json({ message: "Validation errors", error });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    console.log("Generated OTP:", otp);
    await OTP.create({ adminName, otp, expiry: otpExpiry })

    const otpVerificationTemp = otpVerificationTemplate(otp)
    await sendEmail({
        to: adminName,
        subject: 'Your OTP Code',
        text: otpVerificationTemp,
    });
    console.log("Email sent result:", sendEmail);
    res.status(200).json({ message: "OTP sent successfully" })
})

// Verify OTP
export const verifyOTP = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { adminName, otp }: IOTP = req.body

    const { isError, error } = customValidator(req.body, verifyOTPRules)

    if (isError) {
        return res.status(422).json({ message: "Validation errors", error });
    }

    const result = await OTP.findOne({ adminName, otp })

    if (!result) {
        return res.status(400).json({ message: "Invalid OTP or expired" })
    }

    if (result) {
        if (new Date() > result?.expiry) {
            return res.status(400).json({ message: "OTP expired" })
        }

        if (result?.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" })
        }
    }

    await OTP.deleteOne({ adminName, otp });
    res.status(200).json({ message: "OTP verified successfully" })

})


export const forgotPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { email } = req.body

    const { isError, error } = customValidator(req.body, forgotPasswordRules)

    if (isError) {
        return res.status(422).json({ message: "Validation errors", error })
    }

    const admin = await Admin.findOne({ email }).lean()

    if (!admin) {
        return res.status(404).json({ message: "Admin not found with given email" })
    }

    const resetToken = await generateResetToken({ email })
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const resetPasswordTemp = resetPasswordTemplate(resetLink)

    await sendEmail({
        to: email,
        subject: "Password Reset Request",
        text: resetPasswordTemp
    });

    res.status(200).json({ message: "Password reset email sent successfully" });
})

// Reset Password
export const resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { password, confirmPassword, token } = req.body

    const { isError, error } = customValidator(req.body, resetPasswordRules)

    if (isError) {
        return res.status(422).json({ message: "Validation errors", error })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password do not match" })
    }

    const secretKey = process.env.JWT_KEY

    let decodedToken: string | JwtPayload | null = null

    try {
        if (secretKey) {
            decodedToken = jwt.verify(token, secretKey);
        }
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired reset token" });
    }

    if (!decodedToken) {
        return res.status(401).json({ message: "Invalid or expired reset token" });
    }

    const email = (decodedToken as JwtPayload).email
    if (!email) {
        return res.status(422).json({ message: "Email not verified" })
    }

    const admin = await Admin.findOne({ email }).lean()

    const hashPass = await bcryptjs.hash(password, 10)

    await Admin.findByIdAndUpdate(admin?._id, { password: hashPass })

    res.status(200).json({ message: "Password reset success" })
})




export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { firstName, lastName, email, phone, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { phone }] });
    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists with this email or phone" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newAdmin = await Admin.create({
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        role: "Admin",
        status: "active",
    });
    return res.status(201).json({
        message: "Admin registered successfully",
        result: {
            _id: newAdmin._id,
            firstName: newAdmin.firstName,
            lastName: newAdmin.lastName,
            email: newAdmin.email,
            phone: newAdmin.phone,
            role: newAdmin.role,
            status: newAdmin.status,
        },
        // res.status(200).json({ message: "Logged in successfully", result })

    });
});


export const continueWithGoogle = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { credential } = req.body;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    let ticket;
    try {
        ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
    } catch (error) {
        return res.status(400).json({ message: "Invalid Google token" });
    }

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
        return res.status(400).json({ message: "Google login failed, email not found in payload" });
    }

    const { email, name, picture } = payload;

    let admin = await Admin.findOne({ email });

    if (!admin) {
        admin = await Admin.create({
            firstName: name?.split(" ")[0] || "",
            lastName: name?.split(" ")[1] || "",
            email,
            phone: Math.floor(1000000000 + Math.random() * 9000000000),
            password: await bcryptjs.hash(crypto.randomBytes(10).toString("hex"), 10),
            profile: picture || "",
            role: "Admin",
            status: "active",
        });
    }

    if (admin.status === "inactive") {
        return res.status(403).json({ message: "Your account has been deactivated. Contact support." });
    }

    const token = generateToken({ adminId: admin._id, role: admin.role });
    try {
        await sendEmail({
            to: admin.email,
            subject: "Welcome to Admin Panel",
            text: `Hi ${admin.firstName}, welcome!`,
            html: `<h2>Hello ${admin.firstName}</h2><p>You logged in with Google successfully.</p>`,
        });
    } catch (emailErr) {
        console.warn("Failed to send welcome email:", emailErr);
    }

    res.status(200).json({
        message: "Login successful",
        result: {
            _id: admin._id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            role: admin.role,
            token,
        },
    });
});
