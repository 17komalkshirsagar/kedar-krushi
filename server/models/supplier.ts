import mongoose, { Schema, Document } from 'mongoose';

export interface ISupplier extends Document {
    name: string;
    mobile?: string;
    email?: string;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
    status?: string;
    isDeleted?: Boolean,
    isBlock?: Boolean,
}

const SupplierSchema: Schema<ISupplier> = new Schema(
    {
        name: { type: String, required: true },
        mobile: { type: String },
        email: { type: String },
        address: { type: String },

        isDeleted: {
            type: Boolean,
            default: false,
        },
        status: { type: String, enum: ["active", "inactive", "blocked"], default: "active" },
        isBlock: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Supplier = mongoose.model<ISupplier>('Supplier', SupplierSchema);
