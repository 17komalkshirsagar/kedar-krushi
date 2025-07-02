import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (payload: object): string => {
    const secretKey = process.env.JWT_KEY;
    const expiry = process.env.JWT_EXPIRY;

    if (!secretKey || !expiry) {
        throw new Error("JWT_KEY and JWT_EXPIRY must be defined");
    }

    const expiresIn = Math.floor(parseInt(expiry) / 1000);

    return jwt.sign(payload, secretKey, { expiresIn });
};

export const generateResetToken = (payload: object): string => {
    const secretKey = process.env.JWT_KEY;
    const expiry = process.env.JWT_RESET_TOKEN_EXPIRY;

    if (!secretKey || !expiry) {
        throw new Error("JWT_KEY and JWT_RESET_TOKEN_EXPIRY must be defined");
    }

    const expiresIn = Math.floor(parseInt(expiry) / 1000);

    return jwt.sign(payload, secretKey, { expiresIn });
};
