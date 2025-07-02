import express from "express";
import * as customerController from "../controllers/customer.controller";

const customerRouter = express.Router()


    .post("/customer-create", customerController.createCustomer)
    .get("/customer/list", customerController.getCustomers)
    .get("/customer/details/:id", customerController.getCustomerById)
    .put("/customer/update/:id", customerController.updateCustomer)
    .delete("/customer-delete/:id", customerController.deleteCustomer)
    .patch("/customer/status/:id", customerController.updateCustomerStatus)
    .patch("/customer/block/:id", customerController.CustomerBlock)

export default customerRouter
