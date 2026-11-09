import { Suppliers } from '../database/models/suppliers.js'
import { ProductList } from '../database/models/productsList.js';
import { sequelize } from '../database/db.js';


const parseCSV = (buffer) => {
	const content = buffer.toString('utf-8');

	const lines = content
		.replace(/^\uFEFF/, '')
		.split(/\r?\n/)
		.filter(line => line.trim() !== '');

	const headers = lines[0]
		.split(',')
		.map(header => header.trim());

	return lines.slice(1).map(line => {
		const values = line.split(',');

		return Object.fromEntries(
			headers.map((header, index) => [
				header,
				values[index]?.trim() ?? ''
			])
		);
	});
};


// POST /suppliers
export const registerSupplier = async (req, res) => {
	try {
		const { suppliersName, email, supplierPhone } = req.body;

		const existingSupplier = await Suppliers.findOne({
			where: { suppliersName }
		});

		if (existingSupplier) {
			return res.status(400).json({
				message: 'Proveedor existente'
			});
		}

		const newSupplier = await Suppliers.create({
			suppliersName,
			email,
			supplierPhone,
		});

		return res.status(201).json({
			message: 'Proveedor creado correctamente',
			id: newSupplier.id_supplier
		});

	} catch (error) {
		console.error('Error al registrar proveedor:', error);

		return res.status(500).json({
			message: 'Error interno al registrar el proveedor'
		});
	}
};

export const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Suppliers.findAll();

        return res.status(200).json(suppliers);

    } catch (error) {
        console.error("Error al obtener proveedores:", error);

        return res.status(500).json({
            message: "Error al obtener proveedores."
        });
    }
};

// POST /suppliers/products
export const importSupplierProducts = async (req, res) => {
	try {
		const { id_supplier_fk, csv } = req.body;

		if (!csv || !csv.trim()) {
			return res.status(400).json({
				message: 'Debe seleccionar un archivo CSV.'
			});
		}

		const products = parseCSV(csv);

		const supplierId = Number(id_supplier_fk);

		if (!Number.isInteger(supplierId) || supplierId <= 0) {
			return res.status(400).json({
				message: 'ID de proveedor inválido.'
			});
		}

		const supplier = await Suppliers.findByPk(supplierId);

		if (!supplier) {
			return res.status(404).json({
				message: 'Proveedor no encontrado.'
			});
		}

		const requiredColumns = [
			'cod_producto',
			'talle',
			'color',
			'precio'
		];

		const headers = Object.keys(products[0]);

		const validHeaders = requiredColumns.every(
			column => headers.includes(column)
		);

		if (!validHeaders) {
			return res.status(400).json({
				message: 'El CSV debe contener: cod_producto, talle, color y precio.'
			});
		}

		// 5. Validar y transformar productos
		const formattedProducts = products.map((product, index) => {
			const codProducto = Number(product.cod_producto);
			const precio = Number(product.precio);

			if (
				!Number.isInteger(codProducto) ||
				codProducto <= 0 ||
				!product.talle ||
				!product.color ||
				!Number.isInteger(precio) ||
				precio < 0
			) {
				throw new Error(
					`Datos inválidos en la fila ${index + 2}.`
				);
			}

			return {
				id_supplier_fk: supplierId,
				cod_producto: codProducto,
				talle: product.talle,
				color: product.color,
				precio
			};
		});

		// 6. Reemplazar lista anterior
		await sequelize.transaction(async (transaction) => {

			await ProductList.destroy({
				where: {id_supplier_fk: supplierId},
				transaction
			});

			await ProductList.bulkCreate(formattedProducts, {
				transaction
			});

		});

		// 7. Respuesta
		return res.status(200).json({
			message: 'Productos importados correctamente.',
			imported: formattedProducts.length
		});

	} catch (error) {
		console.error('Error al importar productos:', error);

		return res.status(500).json({
			message: error.message || 'Error al importar los productos.'
		});
	}
};
