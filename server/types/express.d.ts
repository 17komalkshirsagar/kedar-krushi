
import express from "express";
import { IAdminProtected } from "../../server/controllers/auth.controller";

declare global {
    namespace Express {
        interface Request {
            admin?: IAdminProtected;
        }
    }
}
