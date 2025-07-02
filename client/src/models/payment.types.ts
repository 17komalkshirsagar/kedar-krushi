export interface CreatePayment {
    customer: string;

    products: {
        product: string;
        quantity: number;
        price: number;
    }[];
    totalAmount: string;
    paidAmount: string;
    pendingAmount: string;
    paymentMode: 'Cash' | 'UPI' | 'Bank Transfer' | 'Credit' | 'Other';
    paymentStatus: 'Paid' | 'Unpaid' | 'Partial';
}
