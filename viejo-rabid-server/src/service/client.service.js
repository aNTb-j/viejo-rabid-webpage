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


// PATCH: Editar nombre de acceso
export const editUserEmail = async (req, res) => {
	try {
		const { email } = req.body;
		const currentUser = req.user.user;

		if (!email || !email.trim()) {
			return res.status(400).json({
				message: "El email es obligatorio."
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

		const existingEmail = await User.findOne({
			where: { email: email.trim() }
		});

		if (existingEmail && existingEmail.id_user !== user.id_user) {
			return res.status(409).json({
				message: "Ese email ya está registrado."
			});
		}

		user.email = email.trim();
		await user.save();

		return res.status(200).json({
			message: "Email actualizado correctamente.",
			email: user.email
		});

	} catch (error) {
		console.error("Error al actualizar email:", error);

		return res.status(500).json({
			message: "Error al actualizar el email."
		});
	}
};


// DELETE: Eliminar cuenta
export const deleteAccount = async (req, res) => {
	try {
		const currentUser = req.user.user;

		const user = await User.findOne({
			where: { user: currentUser }
		});

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
		console.error("Error al eliminar cuenta:", error);

		return res.status(500).json({
			message: "Error al eliminar la cuenta.",
			error: error.message
		});
	}
};