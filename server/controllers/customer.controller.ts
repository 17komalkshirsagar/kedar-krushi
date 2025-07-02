import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { Customer } from "../models/Customer";
import { customValidator } from "../utils/validator";
import { invalidateCache } from "../utils/redisMiddleware";
import redisClient from "../services/redisClient";
import { createCustomerRules } from "../rules/customer.rules";

// Create Customer
export const createCustomer = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = req.body;
    const { isError, error } = customValidator(data, createCustomerRules);

    if (isError) {
        return res.status(422).json({ message: "Validation Error", error });
    }

    const existing = await Customer.findOne({ mobile: data.mobile });
    if (existing) {
        return res.status(400).json({ message: "Customer with this mobile already exists" });
    }

    const result = await Customer.create(data);
    invalidateCache("customers:*");
    res.status(200).json({ message: "Customer created successfully", result });
});

// Get All Customers
export const getCustomers = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { page = 1, limit = 10, searchQuery = "" } = req.query;

    const sortedQuery = JSON.stringify(Object.fromEntries(Object.entries(req.query).sort()));
    const cacheKey = `customers:${sortedQuery}`;
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
        ...(searchQuery
            ? {
                $or: [
                    { name: { $regex: searchQuery, $options: "i" } },
                    { mobile: { $regex: searchQuery, $options: "i" } },
                ],
            }
            : {}),
    };

    const totalEntries = await Customer.countDocuments(query);
    const totalPages = Math.ceil(totalEntries / pageLimit);

    const result = await Customer.find(query)
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
        JSON.stringify({ message: "Customers fetched successfully", result, pagination })
    );

    res.status(200).json({ message: "Customers fetched successfully", result, pagination });
});


// Get Customer By ID
export const getCustomerById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const cacheKey = `customer:${id}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
    }

    const result = await Customer.findById(id).lean();

    if (!result || result.isDeleted) {
        return res.status(409).json({ message: "Customer not found" });
    }

    await redisClient.setex(cacheKey, 3600, JSON.stringify({ message: "Customer fetched  details successfully", result }));
    res.status(200).json({ message: "Customer fetched successfully", result });
});

// Update Customer
export const updateCustomer = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    if (!customer || customer.isDeleted) {
        return res.status(409).json({ message: "Customer not found" });
    }

    if (customer.isBlock) {
        return res.status(403).json({ message: "Customer is blocked and cannot be updated" });
    }

    const result = await Customer.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    invalidateCache(`customer:${id}`);
    invalidateCache("customers:*");

    res.status(200).json({ message: "Customer updated successfully", result });
});



// Delete Customer
export const deleteCustomer = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const customer = await Customer.findById(id);

    if (!customer || customer.isDeleted) {
        return res.status(409).json({ message: "Customer not found" });
    }

    const result = await Customer.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

    invalidateCache(`customer:${id}`);
    invalidateCache("customers:*");

    res.status(200).json({ message: "Customer deleted successfully", result });
});


// Update Customer Status
export const updateCustomerStatus = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { status } = req.body;
    const { id } = req.params;

    const customer = await Customer.findById(id);

    if (!customer || customer.isDeleted) {
        return res.status(409).json({ message: "Customer not found" });
    }

    const result = await Customer.findByIdAndUpdate(id, { status }, { new: true });

    invalidateCache(`customer:${id}`);
    invalidateCache("customers:*");

    res.status(200).json({ message: "Customer status updated successfully", result });
});





export const CustomerBlock = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const customer = await Customer.findById(id);
    if (!customer || customer.isDeleted) {
        return res.status(409).json({ message: "Customer not found" });
    }
    const newBlockStatus = !customer.isBlock;

    const result = await Customer.findByIdAndUpdate(
        id,
        { isBlock: newBlockStatus },
        { new: true }
    );

    invalidateCache(`customer:${id}`);
    invalidateCache("customers:*");

    res.status(200).json({ message: newBlockStatus ? "Customer blocked successfully" : "Customer unblocked successfully", result });
});


