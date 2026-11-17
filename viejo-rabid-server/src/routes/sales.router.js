import { Router } from "express";

import {addSale, getSales, deleteSale, updateSale} from "../service/sales.service.js";

const salesRouter = Router();

salesRouter.get("/sales", getSales);
salesRouter.post("/sales", addSale);
salesRouter.delete("/sales/:id", deleteSale);
salesRouter.put("/sales/:id", updateSale);


export default salesRouter;