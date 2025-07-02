import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import redisClient from "../services/redisClient";
import { invalidateCache } from "../utils/redisMiddleware";
import { customValidator } from "../utils/validator";
import { createSupplierRules } from "../rules/supplier.rules";
import { Supplier } from "../models/supplier";
import { Product } from "../models/product";

// Create
export const createSupplier = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = req.body;
    const { isError, error } = customValidator(data, createSupplierRules);
    if (isError) return res.status(422).json({ message: "Validation Error", error });

    const result = await Supplier.create(data);
    invalidateCache("suppliers:*");
    res.status(200).json({ message: "Supplier created successfully", result });
});

//  all
export const getSuppliers = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { page = 1, limit = 10, searchQuery = "", isBlock } = req.query;
    const sortedQuery = JSON.stringify(Object.fromEntries(Object.entries(req.query).sort()));
    const cacheKey = `suppliers:${sortedQuery}`;

    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) return res.status(200).json(JSON.parse(cachedData));

    const currentPage = parseInt(page as string);
    const pageLimit = parseInt(limit as string);
    const skip = (currentPage - 1) * pageLimit;

    const query: any = {
        isDeleted: false,
        ...(isBlock !== undefined && { isBlock: isBlock === "true" }),
        ...(searchQuery
            ? {
                $or: [
                    { name: { $regex: searchQuery, $options: "i" } },
                    { email: { $regex: searchQuery, $options: "i" } },
                    { mobile: { $regex: searchQuery, $options: "i" } },
                ],
            }
            : {}),
    };

    const totalEntries = await Supplier.countDocuments(query);
    const totalPages = Math.ceil(totalEntries / pageLimit);

    const result = await Supplier.find(query)
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
        JSON.stringify({ message: "Suppliers fetched successfully", result, pagination })
    );

    res.status(200).json({ message: "Suppliers fetched successfully", result, pagination });
});

// Get By ID
export const getSupplierById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const cacheKey = `supplier:${id}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.status(200).json(JSON.parse(cached));

    const result = await Supplier.findById(id).lean();
    if (!result || result.isDeleted)
        return res.status(404).json({ message: "Supplier not found" });

    await redisClient.setex(cacheKey, 3600, JSON.stringify({ message: "Supplier fetched", result }));
    res.status(200).json({ message: "Supplier fetched", result });
});

// Update
export const updateSupplier = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const supplier = await Supplier.findById(id);

    if (!supplier || supplier.isDeleted)
        return res.status(404).json({ message: "Supplier not found" });

    if (supplier.isBlock)
        return res.status(403).json({ message: "Supplier is blocked and cannot be updated" });


    const result = await Supplier.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    invalidateCache(`supplier:${id}`);
    invalidateCache("suppliers:*");
    res.status(200).json({ message: "Supplier updated successfully", result });
});

// Delete
export const deleteSupplier = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const supplier = await Supplier.findById(id);

    if (!supplier || supplier.isDeleted)
        return res.status(404).json({ message: "Supplier not found" });


    const result = await Supplier.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    invalidateCache(`supplier:${id}`);
    invalidateCache("suppliers:*");
    res.status(200).json({ message: "Supplier deleted successfully", result });
});

// Get supplier and its products
export const getSupplierWithProducts = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const result = await Supplier.findById(id).lean();
    if (!result || result.isDeleted)
        return res.status(409).json({ message: "Supplier not found" });

    const products = await Product.find({ supplier: id, isDeleted: false }).populate("company").lean();

    res.status(200).json({
        message: "Supplier with products fetched successfully",
        result,
        products,
    });
});



// Update Status
export const updateSupplierStatus = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { status } = req.body;
    const { id } = req.params;

    const result = await Supplier.findById(id);
    if (!result || result.isDeleted)
        return res.status(409).json({ message: "Supplier not found" });

    await Supplier.findByIdAndUpdate(id, { status }, { new: true });
    invalidateCache(`supplier:${id}`);
    invalidateCache("suppliers:*");
    res.status(200).json({ message: "Supplier status updated successfully", result });
});


export const blockSupplier = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const supplier = await Supplier.findById(id);

    if (!supplier || supplier.isDeleted) {
        return res.status(409).json({ message: "Supplier not found" });
    }
    const newBlockStatus = !supplier.isBlock;

    const result = await Supplier.findByIdAndUpdate(
        id,
        { isBlock: newBlockStatus },
        { new: true }
    );

    invalidateCache(`supplier:${id}`);
    invalidateCache("suppliers:*");

    res.status(200).json({
        message: newBlockStatus ? "Supplier blocked successfully" : "Supplier unblocked successfully",
        result,
    });
});

