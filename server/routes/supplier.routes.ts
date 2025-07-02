import express from "express";
import * as supplierController from "../controllers/supplier.controller";

const supplierRouter = express.Router();

supplierRouter
    .post("/supplier-create", supplierController.createSupplier)
    .get("/supplier/list", supplierController.getSuppliers)
    .get("/supplier/details/:id", supplierController.getSupplierById)
    .put("/supplier/update/:id", supplierController.updateSupplier)
    .delete("/supplier-delete/:id", supplierController.deleteSupplier)
    .patch("/supplier/status/:id", supplierController.updateSupplierStatus)
    .patch("/supplier/block/:id", supplierController.blockSupplier)
    .get("/with-products/:id", supplierController.getSupplierWithProducts)
export default supplierRouter;
