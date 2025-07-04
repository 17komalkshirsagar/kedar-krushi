



//❌❌❌No Neeed




import mongoose, { Schema, Document } from "mongoose";

export interface IBatch extends Document {
    product: mongoose.Types.ObjectId;
    batchNumber: string;
    stock: number;
    remainingStock?: number;
    purchasePrice?: number;
    soldQuantity?: number;
    manufactureDate?: Date;
    price: number;
    costPrice: number;
    mrp: number;
    sellingPrice: number;
    expiryDate: Date;
    supplier?: mongoose.Types.ObjectId;
    isExpired?: boolean;
    isDeleted?: boolean;
    isBlock?: boolean;
    status?: "active" | "inactive" | "blocked";
    createdAt?: Date;
    updatedAt?: Date;
}

const BatchSchema = new Schema<IBatch>(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true,
        },
        batchNumber: { type: String, required: true, },
        stock: { type: Number, required: true, },
        purchasePrice: { type: Number, required: true, },
        manufactureDate: { type: Date, required: true, },
        remainingStock: { type: Number, default: 0, },
        soldQuantity: { type: Number, default: 0, },
        price: { type: Number, required: true, },
        expiryDate: { type: Date, required: true, },
        supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", },
        isExpired: { type: Boolean, default: false, },
        isDeleted: { type: Boolean, default: false, },
        isBlock: { type: Boolean, default: false, },
        costPrice: { type: Number, required: true },
        mrp: { type: Number, required: true },
        sellingPrice: { type: Number, required: true },
        status: { type: String, enum: ["active", "inactive", "blocked"], default: "active", },
    }, { timestamps: true, });

BatchSchema.index({ product: 1, batchNumber: 1 }, { unique: true });

export const Batch = mongoose.model<IBatch>("Batch", BatchSchema);
