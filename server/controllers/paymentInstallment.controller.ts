import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { PaymentInstallment } from '../models/PaymentInstallment';
import redisClient from '../services/redisClient';
import { invalidateCache } from '../utils/redisMiddleware';
import { Payment } from '../models/payment';
import { Customer } from '../models/Customer';
import { recalculatePaymentStatus } from '../utils/paymentHelper';
import { generateBillNumber } from '../utils/generateBillNumber';



//  Create Installment
export const createaddInstallmentByBillNumber = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { billNumber, customerId, amount, paymentDate, paymentMode, paymentReference } = req.body;

    const payment = await Payment.findOne({ billNumber, customer: customerId });
    if (!payment || payment.isDeleted) return res.status(409).json({ message: 'Payment not found' });

    if (payment.paidAmount + amount > payment.totalAmount) {
        return res.status(400).json({ message: 'Amount exceeds pending balance' });
    }

    const result = await PaymentInstallment.create({
        payment: payment._id,
        billNumber,
        customer: customerId,
        amount,
        paymentDate,
        paymentMode,
        paymentReference,
    });

    // await recalculatePaymentStatus(result.payment);
    await recalculatePaymentStatus(payment._id)


    await invalidateCache(`payment:${payment._id}`);
    await invalidateCache('installments:*');

    res.status(201).json({ message: 'Installment added successfully', result });
});

//  Get All Installments (with search & pagination)
export const getInstallments = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { page = 1, limit = 10, searchQuery = '' } = req.query;

    const sortedQuery = JSON.stringify(Object.fromEntries(Object.entries(req.query).sort()));
    const cacheKey = `installments:${sortedQuery}`;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) return res.status(200).json(JSON.parse(cachedData));

    const currentPage = parseInt(page as string);
    const pageLimit = parseInt(limit as string);
    const skip = (currentPage - 1) * pageLimit;

    const customerMatch: any = {};
    if (searchQuery) {
        const customers = await Customer.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { mobile: { $regex: searchQuery, $options: 'i' } },
            ],
        }).select('_id');
        customerMatch.customer = { $in: customers.map((c) => c._id) };
    }

    const query: any = {
        isDeleted: false,
        ...(searchQuery && {
            $or: [
                { billNumber: { $regex: searchQuery, $options: 'i' } },
                ...(customerMatch.customer ? [{ customer: customerMatch.customer }] : []),
            ],
        }),
    };

    const totalEntries = await PaymentInstallment.countDocuments(query);
    const totalPages = Math.ceil(totalEntries / pageLimit);

    const result = await PaymentInstallment.find(query)
        .populate('customer', 'name mobile')
        .populate('payment', 'totalAmount paidAmount pendingAmount paymentStatus')
        .sort({ paymentDate: -1 })
        .skip(skip)
        .limit(pageLimit)
        .lean();

    const pagination = { page: currentPage, limit: pageLimit, totalEntries, totalPages };
    await redisClient.setex(
        cacheKey,
        3600,
        JSON.stringify({ message: 'Installments fetched successfully', result, pagination })
    );

    res.status(200).json({ message: 'Installments fetched successfully', result, pagination });
});

//  Get Single Payment with Installments
export const getInstallmentById = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;


    const payment = await Payment.findById(id)
        .populate('customer')
        .populate('products.product')
        .lean();

    if (!payment || payment.isDeleted) return res.status(409).json({ message: 'Payment not found' });

    const installments = await PaymentInstallment.find({ payment: id }).sort({ paymentDate: -1 }).lean();

    const result = { ...payment, installments };

    res.status(200).json({ message: 'Payment fetched successfully', result });
});
export const getInstallmentByBillNumber = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id: billNumber } = req.params;

    const payment = await Payment.findOne({ billNumber })
        .populate('customer')
        .populate('products.product')
        .lean();

    if (!payment || payment.isDeleted)
        return res.status(409).json({ message: 'Payment not found' });

    //  const latestInstallment = await PaymentInstallment.findOne({ payment: payment._id, isDeleted: { $ne: true } })
    //     .sort({ paymentDate: -1 }).lean();
    const installments = await PaymentInstallment.find({ payment: payment._id, isDeleted: false })
        .sort({ paymentDate: -1 })
        .lean();

    const result = { ...payment, installments };

    res.status(200).json({ message: 'fetched installment by bill number', result });
});

//  Update Installment
export const updateInstallment = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;
    const { amount, paymentDate, paymentMode, paymentReference, status } = req.body;

    const result = await PaymentInstallment.findByIdAndUpdate(id, { status }, { new: true });

    if (!result) return res.status(409).json({ message: 'Installment not found' });

    const payment = await Payment.findById(result.payment);
    if (!payment) return res.status(409).json({ message: 'Related bill not found' });

    const newPaidAmount = payment.paidAmount - result.amount + amount;
    if (newPaidAmount > payment.totalAmount) {
        return res.status(400).json({ message: 'New amount exceeds bill total' });
    }

    payment.paidAmount -= result.amount;
    result.amount = amount ?? result.amount;
    result.paymentDate = paymentDate ?? result.paymentDate;
    result.paymentMode = paymentMode ?? result.paymentMode;
    result.paymentReference = paymentReference ?? result.paymentReference;
    await result.save();

    await recalculatePaymentStatus(result.payment);

    await invalidateCache(`payment:${payment._id}`);
    await invalidateCache('installments:*');

    res.status(200).json({ message: 'Installment updated successfully', result });
});

