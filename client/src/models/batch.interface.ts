
export interface IBatch {
    _id: string;
    product: string;
    batchNumber: string;
    stock: number;
    remainingStock: number;
    purchasePrice: number;
    soldQuantity: number;
    manufactureDate: Date;
    expiryDate: Date;
    price: number;
    costPrice: number;
    mrp: number;
    sellingPrice: number;
    supplier?: string;
    isExpired: boolean;
    isDeleted: boolean;
    isBlock: boolean;
    status: "active" | "inactive" | "blocked";
    createdAt: string;
    updatedAt: string;
}
