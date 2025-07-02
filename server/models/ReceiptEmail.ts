import mongoose, { Schema, Document } from 'mongoose';

export interface IReceiptEmail extends Document {
    customerEmail: string;
    subject: string;
    html: string;
    billNumber?: string;
    sentAt?: Date;
    status?: 'sent' | 'failed';
    errorMessage?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ReceiptEmailSchema: Schema<IReceiptEmail> = new Schema(
    {
        customerEmail: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        html: {
            type: String,
            required: true,
        },
        billNumber: {
            type: String,
        },
        sentAt: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ['sent', 'failed'],
            default: 'sent',
        },
        errorMessage: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const ReceiptEmail = mongoose.model<IReceiptEmail>('ReceiptEmail', ReceiptEmailSchema);
