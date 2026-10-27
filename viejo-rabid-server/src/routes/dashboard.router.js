import { Router } from "express";

import { addProduct, getAllProducts } from "../service/product.service.js";

const dashboardRouter = Router();

// dashboard

dashboardRouter.post("/dashboard", addProduct)
dashboardRouter.get("/dashboard", getAllProducts)




export default dashboardRouter;