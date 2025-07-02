import { validationRulesSchema } from "../utils/validator";

export const createEmployeeRules: validationRulesSchema = {
    name: { required: true },
    phone: { required: true },
    email: { required: false },
    address: { required: false },
    role: { required: true },
    isActive: { required: false },
    status: { required: false },
};
