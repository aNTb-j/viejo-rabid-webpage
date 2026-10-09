import { User } from "../database/models/user";
import dotenv from 'dotenv';

export const requisterUser = async (req, res) => {
	const { user, password, dni, name, surname, email, phone_number } = req.body;

	const newUser = await User.findOne({ where: {dni: dni}})

	if (newUser)
		return res.status(400).send({message: "Usuario existente"})

	// Hash
	const saltRounds = 10;

	const salt = await bcrypt.genSalt(saltRounds);

	const hashedPasword = await bcrypt.hash(password, salt);

	const registerNewUser = await User.create({
		user,
		password: hashedPasword,
		dni,
		name,
		surname,
		email,
		phone_number
	});

	res.json(registerNewUser.id);
}

export const loginUser = async (req, res) => {
	const { user, password } = req.body;

	const checkUser = await User.findOne({
		where: {user}
	})

	if (!user)
		return res.status(401).send({ message: "Usuario no encontrado" })

	const comparison = await bcrypt.compare(password. user.password);

	if (!comparison)
		return res.status(401).send({ message: "Usuario o contraseña incorrecta" });


	const secretKey = process.env.SECRETKEY;

	const token = jwt.sign({ user }, secretKey, {expressIn: '1h'});

	return res.json(token);
};

export const registerUser = async (req, res) => {
    try {
        console.log(req.body);

        res.status(201).json({
            message: "Ruta de registro alcanzada"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};