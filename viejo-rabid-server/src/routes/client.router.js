import { Router } from "express";
import { getUserRole } from "../service/client.service.js";

const clientRouter = Router();

// Roles


clientRouter.get('/auth/role', getUserRole);

export default clientRouter;