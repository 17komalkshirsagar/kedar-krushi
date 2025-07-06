// types/installment.types.ts

export type ProductItem = {
    product: {
        name: string;
    };
    quantity: number;
};

export type InstallmentItem = {
    _id: string;
    amount: number;
    paymentDate: string;
    paymentMode: string;
    status: string;
};

export type InstallmentResponse = {
    billNumber: string;
    products: ProductItem[];
    installments: InstallmentItem[];
    totalAmount: number;
    paidAmount: number;
    pendingAmount: number;
};

