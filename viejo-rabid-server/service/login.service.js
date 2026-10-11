import { User } from "../database/models/user.js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'; 


// Post
export const registerUser = async (req, res) => {
	try {
		const { user, password, dni, username, surname, email, birthdate, phone_number } = req.body;

		const existingUser = await User.findOne({ where: { dni } })

		if (existingUser)
			return res.status(400).send({ message: "Usuario existente" })

		
		// Hash
		const saltRounds = 10;

		const salt = await bcrypt.genSalt(saltRounds);

		const hashedPasword = await bcrypt.hash(password, salt);

		const registerNewUser = await User.create({
			user,
			password: hashedPasword,
			dni,
			username,
			surname,
			email,
			phone_number,
			birthdate
		});

		return res.status(201).json({
			message: "Usuario creado correctamente",
			id: registerNewUser.id_user
		});

	} catch (error) {
		console.error("Error al registrar usuario:", error);
		
		return res.status(500).json({
			message: "Error interno al registrar el usuario"
		});
	}
}


// Get
export const loginUser = async (req, res) => {
	const { user, password } = req.body;

	const checkUser = await User.findOne({
		where: { user }
	})

	if (!user)
		return res.status(401).send({ message: "Usuario no encontrado" })

	const comparison = await bcrypt.compare(password.user.password);

	if (!comparison)
		return res.status(401).send({ message: "Usuario o contraseña incorrecta" });


	const secretKey = process.env.SECRETKEY;

	const token = jwt.sign({ user }, secretKey, { expressIn: '1h' });

	return res.json(token);
};

