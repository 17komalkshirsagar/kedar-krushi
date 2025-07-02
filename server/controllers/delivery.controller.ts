import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { customValidator } from "../utils/validator";
import { invalidateCache } from "../utils/redisMiddleware";
import redisClient from "../services/redisClient";
import { createDeliveryRules } from "../rules/delivery.rules";
import { Delivery } from "../models/Dillvery";

// Create Delivery
export const createDelivery = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = req.body;
    const { isError, error } = customValidator(data, createDeliveryRules);

    if (isError) {
        return res.status(422).json({ message: "Validation Error", error });
    }

    const result = await Delivery.create(data);
    invalidateCache("deliveries:*");
    res.status(200).json({ message: "Delivery created successfully", result });
});

// Get All Deliveries
export const getDeliveries = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { page = 1, limit = 10, searchQuery = "" } = req.query;

    const sortedQuery = JSON.stringify(Object.fromEntries(Object.entries(req.query).sort()));
    const cacheKey = `deliveries:${sortedQuery}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
    }

    const currentPage = parseInt(page as string);
    const pageLimit = parseInt(limit as string);
    const skip = (currentPage - 1) * pageLimit;

    const query: any = {
        isDeleted: false,
        ...(req.query.isBlock !== undefined && { isBlock: req.query.isBlock === 'true' }),
        ...(searchQuery && { address: { $regex: searchQuery, $options: "i" } }),
    };


    const totalEntries = await Delivery.countDocuments(query);
    const totalPages = Math.ceil(totalEntries / pageLimit);

    const result = await Delivery.find(query)
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
        JSON.stringify({ message: "Deliveries fetched successfully", result, pagination })
    );

    res.status(200).json({ message: "Deliveries fetched successfully", result, pagination });
});

// Get Delivery By ID
export const getDeliveryById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const cacheKey = `delivery:${id}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
    }

    const result = await Delivery.findById(id).lean();

    if (!result || result.isDeleted) {
        return res.status(409).json({ message: "Delivery not found" });
    }

    await redisClient.setex(cacheKey, 3600, JSON.stringify({ message: "Delivery fetched successfully", result }));
    res.status(200).json({ message: "Delivery fetched successfully", result });
});

// Update Delivery
export const updateDelivery = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const delivery = await Delivery.findById(id);

    if (!delivery || delivery.isDeleted) {
        return res.status(409).json({ message: "Delivery not found" });
    }

    const result = await Delivery.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    invalidateCache(`delivery:${id}`);
    invalidateCache("deliveries:*");
    res.status(200).json({ message: "Delivery updated successfully", result });
});

// Soft Delete Delivery
export const deleteDelivery = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const delivery = await Delivery.findById(id);

    if (!delivery || delivery.isDeleted) {
        return res.status(409).json({ message: "Delivery not found" });
    }

    const result = await Delivery.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    invalidateCache(`delivery:${id}`);
    invalidateCache("deliveries:*");
    res.status(200).json({ message: "Delivery deleted successfully", result });
});

// Update Delivery Status
export const updateDeliveryStatus = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { status } = req.body;
    const { id } = req.params;

    const delivery = await Delivery.findById(id);

    if (!delivery || delivery.isDeleted) {
        return res.status(409).json({ message: "Delivery not found" });
    }

    const result = await Delivery.findByIdAndUpdate(id, { status }, { new: true });
    invalidateCache(`delivery:${id}`);
    invalidateCache("deliveries:*");
    res.status(200).json({ message: "Delivery status updated successfully", result });
});





export const toggleDeliveryBlock = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const delivery = await Delivery.findById(id);
    if (!delivery || delivery.isDeleted) {
        return res.status(409).json({ message: "Delivery not found" });
    }

    const newBlockStatus = !delivery.isBlock;

    const result = await Delivery.findByIdAndUpdate(
        id,
        { isBlock: newBlockStatus },
        { new: true }
    );

    invalidateCache(`delivery:${id}`);
    invalidateCache("deliveries:*");

    res.status(200).json({
        message: newBlockStatus ? "Delivery blocked successfully" : "Delivery unblocked successfully",
        result
    });
});

