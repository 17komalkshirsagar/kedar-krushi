import { validationRulesSchema } from "../utils/validator";

export const createNotificationLogRules: validationRulesSchema = {
    customer: { required: true },
    type: { required: true },
    message: { required: false },
    payment: { required: false },
    status: { required: false },
};
