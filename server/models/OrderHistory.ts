import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderHistory extends Document {
    customer: mongoose.Types.ObjectId;
    products: {
        product: mongoose.Types.ObjectId;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    paidAmount: number;
    pendingAmount: number;
    paymentMode: string;
    paymentStatus: string;
    orderStatus: 'Placed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

const OrderHistorySchema: Schema<IOrderHistory> = new Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        totalAmount: { type: Number, required: true },
        paidAmount: { type: Number, required: true },
        pendingAmount: { type: Number, required: true },
        paymentMode: { type: String, required: true },
        paymentStatus: { type: String, required: true },
        orderStatus: {
            type: String,
            enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Placed',
        },

        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

OrderHistorySchema.index({ customer: 1 });
OrderHistorySchema.index({ date: -1 });

export const OrderHistory: Model<IOrderHistory> = mongoose.model<IOrderHistory>(
    'OrderHistory',
    OrderHistorySchema
);
