import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { customValidator } from "../utils/validator"
import { createCompanyRules } from "../rules/company.rules"
import redisClient from "../services/redisClient"
import { invalidateCache } from "../utils/redisMiddleware"
import { Company } from "../models/Company"


// Get All Companies
export const getCompanies = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { page = 1, limit = 10, searchQuery = "", isFetchAll = false } = req.query;

    const sortedQuery = JSON.stringify(Object.fromEntries(Object.entries(req.query).sort()));
    const cacheKey = `companies:${sortedQuery}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
    }

    const currentPage = parseInt(page as string);
    const pageLimit = parseInt(limit as string);
    const skip = (currentPage - 1) * pageLimit;

    const query = searchQuery
        ? {
            isDeleted: false,
            $or: [
                { name: { $regex: searchQuery, $options: "i" } },
                { email: { $regex: searchQuery, $options: "i" } },
                { mobile: { $regex: searchQuery, $options: "i" } }
            ]
        }
        : { isDeleted: false };

    const totalEntries = await Company.countDocuments(query);
    const totalPages = Math.ceil(totalEntries / pageLimit);

    const result = isFetchAll
        ? await Company.find(query).sort({ createdAt: -1 }).lean()
        : await Company.find(query).sort({ createdAt: -1 }).skip(skip).limit(pageLimit).lean();

    const pagination = { page: currentPage, limit: pageLimit, totalEntries, totalPages };

    await redisClient.setex(cacheKey, 3600, JSON.stringify({ message: "Companies fetched successfully", result, pagination }));
    res.status(200).json({ message: "Companies fetched successfully", result, pagination });
});

// Get Company by ID
export const getCompanyById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const cacheKey = `company:${id}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
    }

    const result = await Company.findById(id).lean();

    if (!result || result.isDeleted) {
        return res.status(409).json({ message: `Company with ID: ${id} not found` });
    }

    await redisClient.setex(cacheKey, 3600, JSON.stringify({ message: "Company fetched successfully", result }));
    res.status(200).json({ message: "Company fetched successfully", result });
});

// Create Company

export const createCompany = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = req.body;
    const { isError, error } = customValidator(data, createCompanyRules);
    if (isError) {
        return res.status(422).json({ message: "Validation error", error });
    }
    const existing = await Company.findOne({ name: data.name, isDeleted: false });
    if (existing) {
        return res.status(400).json({ message: `Company with name ${data.name} already exists` });
    }
    const result = await Company.create(data);
    invalidateCache("companies:*");
    res.status(201).json({ message: "Company created successfully", result });
});


// Update Company
export const updateCompany = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const result = await Company.findById(id);
    if (!result || result.isDeleted) {
        return res.status(409).json({ message: "Company not found" });
    }

    await Company.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    invalidateCache(`company:${id}`);
    invalidateCache("companies:*");
    res.status(200).json({ message: "Company  updated successfully", result });

});

// Delete Company 
export const deleteCompany = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const result = await Company.findById(id);
    if (!result || result.isDeleted) {
        return res.status(409).json({ message: "Company not found" });
    }

    await Company.findByIdAndUpdate(id, { isDeleted: true });

    invalidateCache(`company:${id}`);
    invalidateCache("companies:*");
    res.status(201).json({ message: "Company deleted successfully", result });

});

// Update Company Status
export const updateCompanyStatus = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const { status } = req.body;

    const result = await Company.findById(id);
    if (!result || result.isDeleted) {
        return res.status(404).json({ message: "Company not found" });
    }

    await Company.findByIdAndUpdate(id, { status });

    invalidateCache(`company:${id}`);
    invalidateCache("companies:*");
    res.status(201).json({ message: "Company status updated successfully", result });
});


export const blockCompany = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const company = await Company.findById(id);
    if (!company) {
        return res.status(409).json({ message: "Company not found" });
    }


    const newBlockStatus = !company.isBlock;

    const result = await Company.findByIdAndUpdate(
        id,
        { isBlock: newBlockStatus },
        { new: true });

    invalidateCache(`Company:${id}`);
    invalidateCache("Companys:*");

    res.status(200).json({
        message: newBlockStatus ? "Company blocked successfully" : "Company unblocked successfully",
        result
    });
});

