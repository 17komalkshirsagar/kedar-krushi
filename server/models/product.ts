import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    category: 'Pesticide' | 'Seed' | 'Fertilizer' | 'Other';
    company: mongoose.Types.ObjectId;
    batchNumber: string
    description?: string;
    price: number;
    costPrice: number;
    sellingPrice: number;
    soldQuantity: number;
    remainingStock: number;
    stock: number;
    mrp: number;
    unit?: 'kg' | 'liter' | 'packet' | 'unit';
    manufactureDate: Date;
    expiryDate: Date;
    supplier?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    status?: string;
    isDeleted?: Boolean,
    isBlock?: Boolean,
}

const ProductSchema: Schema<IProduct> = new Schema(
    {
        name: { type: String, required: true },

        category: {
            type: String,
            enum: ['Pesticide', 'Seed', 'Fertilizer', 'Other'],
            required: true,
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
        },

        description: { type: String },

        price: { type: Number, required: true },

        stock: { type: Number, required: true },

        unit: {
            type: String,
            enum: ['kg', 'liter', 'packet', 'unit',],
        },
        batchNumber: {
            type: String,
            required: true
        },
        mrp: { type: Number, required: true },
        sellingPrice: { type: Number, required: true },
        costPrice: { type: Number, required: true },
        manufactureDate: { type: Date, required: true },
        soldQuantity: { type: Number, default: 0 },
        remainingStock: { type: Number, default: 0 },
        expiryDate: { type: Date, required: true },

        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Supplier',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        status: { type: String, enum: ["active", "inactive", "blocked"], default: "active" },
        isBlock: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true });
ProductSchema.index({ name: 1, company: 1, batchNumber: 1 }, { unique: true });



export const Product = mongoose.model<IProduct>('Product', ProductSchema);
