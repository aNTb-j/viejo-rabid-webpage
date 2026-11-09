import { User } from "../database/models/user.js";

// GET
// Obtiene los datos del usuario autenticado
export const getClient = async (req, res) => {
	try {
		const userAccess = req.user.user;

		const user = await User.findOne({
			where: { user: userAccess },
			attributes: [
				"id_user",
				"user",
				"username",
				"surname",
				"email",
				"dni",
				"birthdate",
				"phone_number",
				"role"
			]
		});
		console.log(user)
		if (!user) {
			return res.status(404).json({
				message: "Usuario no encontrado."
			});
		}

		return res.status(200).json(user);

	} catch (error) {
		console.error("Error al obtener usuario:", error);

		return res.status(500).json({
			message: "Error al obtener los datos del usuario."
		});
	}
};

// PATCH: Editar nombre de usuario
// PATCH: Editar nombre de acceso
export const editUserName = async (req, res) => {
	try {
		const { user: newUser } = req.body;
		const currentUser = req.user.user;

		if (!newUser || !newUser.trim()) {
			return res.status(400).json({
				message: "El nombre de usuario es obligatorio."
			});
		}

		const user = await User.findOne({
			where: { user: currentUser }
		});

		if (!user) {
			return res.status(404).json({
				message: "Usuario no encontrado."
			});
		}

		// Comprobar que el nuevo nombre no esté ocupado
		const existingUser = await User.findOne({
			where: { user: newUser.trim() }
		});

		if (existingUser && existingUser.id_user !== user.id_user) {
			return res.status(409).json({
				message: "Ese nombre de usuario ya está en uso."
			});
		}

		user.user = newUser.trim();
		await user.save();

		// Generar nuevo token
		const token = jwt.sign(
			{ user: user.user },
			process.env.SECRETKEY,
			{ expiresIn: "1h" }
		);

		return res.status(200).json({
			message: "Nombre de acceso actualizado correctamente.",
			user: user.user,
			token
		});

	} catch (error) {
		console.error("Error al actualizar usuario:", error);

		return res.status(500).json({
			message: "Error al actualizar el nombre de acceso."
		});
	}
};	


// DELETE: Eliminar cuenta
export const deleteAccount = async (req, res) => {
	try {
		const userId = req.user.id;

		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).json({
				message: "Usuario no encontrado."
			});
		}

		await user.destroy();

		return res.status(200).json({
			message: "Cuenta eliminada correctamente."
		});

	} catch (error) {
		return res.status(500).json({
			message: "Error al eliminar la cuenta.",
			error: error.message
		});
	}
};