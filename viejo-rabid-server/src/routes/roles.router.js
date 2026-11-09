import { Router } from "express";
import { getUserRole } from "../service/roles.service.js";

const rolesRouter = Router();

// Roles
rolesRouter.get('/auth/role', getUserRole);

export default rolesRouter;