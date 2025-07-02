import mongoose, { Schema, Document } from 'mongoose';

export interface INotificationLog extends Document {
    customer: mongoose.Types.ObjectId;
    type: 'email' | 'whatsapp';
    message?: string;
    payment?: mongoose.Types.ObjectId;
    sentAt: Date;
    status: 'Sent' | 'Failed';
    isDeleted?: Boolean,
    isBlock?: Boolean,
}

const NotificationLogSchema: Schema<INotificationLog> = new Schema(
    {
        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
        type: { type: String, enum: ['email', 'whatsapp'], required: true },
        message: { type: String },
        payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
        sentAt: { type: Date, default: Date.now },
        status: { type: String, enum: ['Sent', 'Failed'], default: 'Sent' },
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

export const NotificationLog = mongoose.model<INotificationLog>('NotificationLog', NotificationLogSchema);
