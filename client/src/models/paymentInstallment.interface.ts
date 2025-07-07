import { InstallmentItem, ProductItem } from "./InstallmentAccordion.interface";
import { IPayment } from "./payment.interface";

export interface IInstallment {
    _id: string;
    payment: string;
    billNumber: string;

    customer: {
        _id: string;
        name: string;
        mobile: string;
        address: string;
        email: string;
    };

    result: string;
    amount: number;
    paymentDate: string;
    paymentMode: 'Cash' | 'UPI' | 'Bank Transfer' | 'Credit' | 'Other';
    paymentReference?: string;
    isDeleted?: boolean;
    isBlock?: boolean;
    createdAt?: string;

    installments: InstallmentItem[];
    updatedAt?: string;

    products: ProductItem[];

    totalAmount: number;
    paidAmount: number;
    pendingAmount?: number;

    year: number;
}


export interface CreateInstallment {
    billNumber: string;
    customerId: string;
    amount: number;
    paymentDate: string;
    paymentMode: 'Cash' | 'UPI' | 'Bank Transfer' | 'Credit' | 'Other';
    paymentReference?: string;
}
export interface UpdateInstallment {
    amount?: number;
    paymentDate?: string;
    installments: string;
    result: string;
    paymentMode?: "Cash" | "UPI" | "Bank Transfer";
    paymentReference?: string;
    status?: string;
}

export interface CreateBulkInstallment {
    customerId: string;
    totalPayAmount: number;
    paymentDate: string;
    paymentMode: 'Cash' | 'UPI' | 'Bank Transfer' | 'Credit' | 'Other';
    paymentReference?: string;
}


export interface AddAllInstallmentResponse {
    message: string;
    result: IInstallment[];
    payments: IPayment[];
}