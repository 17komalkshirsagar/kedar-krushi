
export interface IPayment {
    _id: string;
    amount: number;
    mobile: number;
    method: string;
    status: string;
    billNumber: string;
    customer: string;
    transactionId?: string;
    userId: string;
    createdAt: string;
    updatedAt?: string;
    isBlocked?: boolean;
    totalAmount: number
    products: {
        product: {
            name: string;

        };
        quantity: number;
    }[];

}
