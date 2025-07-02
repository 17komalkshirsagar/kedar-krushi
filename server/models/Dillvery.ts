



import mongoose, { Schema, Document } from 'mongoose';

export interface IDelivery extends Document {
    payment: mongoose.Schema.Types.ObjectId;
    address?: string;
    status: 'Pending' | 'Delivered' | 'Failed' | "Shipped" | "Cancelled";
    isDeleted?: Boolean,
    isBlock?: Boolean,
}

const DeliverySchema = new Schema<IDelivery>(
    {
        payment: { type: Schema.Types.ObjectId, ref: 'Payment', required: true },
        address: { type: String },
        status: {
            type: String,
            enum: ['Pending', 'Delivered', 'Failed', 'Cancelled', 'Shipped'],
            default: 'Pending',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isBlock: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Delivery = mongoose.model<IDelivery>('Delivery', DeliverySchema);
