export interface IProduct {
    _id: string;
    name: string;
    company: string;
    expiryDate: Date;
    supplier: string;
    unit: 'kg' | 'liter' | 'packet' | 'unit';
    description?: string;
    price: number;
    supplierId: string;
    stock?: number;
    status?: "active" | "inactive" | "blocked";
    isBlocked?: boolean;
    createdAt?: string;
    updatedAt?: string;
    category?: 'Pesticide' | 'Seed' | 'Fertilizer' | 'Other';
    batchNumber?: string
}
