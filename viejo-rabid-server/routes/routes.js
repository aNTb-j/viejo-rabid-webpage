import { Router } from "express";

import { registerUser } from "../service/login.service.js";
import { addProduct } from "../service/product.service.js";

const router = Router();

router.post("/register", registerUser)

router.post("/dashboard", addProduct)


export default router;




