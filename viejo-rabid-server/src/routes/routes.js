import { Router } from "express";

import { loginUser, registerUser } from "../service/login.service.js";
import { addProduct, getAllProducts } from "../service/product.service.js";
import { getAllTags, getAllTagGroups, createTagGroup } from "../service/definer.service.js";

import { verifyToken } from '../middleware/auth.js';


const router = Router();

// login

router.post("/login", loginUser)

router.post("/register", registerUser)

// dashboard

router.post("/dashboard", addProduct)

router.get("/dashboard", getAllProducts)

// layoutdefiner

router.get('/layoutdef', getAllTags);
router.post('/layoutdef', createTagGroup);
router.get('/taggroups', getAllTagGroups);

export default router;




