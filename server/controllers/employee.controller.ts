import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { Employee } from "../models/Employee";
import { customValidator } from "../utils/validator";
import redisClient from "../services/redisClient";
import { invalidateCache } from "../utils/redisMiddleware";
import { createEmployeeRules } from "../rules/employee.rules";

// Create Employee
export const createEmployee = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const data = req.body;
    const { isError, error } = customValidator(data, createEmployeeRules);

    if (isError) return res.status(422).json({ message: "Validation Error", error });

    const existing = await Employee.findOne({ phone: data.phone });
    if (existing) return res.status(400).json({ message: "Employee with this phone already exists" });

    const result = await Employee.create(data);
    invalidateCache("employees:*");
    res.status(200).json({ message: "Employee created successfully", result });
});

// Get All Employees
export const getEmployees = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { page = 1, limit = 10, searchQuery = "" } = req.query;

    const sortedQuery = JSON.stringify(Object.fromEntries(Object.entries(req.query).sort()));
    const cacheKey = `employees:${sortedQuery}`;
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
                $or: [
                    { name: { $regex: searchQuery, $options: "i" } },
                    { phone: { $regex: searchQuery, $options: "i" } },
                    { email: { $regex: searchQuery, $options: "i" } }
                ],
            }
            : {}),
    };

    const totalEntries = await Employee.countDocuments(query);
    const totalPages = Math.ceil(totalEntries / pageLimit);

    const result = await Employee.find(query)
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
        JSON.stringify({ message: "Employees fetched successfully", result, pagination })
    );

    res.status(200).json({ message: "Employees fetched successfully", result, pagination });
});

// Get Employee By ID
export const getEmployeeById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const cacheKey = `employee:${id}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) return res.status(200).json(JSON.parse(cachedData));

    const result = await Employee.findById(id).lean();

    if (!result || result.isDeleted) {
        return res.status(409).json({ message: "Employee not found" });
    }

    await redisClient.setex(cacheKey, 3600, JSON.stringify({ message: "Employee fetched successfully", result }));
    res.status(200).json({ message: "Employee fetched successfully", result });
});

// Update Employee
export const updateEmployee = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee || employee.isDeleted) {
        return res.status(409).json({ message: "Employee not found" });
    }

    if (employee.isBlock) {
        return res.status(403).json({ message: "Employee is blocked and cannot be updated" });
    }

    await Employee.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    invalidateCache(`employee:${id}`);
    invalidateCache("employees:*");
    res.status(200).json({ message: "Employee updated successfully" });
});

// Delete Employee
export const deleteEmployee = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee || employee.isDeleted) {
        return res.status(409).json({ message: "Employee not found" });
    }

    await Employee.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    invalidateCache(`employee:${id}`);
    invalidateCache("employees:*");
    res.status(200).json({ message: "Employee deleted successfully" });
});

// Update Employee Status
export const updateEmployeeStatus = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { status } = req.body;
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee || employee.isDeleted) {
        return res.status(409).json({ message: "Employee not found" });
    }

    await Employee.findByIdAndUpdate(id, { status }, { new: true });
    invalidateCache(`employee:${id}`);
    invalidateCache("employees:*");
    res.status(200).json({ message: "Employee status updated successfully" });
});

// Block/  Employee

export const blockEmployee = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee || employee.isDeleted) {
        return res.status(409).json({ message: "Employee not found" });
    }
    const newBlockStatus = !employee.isBlock;

    const result = await Employee.findByIdAndUpdate(
        id,
        { isBlock: newBlockStatus },
        { new: true }
    );

    invalidateCache(`employee:${id}`);
    invalidateCache("employees:*");

    res.status(200).json({
        message: newBlockStatus ? "Employee blocked successfully" : "Employee unblocked successfully",
        result,
    });
});
