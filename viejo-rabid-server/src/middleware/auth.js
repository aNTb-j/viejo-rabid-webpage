import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
	const header = req.header("Authorization") || "";
	const token = header.split(" ")[1];

	if (!token) {
		return res.status(403).json({
			message: "No está autorizado"
		});
	}

	try {
		const payload = jwt.verify(token, process.env.SECRETKEY);

		req.user = payload;

		next();

	} catch (error) {
		console.error("Error verificando JWT:", error.message);

		return res.status(401).json({
			message: "Token inválido o expirado"
		});
	}
};