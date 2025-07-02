import { validationRulesSchema } from "../utils/validator";

export const createSupplierRules: validationRulesSchema = {
    name: { required: true },
    mobile: { required: false },
    email: { required: false },
    address: { required: false },
};
