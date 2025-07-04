

export interface IInstallment {
    _id: string;
    payment: string
    billNumber: string;
    customer: string
    amount: number;
    paymentDate: string;
    paymentMode: "Cash" | "UPI" | "Bank Transfer";
    paymentReference?: string;
    isDeleted?: boolean;
    isBlock?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateInstallment {
    billNumber: string;
    customerId: string;
    amount: number;
    paymentDate: string;
    paymentMode: "Cash" | "UPI" | "Bank Transfer";
    paymentReference?: string;
}


export interface UpdateInstallment {
    amount?: number;
    paymentDate?: string;
    paymentMode?: "Cash" | "UPI" | "Bank Transfer";
    paymentReference?: string;
    status?: string;
}
