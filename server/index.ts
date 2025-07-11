import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cron from "node-cron";
import passport from "./services/passport";
import redisClient from "./services/redisClient";
import { protectedRoute } from "./utils/protected";
import { app, server } from "./utils/socket";
import authRouter from "./routes/auth.routes";
import companyRouter from "./routes/company.routes";
import customerRouter from "./routes/customer.routes";
import supplierRouter from "./routes/supplier.routes";
import productRouter from "./routes/product.routes";
import employeeRouter from "./routes/employee.routes";
import deliveryRouter from "./routes/delivery.routes";
import notificationLogRouter from "./routes/notificationLog.routes";
import paymentRouter from "./routes/payment.routes";
import receiptEmailRouter from "./routes/receipt.routes";
import batchRouter from "./routes/batch.routes";
import paymentInstallmentRouter from "./routes/paymentinstallment.router";
// import rateLimit from "express-rate-limit";

dotenv.config()
app.use(express.json())
// app.use(express.static("dist"))
app.use(morgan("dev"))

// app.use(rateLimit({
//     windowMs: 1000 * 60 * 15,
//     max: 50,
//     message: "We have received to many request from this IP. Please try after 15 minutes."
// }))

app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(passport.initialize())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://kedar-client-fplsxt9pv-17komalkshirsagars-projects.vercel.app");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/company", companyRouter)
app.use("/api/v1/customer", customerRouter)
app.use("/api/v1/delivery", deliveryRouter)
app.use("/api/v1/notification-log", notificationLogRouter)
app.use("/api/v1/payment", paymentRouter)
app.use("/api/v1/employee", employeeRouter)
app.use("/api/v1/supplier", supplierRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/send-receipt", receiptEmailRouter)
app.use("/api/v1/batch", batchRouter)
app.use("/api/v1/payment-installment", paymentInstallmentRouter)



redisClient.on("connect", () => {
    console.log('Connected to Redis');
})

app.use((req: Request, res: Response, next: NextFunction) => {
    // res.sendFile(path.join(__dirname, "dist", "index.html"))
    res.status(404).json({ message: "Resource not found", });
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: "Something went wrong", error: err.message });
})

mongoose.connect(process.env.MONGO_URL || "").catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
});



const PORT = process.env.PORT || 5000
mongoose.connection.once("open", async () => {
    console.log("MongoDb Connected")
    server.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`)
    });
});

