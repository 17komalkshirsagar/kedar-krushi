import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { Batch } from "../models/Batch";
import { customValidator } from "../utils/validator";
import redisClient from "../services/redisClient";
import { invalidateCache } from "../utils/redisMiddleware";
import { createBatchRules } from "../rules/batchRules";


export const createBatch = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = req.body;
    const { isError, error } = customValidator(data, createBatchRules);

    if (isError) {
        return res.status(422).json({ message: "Validation Error", error });
    }


    const exists = await Batch.findOne({ product: data.product, batchNumber: data.batchNumber });
    if (exists) return res.status(400).json({ message: "Batch already exists for this product" });

    const result = await Batch.create(data);
    invalidateCache("batches:*");
    res.status(200).json({ message: "Batch created successfully", result });
});


export const getBatches = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { page = 1, limit = 10, productId = "" } = req.query;

    const sortedQuery = JSON.stringify(Object.fromEntries(Object.entries(req.query).sort()));
    const cacheKey = `batches:${sortedQuery}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) return res.status(200).json(JSON.parse(cachedData));

    const currentPage = parseInt(page as string);
    const pageLimit = parseInt(limit as string);
    const skip = (currentPage - 1) * pageLimit;

    const query: any = { isExpired: false };
    if (productId) query.product = productId;

    const totalEntries = await Batch.countDocuments(query);
    const totalPages = Math.ceil(totalEntries / pageLimit);

    const result = await Batch.find(query)
        .populate('product')
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
        JSON.stringify({ message: "Batches fetched successfully", result, pagination })
    );

    res.status(200).json({ message: "Batches fetched successfully", result, pagination });
});

// Get Batch by ID
export const getBatchById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const cacheKey = `batch:${id}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) return res.status(200).json(JSON.parse(cachedData));

    const result = await Batch.findById(id).populate('product').lean();
    if (!result) return res.status(409).json({ message: "Batch not found" });

    await redisClient.setex(cacheKey, 3600, JSON.stringify({ message: "Batch fetched successfully", result }));
    res.status(200).json({ message: "Batch fetched successfully", result });
});

// Update Batch
export const updateBatch = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const result = await Batch.findById(id);

    if (!result) return res.status(409).json({ message: "Batch not found" });

    await Batch.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    invalidateCache(`batch:${id}`);
    invalidateCache("batches:*");
    res.status(200).json({ message: "Batch updated successfully", result });
});

export const deleteBatch = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const result = await Batch.findByIdAndUpdate(id, { isDeleted: true }, { new: true });


    if (!result) return res.status(409).json({ message: "Batch not found" });

    await Batch.findByIdAndDelete(id);
    invalidateCache(`batch:${id}`);
    invalidateCache("batches:*");
    res.status(200).json({ message: "Batch deleted successfully", result });
});

export const markBatchExpired = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const result = await Batch.findById(id);
    if (!result) return res.status(409).json({ message: "Batch not found" });

    await Batch.findByIdAndUpdate(id, { isExpired: true });
    invalidateCache(`batch:${id}`);
    invalidateCache("batches:*");
    res.status(200).json({ message: "Batch marked as expired", result });
});
export const sellFromBatch = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { batchId, quantity } = req.body;

    const batch = await Batch.findById(batchId);
    if (!batch) return res.status(409).json({ message: "Batch not found" });

    if (batch.remainingStock! < quantity) {
        return res.status(400).json({ message: "Not enough stock available" });
    }

    const updatedBatch = await Batch.findByIdAndUpdate(batchId, {
        $inc: {
            soldQuantity: quantity,
            remainingStock: -quantity,
        },
    }, { new: true });

    invalidateCache(`batch:${batchId}`);
    invalidateCache("batches:*");
    res.status(200).json({ message: "Batch stock updated after sale", result: updatedBatch });
});

export const getExpiredBatches = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const result = await Batch.find({ isExpired: true }).populate('product');
    res.status(200).json({ message: "Expired batches fetched", result });
});

export const sellProductFromOldestBatch = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { productId, quantity } = req.body;
    let qtyToSell = quantity;

    const batches = await Batch.find({
        product: productId,
        isExpired: false,
        $expr: { $lt: ["$soldQuantity", "$stock"] }
    }).sort({ createdAt: 1 });

    const updates = [];

    for (const batch of batches) {
        const availableQty = batch.stock - (batch.soldQuantity ?? 0);
        if (availableQty <= 0) continue;

        const sellQty = Math.min(availableQty, qtyToSell);

        await Batch.findByIdAndUpdate(batch._id, {
            $inc: {
                soldQuantity: sellQty,
                remainingStock: -sellQty
            }
        });

        updates.push({ batchId: batch._id, sold: sellQty });
        qtyToSell -= sellQty;

        if (qtyToSell <= 0) break;
    }

    if (qtyToSell > 0) {
        return res.status(400).json({ message: `Only partial stock available`, updates });
    }

    res.status(200).json({ message: `Sold successfully using FIFO`, updates });
});
