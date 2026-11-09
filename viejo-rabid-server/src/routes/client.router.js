import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { getClient, deleteAccount, editUserName } from "../service/client.service.js";

const clientRouter = Router();

// client

clientRouter.get("/client", verifyToken, getClient);
clientRouter.delete("/client",verifyToken, deleteAccount);
clientRouter.patch("/client",verifyToken, editUserName);


export default clientRouter;