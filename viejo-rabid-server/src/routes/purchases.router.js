import { Router } from "express";
import { addPurchase, getAllPurchases } from "../service/purchases.service.js";

const purchasesRouter = Router();

// purchases

purchasesRouter.post("/purchases", addPurchase);
purchasesRouter.get("/purchases", getAllPurchases);

export default purchasesRouter;




