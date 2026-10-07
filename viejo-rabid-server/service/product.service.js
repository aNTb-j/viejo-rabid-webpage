import { Products } from "../database/models/products";


/* Post */

export const createProduct = async (res, req) => {
	const { name, size, color, brand, stock } = req.body;
	//const { tags } = 

	const newProduct = Products.create({
		name,
		id_supplier_fk,
		id_tags_fk,
		size,
		color,
		brand,
		stock
	})

}



/* Get */

export const findProducts = async (req, res) => {
	const products = await Products.findAll();
	res.json(products);
};

export const findProduct = async (req, res) => {
	const { id } = req.params.id;
	const product = await Products.findOne({ where: {id: id}});

	if (!product)
		res.status(404).send({ message: "Producto no encontrado" })

	res.json(products);
};