import { User } from "../database/models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// GET: Obtener el rol del usuario autenticado
export const getUserRole = async (req, res) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({
				message: "Token no proporcionado"
			});
		}

		const token = authHeader.split(" ")[1];

		// Verificar y decodificar JWT
		const decoded = jwt.verify(token, process.env.SECRETKEY);

		// Buscar unicamente el rol del usuario autenticado
		const user = await User.findOne({
			where: { user: decoded.user },
			attributes: ["role"]
		});

		if (!user) {
			return res.status(404).json({
				message: "Usuario no encontrado"
			});
		}

		return res.status(200).json({
			role: user.role
		});

	} catch (error) {
		console.error("Error al obtener el rol:", error);

		return res.status(401).json({
			message: "Token inválido o vencido"
		});
	}
};