import { validationRulesSchema } from "../utils/validator";

export const createProductRules: validationRulesSchema = {
    name: { required: true },
    category: { required: true },
    company: { required: true },
    price: { required: true },
    stock: { required: true },
    expiryDate: { required: true },
};
