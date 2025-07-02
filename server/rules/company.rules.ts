import { validationRulesSchema } from "../utils/validator";

export const createCompanyRules: validationRulesSchema = {
    name: { required: true },
    address: { required: true },
    mobile: { required: true },
    email: { required: false },

}



