import { Sales } from "../database/models/sales.js";

// POST
export const addSale = async (req, res) => {
	try {
		const { placeholder } = req.body;

		if (!placeholder?.trim()) {
			return res.status(400).json({
				message: "Debe completar los datos de la venta."
			});
		}

		const newSale = await Sales.create({
			placeholder: placeholder.trim()
		});

		return res.status(201).json({
			message: "Venta registrada correctamente.",
			sale: newSale
		});

	} catch (error) {
		console.error("Error al registrar la venta:", error);

		return res.status(500).json({
			message: "Error al registrar la venta."
		});
	}
};

// GET
export const getSales = async (req, res) => {
	try {
		const sales = await Sales.findAll({
			order: [["id_sales"]]
		});

		return res.status(200).json({ sales });

	} catch (error) {
		console.error("Error al obtener las ventas:", error);

		return res.status(500).json({
			message: "Error al obtener las ventas."
		});
	}
};

// DELETE
export const deleteSale = async (req, res) => {
	try {
		const { id } = req.params;

		const sale = await Sales.findByPk(id);

		if (!sale) {
			return res.status(404).json({
				message: "Venta no encontrada."
			});
		}

		await sale.destroy();

		return res.status(200).json({
			message: "Venta eliminada correctamente."
		});

	} catch (error) {
		console.error("Error al eliminar la venta:", error);

		return res.status(500).json({
			message: "Error al eliminar la venta."
		});
	}
};	