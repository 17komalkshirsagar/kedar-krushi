import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { customValidator } from "../utils/validator";
import redisClient from "../services/redisClient";
import { invalidateCache } from "../utils/redisMiddleware";
import { createNotificationLogRules } from "../rules/notificationLog.rules";
import { NotificationLog } from "../models/Notification";
import { sendEmail } from "../utils/email";
import { Customer } from "../models/Customer";



// export const createNotificationLog = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
//     const data = req.body;
//     const { isError, error } = customValidator(data, createNotificationLogRules);

//     if (isError) return res.status(422).json({ message: "Validation Error", error });

//     const result = await NotificationLog.create(data);
//     invalidateCache("notificationLogs:*");

//     await sendEmail({
//         to: "email",
//         subject: "Clear Your Payment",
//         text: "Dear Customer, please clear your payment.",
//     });

//     res.status(200).json({ message: "Notification log created successfully", result });
// });



export const createNotificationLog = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = req.body;
    const { isError, error } = customValidator(data, createNotificationLogRules);

    if (isError) return res.status(422).json({ message: "Validation Error", error });

    const result = await NotificationLog.create(data);
    invalidateCache("notificationLogs:*");


    const customer = await Customer.findById(data.customer);
    if (!customer || !customer.email) {
        return res.status(400).json({ message: "Customer email not found" });
    }


    await sendEmail({
        to: customer.email,
        subject: "Clear Your Payment",
        text: "Dear Customer, please clear your payment.",
    });

    res.status(200).json({ message: "Notification log created successfully", result });
});




// Get All Notification Logs
export const getNotificationLogs = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { page = 1, limit = 10, searchQuery = "" } = req.query;

    const sortedQuery = JSON.stringify(Object.fromEntries(Object.entries(req.query).sort()));
    const cacheKey = `notificationLogs:${sortedQuery}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) return res.status(200).json(JSON.parse(cachedData));

    const currentPage = parseInt(page as string);
    const pageLimit = parseInt(limit as string);
    const skip = (currentPage - 1) * pageLimit;

    const query: any = {
        isDeleted: false,
        ...(req.query.isBlock !== undefined && { isBlock: req.query.isBlock === "true" }),
        ...(searchQuery
            ? {
                message: { $regex: searchQuery, $options: "i" }
            }
            : {}),
    };

    const totalEntries = await NotificationLog.countDocuments(query);
    const totalPages = Math.ceil(totalEntries / pageLimit);

    const result = await NotificationLog.find(query)
        .populate("customer")
        .populate("payment")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageLimit)
        .lean();

    const pagination = {
        page: currentPage,
        limit: pageLimit,
        totalEntries,
        totalPages,
    };

    await redisClient.setex(
        cacheKey,
        3600,
        JSON.stringify({ message: "Notification logs fetched successfully", result, pagination })
    );

    res.status(200).json({ message: "Notification logs fetched successfully", result, pagination });
});


export const getNotificationLogById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const cacheKey = `notificationLog:${id}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) return res.status(200).json(JSON.parse(cachedData));

    const result = await NotificationLog.findById(id).populate("customer payment").lean();

    if (!result || result.isDeleted) {
        return res.status(409).json({ message: "Notification log not found" });
    }

    await redisClient.setex(cacheKey, 3600, JSON.stringify({ message: "Notification log fetched successfully", result }));
    res.status(200).json({ message: "Notification log fetched successfully", result });
});

// Update Notification Log
export const updateNotificationLog = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const log = await NotificationLog.findById(id);

    if (!log || log.isDeleted) {
        return res.status(409).json({ message: "Notification log not found" });
    }

    if (log.isBlock) {
        return res.status(403).json({ message: "Notification log is blocked and cannot be updated" });
    }

    const result = await NotificationLog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    invalidateCache(`notificationLog:${id}`);
    invalidateCache("notificationLogs:*");
    res.status(200).json({ message: "Notification log updated successfully", result });
});

// Delete Notification Log
export const deleteNotificationLog = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const log = await NotificationLog.findById(id);

    if (!log || log.isDeleted) {
        return res.status(409).json({ message: "Notification log not found" });
    }

    const result = await NotificationLog.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    invalidateCache(`notificationLog:${id}`);
    invalidateCache("notificationLogs:*");
    res.status(200).json({ message: "Notification log deleted successfully", result });
});

// Update Status
export const updateNotificationLogStatus = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { status } = req.body;
    const { id } = req.params;

    const log = await NotificationLog.findById(id);

    if (!log || log.isDeleted) {
        return res.status(409).json({ message: "Notification log not found" });
    }

    const result = await NotificationLog.findByIdAndUpdate(id, { status }, { new: true });
    invalidateCache(`notificationLog:${id}`);
    invalidateCache("notificationLogs:*");
    res.status(200).json({ message: "Notification log status updated successfully", result });
});

// Block/Unblock

export const blockNotificationLog = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const notificationLog = await NotificationLog.findById(id);
    if (!notificationLog || notificationLog.isDeleted) {
        return res.status(409).json({ message: "NotificationLog not found" });
    }

    const newBlockStatus = !notificationLog.isBlock;

    const result = await NotificationLog.findByIdAndUpdate(
        id,
        { isBlock: newBlockStatus },
        { new: true }
    );

    invalidateCache(`notificationLog:${id}`);
    invalidateCache("notificationLogs:*");

    res.status(200).json({
        message: newBlockStatus ? "NotificationLog blocked successfully" : "NotificationLog unblocked successfully",
        result,
    });
});



export const sendReminder = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { customerId, paymentId, type, message, mobile } = req.body;

    const log = await NotificationLog.create({
        customer: customerId,
        payment: paymentId,
        type,
        message,
        sentAt: new Date(),
        status: "Sent",
    });

    const whatsappLink =
        type === "whatsapp"
            ? `https://wa.me/91${mobile}?text=${encodeURIComponent(message)}`
            : null;

    res.status(200).json({
        success: true,
        method: type,
        link: whatsappLink,
        log,
    });
});


export const getReminderHistory = asyncHandler(async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { customerId } = req.params;

    const logs = await NotificationLog.find({ customer: customerId })
        .populate("payment", "totalAmount paidAmount createdAt")
        .sort({ sentAt: -1 });

    res.status(200).json(logs);
});


