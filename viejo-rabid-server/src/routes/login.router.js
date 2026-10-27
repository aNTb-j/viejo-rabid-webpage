import { Router } from "express";

import { loginUser, registerUser } from "../service/login.service.js";

const loginRouter = Router();

// login

loginRouter.post("/login", loginUser)
loginRouter.post("/register", registerUser)

export default loginRouter;