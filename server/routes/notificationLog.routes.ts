import express from "express";
import * as notificationLogController from "../controllers/notificationLog.controller";

const notificationLogRouter = express.Router();

notificationLogRouter
    .post("/notification-log/create", notificationLogController.createNotificationLog)
    .get("/notification-log/list", notificationLogController.getNotificationLogs)
    .get("/notification-log/details/:id", notificationLogController.getNotificationLogById)
    .put("/notification-log/update/:id", notificationLogController.updateNotificationLog)
    .delete("/notification-log/delete/:id", notificationLogController.deleteNotificationLog)
    .patch("/notification-log/status/:id", notificationLogController.updateNotificationLogStatus)
    .patch("/notification-log/block/:id", notificationLogController.blockNotificationLog)
    .post("/notification-log/send", notificationLogController.sendReminder)
    .get("/notification-log/history/:customerId", notificationLogController.getReminderHistory)

export default notificationLogRouter;
