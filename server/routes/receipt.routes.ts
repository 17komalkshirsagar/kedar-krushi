import express from "express";
import * as sendReceiptEmail from "../controllers/receipt.controller";
const receiptEmailRouter = express.Router();

receiptEmailRouter

    .post('/send-receipt', sendReceiptEmail.sendReceiptEmail);


export default receiptEmailRouter;



