import { Router } from "express";

import {addSale,getSales,deleteSale} from "../service/sales.service.js";

const salesRouter = Router();

salesRouter.get("/sales", getSales);
salesRouter.post("/sales", addSale);
salesRouter.delete("/sales/:id", deleteSale);

export default salesRouter;