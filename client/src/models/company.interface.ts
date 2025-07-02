

export interface ICompany {
    _id?: string;
    name: string;
    address?: string;
    email?: string;
    mobile?: string;
    isDeleted?: boolean;
    isBlock?: boolean;
    status?: 'active' | 'inactive';
    createdAt?: string;
    updatedAt?: string;
}
