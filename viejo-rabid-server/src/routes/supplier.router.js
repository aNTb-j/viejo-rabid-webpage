import { Router } from "express";
import { registerSupplier, importSupplierProducts, getSuppliers } from "../service/suppliers.service.js";

const supplierRouter = Router();

// purchases

supplierRouter.post("/suppliers", registerSupplier);

// Importar lista de productos CSV
supplierRouter.post("/suppliers/products", importSupplierProducts);

supplierRouter.get("/suppliers", getSuppliers)

export default supplierRouter;

