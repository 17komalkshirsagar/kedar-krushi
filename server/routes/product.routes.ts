import express from "express";
import * as productController from "../controllers/product.controller";

const productRouter = express.Router();

productRouter
    .post("/product-create", productController.createProduct)
    .get("/product/list", productController.getProducts)
    .get("/product/details/:id", productController.getProductById)
    .put("/product/update/:id", productController.updateProduct)
    .delete("/product-delete/:id", productController.deleteProduct)
    .patch("/product/status/:id", productController.updateProductStatus)
    .patch("/product/block/:id", productController.blockProduct)
    .get("/products/stats", productController.getProductStats);
export default productRouter;
