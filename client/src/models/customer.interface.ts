

export interface ICustomer {
    _id?: string;
    name: string;
    email?: string;
    mobile?: string;
    address?: string;
    status?: "active" | "inactive";
    isBlock?: boolean;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}
