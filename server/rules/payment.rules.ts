import { validationRulesSchema } from "../utils/validator";

export const createPaymentRules: validationRulesSchema = {
    customer: { required: true },
    products: { required: true },
    totalAmount: { required: true },
    paidAmount: { required: true },
    paymentMode: { required: true },
    paymentReference: { required: false },
};
