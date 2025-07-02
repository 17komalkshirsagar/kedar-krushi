export interface INotificationLog {
    _id: string;
    customer: string;
    payment: string;

    title: string;
    message: string;
    type?: string;
    recipientId?: string;
    status?: "sent" | "pending" | "failed" | string;
    isBlocked?: boolean;
    createdAt: string;
    updatedAt?: string;
    pendingAmount?: number;
    customerId?: string;


}
