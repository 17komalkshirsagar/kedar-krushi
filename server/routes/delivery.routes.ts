import express from "express";
import * as deliveryController from "../controllers/delivery.controller";

const deliveryRouter = express.Router();

deliveryRouter
    .post("/delivery-create", deliveryController.createDelivery)
    .get("/delivery/list", deliveryController.getDeliveries)
    .get("/delivery/details/:id", deliveryController.getDeliveryById)
    .put("/delivery/update/:id", deliveryController.updateDelivery)
    .delete("/delivery-delete/:id", deliveryController.deleteDelivery)
    .patch("/delivery/status/:id", deliveryController.updateDeliveryStatus)
    .patch("/delivery/block/:id", deliveryController.toggleDeliveryBlock)


export default deliveryRouter;
