import { Router } from "express";
import { registerSupplier } from "../service/suppliers.service.js";

const supplierRouter = Router();

// purchases

supplierRouter.post("/suppliers", registerSupplier);

export default supplierRouter;
