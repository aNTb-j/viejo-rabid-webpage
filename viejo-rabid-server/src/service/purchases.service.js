
import { sequelize } from "../database/db.js";

import { Suppliers } from "../database/models/suppliers.js";
import { ProductList } from "../database/models/productsList.js";
import { SuppliersProducts } from "../database/models/suppliersProducts.js";
import { Purchases } from "../database/models/purchases.js";
import { PurchaseItems } from "../database/models/purchaseItems.js";
import { Products } from "../database/models/products.js";

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
		const { id_supplier_fk, products } = req.body;

		// Validación inicial
		if (
			!id_supplier_fk ||
			!Array.isArray(products) ||
			products.length === 0
		) {
			await transaction.rollback();

			return res.status(400).json({
				message: "Se requiere un proveedor y al menos un producto."
			});
		}

		// Verificar proveedor
		const supplier = await Suppliers.findByPk(id_supplier_fk, {
			transaction
		});

		//if (!supplier) {
		//	await transaction.rollback();

		//	return res.status(404).json({
		//		message: "El proveedor no existe."
		//	});
		//}

		const purchaseDate = new Date();

		for (const product of products) {
			const {
				intern_code,
				name,
				brand,
				color,
				size,
				price,
				stock
			} = product;

			// Validar datos del producto
			if (
				!name?.trim() ||
				!brand?.trim() ||
				!color?.trim() ||
				!size?.trim() ||
				!Number.isInteger(Number(stock)) ||
				Number(stock) < 1 ||
				!Number.isFinite(Number(price)) ||
				Number(price) < 0
			) {
				throw new Error("Uno de los productos contiene datos inválidos.");
			}

			// Buscar variante existente
			const existingProduct = await Products.findOne({
				where: {
					intern_code,
					size,
					color
				},
				transaction
			});

			if (existingProduct) {
				// Incrementar stock
				await existingProduct.update({
					stock: existingProduct.stock + Number(stock),
					price: Number(price),
					date: purchaseDate
				}, { transaction });

			} else {
				// Crear nuevo producto
				await Products.create({
					id_supplier_fk,
					intern_code,
					name,
					brand,
					color,
					size,
					price: Number(price),
					stock: Number(stock),
					date: purchaseDate
				}, { transaction });
			}
		}

		await transaction.commit();

		return res.status(201).json({
			message: "Compra registrada correctamente."
		});

	} catch (error) {
		if (!transaction.finished) {
			await transaction.rollback();
		}

		console.error("Error al registrar la compra:", error);

		return res.status(500).json({
			message: error.message || "Error interno al registrar la compra."
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
