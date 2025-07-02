import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
    name: string;
    phone: string;
    email?: string;
    address?: string;
    role: 'Admin' | 'Sales' | 'Manager';
    isActive: boolean;
    status?: string;
    isDeleted?: Boolean,
    isBlock?: Boolean,
}


const EmployeeSchema: Schema<IEmployee> = new Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true, unique: true },
        email: { type: String, trim: true, unique: true, sparse: true },
        address: { type: String, trim: true },
        role: {
            type: String,
            enum: ['Admin', 'Sales', 'Manager'],
            default: 'Sales',
        },
        isActive: { type: Boolean, default: true },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        status: { type: String, enum: ["active", "inactive"], default: "active" },
        isBlock: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);
