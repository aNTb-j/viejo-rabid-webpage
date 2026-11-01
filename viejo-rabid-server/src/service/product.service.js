
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
			price,
			stock,
			date,
			tags
		} = req.body;

		const existingProduct = await Products.findOne({
			where: { intern_code }
		});

		if (existingProduct) {
			return res.status(400).json({
				message: 'Producto existente'
			});
		}

		const newProduct = await Products.create({
			id_supplier_fk,
			intern_code,
			name,
			brand,
			color,
			size,
			price,
			stock,
			date
		});

		if (Array.isArray(tags) && tags.length > 0) {
			const tagInstances = [];

			for (const tagName of tags) {
				const [tagInstance] = await Tags.findOrCreate({
					where: { name: tagName },
					defaults: { name: tagName }
				});

				tagInstances.push(tagInstance);
			}

			await newProduct.addTags(tagInstances);
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

/* GET */
export const getAllProducts = async (req, res) => {
	try {
		const products = await Products.findAll({
			include: [{
				model: Tags,
				as: 'tags',
				through: {
					attributes: []
				}
			}]
		});

		return res.json(products);

	} catch (error) {
		console.error('Error al obtener productos:', error);

		return res.status(500).json({
			message: 'Error al obtener los productos'
		});
	}
};

/* PUT */
export const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;

		const {
			id_supplier_fk,
			intern_code,
			name,
			brand,
			color,
			size,
			price,
			stock,
			date,
			tags
		} = req.body;

		const product = await Products.findByPk(id);

		if (!product) {
			return res.status(404).json({
				message: 'Producto no encontrado'
			});
		}

		// Comprobar que el código interno no pertenezca a otro producto
		if (intern_code) {
			const existingProduct = await Products.findOne({
				where: { intern_code }
			});

			if (
				existingProduct &&
				Number(existingProduct.id_product) !== Number(id)
			) {
				return res.status(400).json({
					message: 'El código interno ya está en uso'
				});
			}
		}

		await product.update({
			id_supplier_fk,
			intern_code,
			name,
			brand,
			color,
			size,
			price,
			stock,
			date
		});

		// Actualizar las etiquetas
		if (Array.isArray(tags)) {
			const tagInstances = [];

			for (const tagName of tags) {
				const [tagInstance] = await Tags.findOrCreate({
					where: { name: tagName },
					defaults: { name: tagName }
				});

				tagInstances.push(tagInstance);
			}

			await product.setTags(tagInstances);
		}

		return res.json({
			message: 'Producto actualizado correctamente',
			product
		});

	} catch (error) {
		console.error('Error al actualizar producto:', error);

		return res.status(500).json({
			message: 'Error interno al actualizar el producto'
		});
	}
};

/* DELETE */
export const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;

		const product = await Products.findByPk(id);

		if (!product) {
			return res.status(404).json({
				message: 'Producto no encontrado'
			});
		}

		// Eliminar relaciones con etiquetas
		await product.setTags([]);

		// Eliminar producto
		await product.destroy();

		return res.json({
			message: 'Producto eliminado correctamente'
		});

	} catch (error) {
		console.error('Error al eliminar producto:', error);

		return res.status(500).json({
			message: 'Error interno al eliminar el producto'
		});
	}
};
