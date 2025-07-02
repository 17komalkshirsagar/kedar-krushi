export interface ISupplier {
    _id: string;
    name: string;
    email?: string;
    mobile?: string;
    address?: string;
    status?: "active" | "inactive" | "blocked";
    isBlocked?: boolean;
    createdAt?: string;
    updatedAt?: string
}