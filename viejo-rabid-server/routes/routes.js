import { Router } from "express";

const router = Router();

router.get('/login', (req, res) => {
	res.send("Pagina Login")
})


router.get('/home', (req, res) => {
	res.send("Pagina Home")
})

export default router;