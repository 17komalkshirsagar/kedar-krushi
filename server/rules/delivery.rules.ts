import { validationRulesSchema } from "../utils/validator";

export const createDeliveryRules: validationRulesSchema = {
    payment: { required: true },
    address: { required: false },
    status: { required: false },
};
