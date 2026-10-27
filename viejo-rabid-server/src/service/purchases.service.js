
import { sequelize } from "../database/db.js";

import { Suppliers } from "../database/models/suppliers.js";
import { ProductList } from "../database/models/productsList.js";
import { SuppliersProducts } from "../database/models/suppliersProducts.js";
import { Purchases } from "../database/models/purchases.js";
import { PurchaseItems } from "../database/models/purchaseItems.js";

// Asociaciones
Suppliers.belongsToMany(ProductList, {
	through: SuppliersProducts,
	foreignKey: "id_supplier_fk",
	otherKey: "id_product_list_fk",
	sourceKey: "id_supplier",
	targetKey: "id_product_list",
	as: "productList"
});

ProductList.belongsToMany(Suppliers, {
	through: SuppliersProducts,
	foreignKey: "id_product_list_fk",
	otherKey: "id_supplier_fk",
	sourceKey: "id_product_list",
	targetKey: "id_supplier",
	as: "suppliers"
});

Suppliers.hasMany(Purchases, {
	foreignKey: "id_supplier_fk",
	sourceKey: "id_supplier",
	as: "purchases"
});

Purchases.belongsTo(Suppliers, {
	foreignKey: "id_supplier_fk",
	targetKey: "id_supplier",
	as: "supplier"
});

Purchases.hasMany(PurchaseItems, {
	foreignKey: "id_purchase_fk",
	as: "items"
});

PurchaseItems.belongsTo(Purchases, {
	foreignKey: "id_purchase_fk",
	as: "purchase"
});

PurchaseItems.belongsTo(ProductList, {
	foreignKey: "id_product_list_fk",
	as: "catalogProduct"
});

// POST /purchases
export const addPurchase = async (req, res) => {
	const transaction = await sequelize.transaction();

	try {
		const { id_supplier_fk, items } = req.body;

		if (!id_supplier_fk || !Array.isArray(items) || items.length === 0) {
			await transaction.rollback();

			return res.status(400).json({
				message: "Se requiere un proveedor y al menos un artículo."
			});
		}

		const supplier = await Suppliers.findByPk(id_supplier_fk, {
			transaction
		});

		if (!supplier) {
			await transaction.rollback();

			return res.status(404).json({
				message: "El proveedor no existe."
			});
		}

		// Validar todos los artículos antes de crear la compra
		const validatedItems = [];

		for (const item of items) {
			const { id_product_list_fk, amount, price } = item;

			if (
				!Number.isInteger(Number(amount)) ||
				Number(amount) < 1 ||
				!Number.isFinite(Number(price)) ||
				Number(price) < 0
			) {
				await transaction.rollback();

				return res.status(400).json({
					message: "Cada artículo debe tener una cantidad entera positiva y un precio válido."
				});
			}

			const product = await ProductList.findByPk(
				id_product_list_fk,
				{ transaction }
			);

			if (!product) {
				await transaction.rollback();

				return res.status(400).json({
					message: `No existe el artículo del catálogo ${id_product_list_fk}.`
				});
			}

			// Verificar que el artículo esté asociado a ese proveedor
			const supplierProduct = await SuppliersProducts.findOne({
				where: {
					id_supplier_fk,
					id_product_list_fk
				},
				transaction
			});

			if (!supplierProduct) {
				await transaction.rollback();

				return res.status(400).json({
					message: `El artículo ${id_product_list_fk} no pertenece al catálogo de este proveedor.`
				});
			}

			validatedItems.push({
				id_product_list_fk: product.id_product_list,
				cod_producto: product.cod_producto,
				talle: product.talle,
				color: product.color,
				price: Number(price),
				amount: Number(amount)
			});
		}

		// Crear cabecera: permanece pendiente
		const purchase = await Purchases.create(
			{
				id_supplier_fk,
				status: "pending"
			},
			{ transaction }
		);

		// Crear líneas de la compra
		await PurchaseItems.bulkCreate(
			validatedItems.map(item => ({
				id_purchase_fk: purchase.id_purchases,
				...item
			})),
			{ transaction }
		);

		await transaction.commit();

		return res.status(201).json({
			message: "Compra guardada como pendiente.",
			purchase: {
				id_purchases: purchase.id_purchases,
				id_supplier_fk: purchase.id_supplier_fk,
				status: purchase.status,
				items: validatedItems
			}
		});
	} catch (error) {
		if (!transaction.finished) {
			await transaction.rollback();
		}

		console.error("Error al crear la compra:", error);

		return res.status(500).json({
			message: "Error interno al crear la compra."
		});
	}
};

// GET /purchases
export const getAllPurchases = async (req, res) => {
	try {
		const purchases = await Purchases.findAll({
			include: [
				{
					model: Suppliers,
					as: "supplier"
				},
				{
					model: PurchaseItems,
					as: "items",
					include: [
						{
							model: ProductList,
							as: "catalogProduct"
						}
					]
				}
			],
			order: [["created_at", "DESC"]]
		});

		return res.status(200).json(purchases);
	} catch (error) {
		console.error("Error al obtener las compras:", error);

		return res.status(500).json({
			message: "Error al obtener las compras."
		});
	}
};
