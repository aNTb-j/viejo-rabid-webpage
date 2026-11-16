import { User } from "../database/models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


// Get

// POST - Login
export const loginUser = async (req, res) => {
	try {
		const { user, password } = req.body;

		// Verificar si el usuario existe
		const checkUser = await User.findOne({
			where: { user }
		});

		if (!checkUser) {
			return res.status(401).json({
				error: "user",
				message: "Usuario no encontrado."
			});
		}

		// Comparar contraseña
		const comparison = await bcrypt.compare(
			password,
			checkUser.password
		);

		if (!comparison) {
			return res.status(401).json({
				error: "password",
				message: "Contraseña incorrecta."
			});
		}

		// Generar JWT
		const secretKey = process.env.SECRETKEY;

		if (!secretKey) {
			throw new Error("Falta configurar SECRETKEY");
		}

		const token = jwt.sign(
			{ user: checkUser.user },
			secretKey,
			{ expiresIn: "1h" }
		);

		return res.json({ token });

	} catch (error) {
		console.error("Error al iniciar sesión:", error);

		return res.status(500).json({
			message: "Error interno al iniciar sesión"
		});
	}
};



// Post

export const registerUser = async (req, res) => {
	try {
		const {
			user,
			password,
			dni,
			username,
			surname,
			email,
			birthdate,
			phone_number
		} = req.body;

		// Verificar usuario existente
		const existingUser = await User.findOne({
			where: { user }
		});

		if (existingUser) {
			return res.status(409).json({
				field: 'user',
				message: 'El nombre de usuario ya se encuentra registrado.'
			});
		}

		// Verificar DNI existente
		const existingDni = await User.findOne({
			where: { dni }
		});

		if (existingDni) {
			return res.status(409).json({
				field: 'dni',
				message: 'El DNI ya se encuentra registrado.'
			});
		}

		// Verificar email existente
		const existingEmail = await User.findOne({
			where: { email }
		});

		if (existingEmail) {
			return res.status(409).json({
				field: 'email',
				message: 'El correo electrónico ya se encuentra registrado.'
			});
		}

		// Hasheo de contraseña
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Registrar nuevo usuario
		const registerNewUser = await User.create({
			user,
			password: hashedPassword,
			dni,
			username,
			surname,
			email,
			phone_number,
			birthdate
		});

		return res.status(201).json({
			message: 'Usuario creado correctamente.',
			id: registerNewUser.id_user
		});

	} catch (error) {
		console.error('Error al registrar usuario:', error);

		return res.status(500).json({
			message: 'Error interno al registrar el usuario.'
		});
	}
};
