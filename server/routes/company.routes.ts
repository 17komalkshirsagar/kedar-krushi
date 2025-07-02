

import express from "express";
import * as companyController from "../controllers/company.controller";

const companyRouter = express.Router();

companyRouter
    .post("/create", companyController.createCompany)
    .get("/list", companyController.getCompanies)
    .get("/details/:id", companyController.getCompanyById)
    .put("/update/:id", companyController.updateCompany)
    .delete("/delete/:id", companyController.deleteCompany)
    .patch("/status/:id", companyController.updateCompanyStatus)
    .patch("/company/status/:id", companyController.blockCompany);

export default companyRouter;
