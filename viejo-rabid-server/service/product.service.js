
import { Products } from '../database/models/products.js';
import { Tags } from '../database/models/tags.js';
import { ProductTags } from '../database/models/productTags.js';

Products.belongsToMany(Tags, {
	through: ProductTags,
	foreignKey: 'id_product_fk',
	otherKey: 'id_tag_fk',
	as: 'tags'
});

Tags.belongsToMany(Products, {
	through: ProductTags,
	foreignKey: 'id_tag_fk',
	otherKey: 'id_product_fk',
	as: 'products'
});

/* POST */
export const addProduct = async (req, res) => {
	try {
		const {
			id_supplier_fk,
			intern_code,
			name,
			brand,
			color,
			size,
			stock,
			date,
			tags
		} = req.body;

		// Comprobar si ya existe el código interno
		const existingProduct = await Products.findOne({
			where: { intern_code }
		});

		if (existingProduct) {
			return res.status(400).json({
				message: 'Producto existente'
			});
		}

		// Crear producto
		const newProduct = await Products.create({
			id_supplier_fk,
			intern_code,
			name,
			brand,
			color,
			size,
			stock,
			date
		});

		// Buscar o crear las etiquetas secuencialmente
		if (Array.isArray(tags) && tags.length > 0) {
			const tagInstances = [];

			for (const tagName of tags) {
				const [tagInstance] = await Tags.findOrCreate({
					where: { name: tagName },
					defaults: { name: tagName }
				});

				tagInstances.push(tagInstance);
			}

			if (tagInstances.length > 0) {
				await newProduct.addTags(tagInstances);
			}
		}

		return res.status(201).json({
			message: 'Producto agregado correctamente',
			product: newProduct
		});

	} catch (error) {
		console.error('Error al registrar producto:', error);

		return res.status(500).json({
			message: 'Error interno al registrar el producto'
		});
	}
};
