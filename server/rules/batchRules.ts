
import { validationRulesSchema } from "../utils/validator";
export const createBatchRules: validationRulesSchema = {
    product: { required: true },
    batchNumber: { required: true },
    stock: { required: true, },
    purchasePrice: { required: true, },
    price: { required: true, },
    costPrice: { required: true },
    mrp: { required: true },
    sellingPrice: { required: true },

    manufactureDate: {
        required: true,
        pattern: /^\d{4}-\d{2}-\d{2}$/,
    },
    expiryDate: {
        required: true,
        pattern: /^\d{4}-\d{2}-\d{2}$/,
    },
};
