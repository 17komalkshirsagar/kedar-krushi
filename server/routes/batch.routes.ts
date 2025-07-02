
import express from "express";
import * as batchController from "../controllers/batch.controller";

const batchRouter = express.Router();

batchRouter
    .post("/batch-create", batchController.createBatch)
    .get("/batch/list", batchController.getBatches)
    .get("/batch/details/:id", batchController.getBatchById)
    .put("/batch/update/:id", batchController.updateBatch)
    .delete("/batch-delete/:id", batchController.deleteBatch)
    .patch("/batch/mark-expired/:id", batchController.markBatchExpired)
    .post("/batch/sell", batchController.sellFromBatch)
    .get("/batch/expired", batchController.getExpiredBatches)
    .post("/batch/sell-from-oldest", batchController.sellProductFromOldestBatch);

export default batchRouter;
