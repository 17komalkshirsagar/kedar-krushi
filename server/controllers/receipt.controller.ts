
// import { Request, Response, NextFunction } from "express";
// import asyncHandler from "express-async-handler";
// import puppeteer from "puppeteer";
// import nodemailer from "nodemailer";
// import { Buffer } from "buffer";
// import { ReceiptEmail } from "../models/ReceiptEmail";
// import { invalidateCache } from "../utils/redisMiddleware";

// const generatePdfFromHtml = async (html: string): Promise<Buffer> => {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();

//     await page.setContent(html, { waitUntil: "networkidle0" });

//     const pdf = await page.pdf({
//         printBackground: true,
//         preferCSSPageSize: true,
//     });

//     await browser.close();
//     return Buffer.from(pdf);
// };

// const sendEmailWithPdf = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//         const { to, subject, pdfBuffer, billNumber } = req.body;

//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.FROM_EMAIL,
//                 pass: process.env.FROM_PASS,
//             },
//         });

//         await transporter.sendMail({
//             from: `"केदार कृषी सेवा केंद्र" <${process.env.FROM_EMAIL}>`,
//             to,
//             subject: `Receipt from केदार कृषी सेवा केंद्र - बिल नं ${billNumber}`,
//             text: "Please find your receipt attached.",
//             attachments: [
//                 {
//                     filename: "receipt.pdf",
//                     content: pdfBuffer,
//                     contentType: "application/pdf",
//                 },
//             ],
//         });
//     }
// );

// export const sendReceiptEmail = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction): Promise<any> => {
//         const { to, subject, html, billNumber } = req.body;
//         if (!to || !subject || !html) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing required fields (to, subject, html)",
//             });
//         }
//         const pdfBuffer = await generatePdfFromHtml(html);
//         req.body.pdfBuffer = pdfBuffer;

//         await sendEmailWithPdf(req, res, next);
//         await ReceiptEmail.create({
//             customerEmail: to,
//             subject, html, billNumber, status: "sent",
//         });

//         invalidateCache("receiptemail:*");

//         res.status(200).json({
//             success: true, message: "📧 Receipt sent to customer successfully.", result: { to, subject, billNumber },
//         });
//     }
// );



import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import puppeteer from "puppeteer";
import nodemailer from "nodemailer";
import { Buffer } from "buffer";
import { ReceiptEmail } from "../models/ReceiptEmail";

const generatePdfFromHtml = async (html: string): Promise<Buffer> => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
        printBackground: true,
        preferCSSPageSize: true,
    });

    await browser.close();
    return Buffer.from(pdf);
};

const sendEmailWithPdf = async (
    to: string,
    subject: string,
    pdfBuffer: Buffer,
    billNumber: string
) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.FROM_PASS,
        },
    });

    await transporter.sendMail({
        from: `"केदार कृषी सेवा केंद्र" <${process.env.FROM_EMAIL}>`,
        to,
        subject,
        text: "Please find your receipt attached.",
        attachments: [
            {
                filename: "receipt.pdf",
                content: pdfBuffer,
                contentType: "application/pdf",
            },
        ],
    });
};

export const sendReceiptEmail = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { to, subject, html, billNumber } = req.body;

    if (!to || !subject || !html) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields (to, subject, html)",
        });
    }

    const pdfBuffer = await generatePdfFromHtml(html);
    await sendEmailWithPdf(to, subject, pdfBuffer, billNumber);

    await ReceiptEmail.create({
        customerEmail: to,
        subject,
        html,
        billNumber,
        status: "sent",
    });

    res.status(200).json({
        success: true,
        message: "📧 Receipt sent to customer successfully.",
        result: { to, subject, billNumber },
    });
});
