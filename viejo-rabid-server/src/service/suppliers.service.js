import { Suppliers } from '../database/models/suppliers.js'

// Post
export const registerSupplier = async (req, res) => {
	try {
		const { suppliersName, email, supplierPhone } = req.body;

		// Verifica si un proveedor ya existe
		const existingUser = await Suppliers.findOne({ where: { suppliersName } })

		if (existingUser)
			return res.status(400).send({ message: "Proveedor existente" })

		// Registro de nuevo usuario
		const registerNewUser = await Suppliers.create({
			suppliersName,
			email,
			supplierPhone,
		});

		return res.status(201).json({
			message: "Proveedor creado correctamente",
			id: registerNewUser.id_supplier
		});

	} catch (error) {
		console.error("Error al registrar proveedor:", error);

		return res.status(500).json({
			message: "Error interno al registrar el proveedor"
		});
	}
}