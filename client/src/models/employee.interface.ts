
export interface IEmployee {
    name: string;
    phone: string;
    email?: string;
    address?: string;
    role: string;
    isActive: boolean;
    status?: "active" | "inactive";
    isDeleted?: Boolean,
    isBlock?: Boolean,
}
