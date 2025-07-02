import { validationRulesSchema } from "../utils/validator";

export const createCustomerRules: validationRulesSchema = {
    name: { required: true },
    address: { required: true },
    mobile: { required: true },
    email: { required: true },

};

