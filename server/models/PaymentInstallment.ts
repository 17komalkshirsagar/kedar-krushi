import mongoose, { Document, Schema } from 'mongoose';

export interface IPaymentInstallment extends Document {
    payment: mongoose.Types.ObjectId;
    customer: mongoose.Types.ObjectId;
    billNumber: string;
    amount: number;
    paymentDate: Date;
    paymentMode: 'Cash' | 'UPI' | 'Bank Transfer' | 'Credit' | 'Other';
    paymentReference?: string | null;
    isDeleted: boolean;
    isBlock: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    status?: string;
}

const PaymentInstallmentSchema: Schema<IPaymentInstallment> = new Schema(
    {
        payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
        billNumber: { type: String, required: true },
        amount: { type: Number, required: true },
        paymentDate: { type: Date, default: Date.now },
        paymentMode: {
            type: String,
            enum: ['Cash', 'UPI', 'Bank Transfer', 'Credit', 'Other'],
            required: true,
        },
        paymentReference: { type: String, default: null },
        isDeleted: { type: Boolean, default: false },

        isBlock: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Cancelled'],
            default: 'Pending',
        },

    },
    { timestamps: true }
);

export const PaymentInstallment = mongoose.model<IPaymentInstallment>(
    'PaymentInstallment',
    PaymentInstallmentSchema
);
