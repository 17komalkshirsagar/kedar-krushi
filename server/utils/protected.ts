import { NextFunction, Request, Response } from "express"
import passport from "../services/passport";
import dotenv from "dotenv"

dotenv.config()

export interface IAdminProtected {
    adminId: string;
    role: string;

    [key: string]: any;
}

export const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("jwt", { session: false }, async (err: Error, admin: any, info: any) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error", error: err.message });
        }

        if (!admin) {
            return res.status(401).json({ message: "Unauthorized: Invalid or missing token", info });
        }

        req.admin = admin
        next()
    })(req, res, next)
};

export const restrict = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): any => {
        const admin = req.admin as IAdminProtected
        if (!admin || !roles.includes(admin.role)) {
            return res.status(403).json({ message: "You don't have permission to perform this action" })
        }
        next()
    }
}
