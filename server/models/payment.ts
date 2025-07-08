import mongoose, { Document, Schema } from 'mongoose';
import { generateBillNumber } from '../utils/generateBillNumber';

export interface IPaymentProduct {
    product: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
}

export interface IPayment extends Document {
    _id: mongoose.Types.ObjectId;
    customer: mongoose.Types.ObjectId;
    products: IPaymentProduct[];
    totalAmount: number;
    billNumber: string;

    year: number;
    paidAmount: number;
    pendingAmount?: number;
    paymentMode: 'Cash' | 'UPI' | 'Bank Transfer' | 'Credit' | 'Other';
    paymentStatus: 'Paid' | 'Unpaid' | 'Partial';
    paymentReference?: string | null;
    isDeleted: boolean;
    isBlock: boolean;
    status: 'active' | 'inactive';
    createdAt?: Date;
    updatedAt?: Date;

}
const PaymentSchema: Schema<IPayment> = new Schema(
    {
        customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },

        products: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],

        totalAmount: { type: Number, required: true },
        paidAmount: { type: Number, default: 0 },
        pendingAmount: { type: Number },

        paymentMode: {
            type: String,
            enum: ['Cash', 'UPI', 'Bank Transfer', 'Credit', 'Other'],
            required: true,
        },
        billNumber: { type: String, unique: true },
        year: { type: Number },
        paymentStatus: {
            type: String,
            enum: ['Paid', 'Unpaid', 'Partial'],
            default: 'Unpaid',
        },

        paymentReference: { type: String, default: null },

        status: { type: String, enum: ['active', 'inactive'], default: 'active' },
        isDeleted: { type: Boolean, default: false },

        isBlock: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
PaymentSchema.pre('save', async function (next) {
    if (this.isNew) {
        const billNumber = await generateBillNumber();
        this.billNumber = billNumber;
        this.year = Number(new Date().getFullYear());
    }
    next();
});



export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);