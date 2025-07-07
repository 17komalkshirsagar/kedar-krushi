import express from "express";
import * as paymentInstallmentController from "../controllers/paymentInstallment.controller";

const paymentInstallmentRouter = express.Router();

paymentInstallmentRouter

    .post("/installment/create", paymentInstallmentController.createaddInstallmentByBillNumber)
    .get("/installment/list", paymentInstallmentController.getInstallments)
    .get("/installment/details/:id", paymentInstallmentController.getInstallmentByBillNumber)
    .put("/installment/update/:id", paymentInstallmentController.updateInstallment)
    .delete("/installment/delete/:id", paymentInstallmentController.deleteInstallment)
    .get("/installment/customer/:id", paymentInstallmentController.getInstallmentsByCustomer)
    .put("/installment/block/:id", paymentInstallmentController.installmentBlock)
    .get("/installment/get/installment/by/:id", paymentInstallmentController.getInstallmentById)
    .post("/installment/all/pay", paymentInstallmentController.payPendingBillsInOrder)


export default paymentInstallmentRouter;
