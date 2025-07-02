import mongoose, { Model, Schema } from "mongoose";

export interface IAdmin extends Document {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: number
    confirmPassword?: string
    profile?: string
    role: 'Admin';
    status: 'active' | 'inactive';
    sessionToken: string | null
}

export interface IOTP extends Document {
    adminName: string
    otp: string
    expiry: Date
}

const adminSchema = new Schema<IAdmin>({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: Number, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    profile: { type: String, trim: true },
    role: {
        type: String,
        enum: ["Admin"],
        default: "Admin",
        required: true
    },
    status: { type: String, default: "active", enum: ['active', 'inactive'] },
    sessionToken: { type: String, default: null },
}, { timestamps: true });

const OTPSchema = new Schema<IOTP>({
    adminName: { type: String },
    otp: { type: String, required: true },
    expiry: { type: Date, required: true }
}, { timestamps: true })

export const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
export const OTP = mongoose.model<IOTP>("Otp", OTPSchema)

