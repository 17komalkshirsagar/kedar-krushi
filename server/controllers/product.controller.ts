import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { customValidator } from "../utils/validator";
import redisClient from "../services/redisClient";
import { invalidateCache } from "../utils/redisMiddleware";
import { createProductRules } from "../rules/product.rules";
import { Product } from "../models/product";

// Create Product
// export const createProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
//     const data = req.body;
//     // const { isError, error } = customValidator(data, createProductRules);

//     // if (isError) return res.status(422).json({ message: "Validation Error", error });

//     const result = await Product.create(data);
//     invalidateCache("products:*");

//     res.status(200).json({ message: "Product created successfully", result });
// });

export const createProduct = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const data = req.body;
    const { name, company, batchNumber, stock } = data;

    const existingProduct = await Product.findOne({ name, company, batchNumber });

    if (existingProduct) {
        const addedStock = Number(stock);
        existingProduct.stock += addedStock;
        await existingProduct.save();

        await invalidateCache("products:*")
            ;

        return res.status(200).json({ message: "Stock updated for existing product", result: existingProduct, });
    }

    const newData = {
        ...data,
        stock: Number(stock),
    };

    const result = await Product.create(newData);

    await invalidateCache("products:*");
    res.status(201).json({ message: "New product created successfully", result, });
});


// export const getProducts = asyncHandler(async (req: Request, res: Response): Promise<any> => {
//     const { page = 1, limit = 10, searchQuery = "" } = req.query;

//     const cacheKey = `products:page=${page}&limit=${limit}&search=${searchQuery}`;
//     const cachedData = await redisClient.get(cacheKey);

//     if (cachedData) {
//         return res.status(200).json(JSON.parse(cachedData));
//     }

//     const currentPage = parseInt(page as string);
//     const pageLimit = parseInt(limit as string);
//     const skip = (currentPage - 1) * pageLimit;

//     const query: any = {
//         isDeleted: false,
//         ...(req.query.isBlock !== undefined && { isBlock: req.query.isBlock === "true" }),
//         ...(searchQuery && {
//             $or: [
//                 { name: { $regex: searchQuery, $options: "i" } },
//                 { description: { $regex: searchQuery, $options: "i" } },
//             ]
//         })
//     };

//     const totalEntries = await Product.countDocuments(query);
//     const totalPages = Math.ceil(totalEntries / pageLimit);

//     const result = await Product.find(query)
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(pageLimit)
//         .populate("company")
//         .populate("supplier")
//         .lean();

//     const pagination = { page: currentPage, limit: pageLimit, totalEntries, totalPages };
//     await redisClient.setex(cacheKey, 15, JSON.stringify({
//         message: "Products fetched successfully",
//         result,
//         pagination
//     }));

//     res.status(200).json({ message: "Products fetched successfully", result, pagination });
// });


export const getProducts = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { page = 1, limit = 10, searchQuery = "" } = req.query;

    const currentPage = parseInt(page as string);
    const pageLimit = parseInt(limit as string);
    const skip = (currentPage - 1) * pageLimit;

    const query: any = {
        isDeleted: false,
        ...(req.query.isBlock !== undefined && { isBlock: req.query.isBlock === "true" }),
        ...(searchQuery && {
            $or: [
                { name: { $regex: searchQuery, $options: "i" } },
                { description: { $regex: searchQuery, $options: "i" } },
            ]
        })
    };

    const totalEntries = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalEntries / pageLimit);

    const result = await Product.find(query)
        .sort({ createdAt: -1 }).skip(skip).limit(pageLimit).populate("company").populate("supplier").lean();

    const pagination = {
        page: currentPage, limit: pageLimit, totalEntries, totalPages
    };

    res.status(200).json({ message: "Products fetched successfully", result, pagination });
});


// Get Product By ID
export const getProductById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const cacheKey = `product:${id}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) return res.status(200).json(JSON.parse(cachedData));

    const result = await Product.findById(id).populate("company").populate("supplier").lean();

    if (!result || result.isDeleted) {
        return res.status(409).json({ message: "Product not found" });
    }

    await redisClient.setex(cacheKey, 3600, JSON.stringify({ message: "Product fetched successfully", result }));

    res.status(200).json({ message: "Product fetched successfully", result });
});

// Update Product
export const updateProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product || product.isDeleted) {
        return res.status(404).json({ message: "Product not found" });
    }

    if (product.isBlock) {
        return res.status(403).json({ message: "Product is blocked and cannot be updated" });
    }


    const result = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    invalidateCache(`product:${id}`);
    invalidateCache("products:*");

    res.status(200).json({ message: "Product updated successfully", result });
});

// Delete Product
export const deleteProduct = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product || product.isDeleted) {
        return res.status(404).json({ message: "Product not found" });
    }


    const result = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

    invalidateCache(`product:${id}`);
    invalidateCache("products:*");

    res.status(200).json({ message: "Product deleted successfully", result });
});

// Update Product Status
export const updateProductStatus = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const { status } = req.body;

    const product = await Product.findById(id);
    if (!product || product.isDeleted) {
        return res.status(404).json({ message: "Product not found" });
    }


    const result = await Product.findByIdAndUpdate(id, { status }, { new: true });

    invalidateCache(`product:${id}`);
    invalidateCache("products:*");

    res.status(200).json({ message: "Product status updated successfully", result });
});

// Block Product



export const blockProduct = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product || product.isDeleted) {
        return res.status(409).json({ message: "Product not found" });
    }

    const newBlockStatus = !product.isBlock;

    const result = await Product.findByIdAndUpdate(
        id,
        { isBlock: newBlockStatus },
        { new: true }
    );
    invalidateCache(`product:${id}`);
    invalidateCache("products:*");

    res.status(200).json({
        message: newBlockStatus ? "Product blocked successfully" : "Product unblocked successfully",
        result,
    });
});

