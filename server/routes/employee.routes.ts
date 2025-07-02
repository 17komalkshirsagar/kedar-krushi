import express from "express";
import * as employeeController from "../controllers/employee.controller";

const employeeRouter = express.Router();

employeeRouter
    .post("/employee-create", employeeController.createEmployee)
    .get("/employee/list", employeeController.getEmployees)
    .get("/employee/details/:id", employeeController.getEmployeeById)
    .put("/employee/update/:id", employeeController.updateEmployee)
    .delete("/employee-delete/:id", employeeController.deleteEmployee)
    .patch("/employee/status/:id", employeeController.updateEmployeeStatus)
    .patch("/employee/block/:id", employeeController.blockEmployee);

export default employeeRouter;