// Delete Installment
export const deleteInstallment = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const result = await PaymentInstallment.findById(id);
    if (!result) return res.status(409).json({ message: 'Installment not found' });

    const payment = await Payment.findById(result.payment);
    if (!payment) return res.status(409).json({ message: 'Related bill not found' });
    // const installment = await PaymentInstallment.findByIdAndUpdate(
    //     id,
    //     { isDeleted: true },
    //     { new: true }
    // );
    result.isDeleted = true;
    await result.save();
    await recalculatePaymentStatus(result.payment);
    await invalidateCache(`payment:${payment._id}`);
    await invalidateCache('installments:*');

    res.status(200).json({ message: 'Installment deleted successfully', result });
});


export const getInstallmentsByCustomer = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const result = await PaymentInstallment.find({ customer: id })
        .populate('payment', 'billNumber totalAmount paidAmount pendingAmount paymentStatus')
        .sort({ paymentDate: -1 });

    res.status(200).json({ message: 'Customer installments fetched', result });
});






export const installmentBlock = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { id } = req.params;

    const installment = await PaymentInstallment.findById(id);
    if (!installment) {
        return res.status(409).json({ message: "Installment not found" });
    }

    const newBlockStatus = !installment.isBlock;

    const result = await PaymentInstallment.findByIdAndUpdate(
        id,
        { isBlock: newBlockStatus }, { new: true });

    if (result?.payment) {
        await invalidateCache(`payment:${result.payment}`);
    }

    await invalidateCache('installments:*');

    res.status(200).json({
        message: `Installment ${result?.isBlock ? "blocked" : "unblocked"} successfully`, result
    });
});


// export const payPendingBillsInOrder = asyncHandler(async (req: Request, res: Response): Promise<any> => {
//     const { customerId, totalPayAmount, paymentDate, paymentMode, paymentReference } = req.body;

//     if (!customerId || !totalPayAmount) {
//         return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const pendingPayments = await Payment.find({
//         customer: customerId,
//         isDeleted: false,
//         $expr: { $lt: ["$paidAmount", "$totalAmount"] }
//     }).sort({ pendingAmount: 1 });

//     let remainingAmount = totalPayAmount;
//     const createdInstallments: any[] = [];

//     for (const payment of pendingPayments) {
//         const pending = payment.totalAmount - payment.paidAmount;
//         if (remainingAmount <= 0) break;

//         const payAmount = Math.min(pending, remainingAmount);

//         const installment = await PaymentInstallment.create({
//             payment: payment._id,
//             billNumber: payment.billNumber,
//             customer: customerId,
//             amount: payAmount,
//             paymentDate,
//             paymentMode,
//             paymentReference,
//         });

//         await recalculatePaymentStatus(payment._id);
//         await invalidateCache(`payment:${payment._id}`);

//         createdInstallments.push(installment);
//         remainingAmount -= payAmount;
//     }

//     await invalidateCache('installments:*');


//     const populatedPayments = await Payment.find({
//         _id: { $in: createdInstallments.map(i => i.payment) }
//     })
//         .populate('products.product')
//         .populate('customer');


//     res.status(200).json({
//         message: 'Bulk installment payments added',
//         result: createdInstallments,
//         payments: populatedPayments,
//     });
// });


export const payPendingBillsInOrder = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { customerId, totalPayAmount, paymentDate, paymentMode, paymentReference } = req.body;

    if (!customerId || !totalPayAmount) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const pendingPayments = await Payment.find({
        customer: customerId, isDeleted: false, $expr: { $lt: ["$paidAmount", "$totalAmount"] }
    }).sort({ createdAt: 1 });

    if (pendingPayments.length === 0) {
        return res.status(400).json({ message: 'No pending payments found' });
    }

    const receiptBillNumber = await generateBillNumber();

    let remainingAmount = totalPayAmount;
    const createdInstallments: any[] = [];

    for (const payment of pendingPayments) {
        const pending = payment.totalAmount - payment.paidAmount;
        if (remainingAmount <= 0) break;

        const payAmount = Math.min(pending, remainingAmount);

        const installment = await PaymentInstallment.create({
            payment: payment._id,
            customer: customerId,
            billNumber: receiptBillNumber,
            amount: payAmount,
            paymentDate,
            paymentMode,
            paymentReference,
        });


        payment.paidAmount += payAmount;
        payment.pendingAmount = payment.totalAmount - payment.paidAmount;

        if (payment.paidAmount >= payment.totalAmount) {
            payment.paymentStatus = "Paid";
        } else if (payment.paidAmount > 0) {
            payment.paymentStatus = "Partial";
        }

        await payment.save();
        await invalidateCache(`payment:${payment._id}`);

        createdInstallments.push(installment);
        remainingAmount -= payAmount;
    }

    await invalidateCache('installments:*');

    const populatedPayments = await Payment.find({
        _id: { $in: createdInstallments.map(i => i.payment) }
    })
        .populate('products.product')
        .populate('customer');

    res.status(200).json({
        message: 'All pending bills paid successfully',
        result: createdInstallments, payments: populatedPayments, billNumber: receiptBillNumber,
    });
});


