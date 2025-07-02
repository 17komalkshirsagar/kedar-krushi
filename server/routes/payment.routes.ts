import express from "express";
import * as paymentController from "../controllers/payment.controller";

const paymentRouter = express.Router();

paymentRouter
    .post("/payment/create", paymentController.createPayment)
    .get("/payment/list", paymentController.getPayments)
    .get("/payment/details/:id", paymentController.getPaymentById)
    .put("/payment/update/:id", paymentController.updatePayment)
    .delete("/payment/delete/:id", paymentController.deletePayment)
    .patch("/payment/status/:id", paymentController.updatePaymentStatus)
    .patch("/payment/block/:id", paymentController.blockPayment)
    .get("/summary", paymentController.getCustomerPaymentSummary)
    .get("/payments/history/:customerId", paymentController.getCustomerPaymentHistory);
export default paymentRouter;
