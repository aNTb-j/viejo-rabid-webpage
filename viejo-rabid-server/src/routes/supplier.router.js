import { Router } from "express";
import { registerSupplier, importSupplierProducts, getSuppliers, deleteSupplier } from "../service/suppliers.service.js";

const supplierRouter = Router();

// purchases

supplierRouter.post("/suppliers", registerSupplier);

// Importar lista de productos CSV
supplierRouter.post("/suppliers/products", importSupplierProducts);

supplierRouter.get("/suppliers", getSuppliers)

supplierRouter.delete("/suppliers/:id", deleteSupplier);

export default supplierRouter;

