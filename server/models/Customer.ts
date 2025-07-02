import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
    name: string;
    mobile: string;
    address?: string;
    email?: string;
    status?: string;
    isDeleted?: Boolean,
    isBlock?: boolean;
    telegramChatId?: string;
}

const CustomerSchema = new Schema<ICustomer>(
    {
        name: { type: String, required: true },
        mobile: { type: String, required: true },
        address: { type: String },
        email: { type: String },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        status: { type: String, enum: ["active", "inactive"], default: "active" },
        isBlock: {
            type: Boolean,
            default: false,
        },
        telegramChatId: { type: String },
    },
    { timestamps: true }
);


export const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);
