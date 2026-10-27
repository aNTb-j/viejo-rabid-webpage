
import { useState } from 'react';
import { Form, Button, Table, Alert } from 'react-bootstrap';

import { GenericForm } from '../../../../shared/forms/GenericForm';

import styles from './PurchaseForm.module.css';

const initialProduct = {
	intern_code: '',
	name: '',
	brand: '',
	color: '',
	size: '',
	price: '',
	stock: '',
};

const PurchaseForm = () => {
	const [idSupplier, setIdSupplier] = useState('');
	const [product, setProduct] = useState(initialProduct);
	const [products, setProducts] = useState([]);
	const [message, setMessage] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleProductChange = (e) => {
		const { name, value } = e.target;

		setProduct(prev => ({
			...prev,
			[name]: value,
		}));
	};

	// Agrega un producto a la compra pendiente, sin guardarlo todavía
	const handleAddProduct = (event) => {
		event.preventDefault();
		setMessage('');

		if (!idSupplier.trim()) {
			setMessage('Ingresá el ID del proveedor.');
			setError(true);
			return;
		}

		if (
			!product.intern_code ||
			!product.name.trim() ||
			product.price === '' ||
			product.stock === ''
		) {
			setMessage('Completá el código, nombre, precio y cantidad.');
			setError(true);
			return;
		}

		if (
			Number(product.price) < 0 ||
			Number(product.stock) <= 0
		) {
			setMessage('El precio no puede ser negativo y la cantidad debe ser mayor a cero.');
			setError(true);
			return;
		}

		const newProduct = {
			...product,
			intern_code: Number(product.intern_code),
			price: Number(product.price),
			stock: Number(product.stock),
		};

		setProducts(prev => [...prev, newProduct]);
		setProduct(initialProduct);
		setMessage('Producto agregado a la compra pendiente.');
		setError(false);
	};

	const handleRemoveProduct = (indexToRemove) => {
		setProducts(prev =>
			prev.filter((_, index) => index !== indexToRemove)
		);
	};

	const total = products.reduce(
		(sum, item) => sum + item.price * item.stock,
		0
	);

	// Envía la compra completa al backend
	const handleConfirmPurchase = async () => {
		if (!idSupplier.trim() || products.length === 0) {
			setMessage('Seleccioná un proveedor y agregá al menos un producto.');
			setError(true);
			return;
		}

		try {
			setLoading(true);
			setMessage('');

			const response = await fetch(
				'http://localhost:3000/purchases',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						id_supplier_fk: Number(idSupplier),
						products,
					}),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || 'No se pudo registrar la compra.'
				);
			}

			setProducts([]);
			setIdSupplier('');
			setMessage('Compra registrada correctamente.');
			setError(false);
		} catch (err) {
			console.error('Error al registrar la compra:', err);
			setMessage(
				err.message || 'Error de conexión con el servidor.'
			);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.purchaseContainer}>
			<h5>Registrar compra</h5>
			<p>Seleccioná el proveedor y agregá los productos.</p>

			<Form onSubmit={handleAddProduct}>
				<GenericForm
					id="idSupplier"
					name="idSupplier"
					label="ID del proveedor"
					type="number"
					placeholder="Ingresar ID del proveedor"
					value={idSupplier}
					onChange={e => setIdSupplier(e.target.value)}
					error=""
					className={styles.field}
				/>

				<hr />
				<h6>Producto</h6>

				<GenericForm
					id="intern_code"
					name="intern_code"
					label="Código del producto"
					type="number"
					value={product.intern_code}
					onChange={handleProductChange}
					placeholder="Código interno"
					error=""
					className={styles.field}
				/>

				<GenericForm
					id="name"
					name="name"
					label="Nombre"
					value={product.name}
					onChange={handleProductChange}
					placeholder="Nombre del producto"
					error=""
					className={styles.field}
				/>

				<GenericForm
					id="brand"
					name="brand"
					label="Marca"
					value={product.brand}
					onChange={handleProductChange}
					placeholder="Marca"
					error=""
					className={styles.field}
				/>

				<GenericForm
					id="color"
					name="color"
					label="Color"
					value={product.color}
					onChange={handleProductChange}
					placeholder="Color"
					error=""
					className={styles.field}
				/>

				<GenericForm
					id="size"
					name="size"
					label="Talle"
					value={product.size}
					onChange={handleProductChange}
					placeholder="Talle"
					error=""
					className={styles.field}
				/>

				<GenericForm
					id="price"
					name="price"
					label="Precio unitario"
					type="number"
					value={product.price}
					onChange={handleProductChange}
					placeholder="Precio"
					error=""
					className={styles.field}
				/>

				<GenericForm
					id="stock"
					name="stock"
					label="Cantidad"
					type="number"
					value={product.stock}
					onChange={handleProductChange}
					placeholder="Cantidad a comprar"
					error=""
					className={styles.field}
				/>

				<Button type="submit" variant="secondary">
					Agregar producto
				</Button>
			</Form>

			<hr />

			<h6>Productos de la compra pendiente</h6>

			<Table responsive hover>
				<thead>
					<tr>
						<th>Producto</th>
						<th>Talle</th>
						<th>Precio</th>
						<th>Cantidad</th>
						<th>Subtotal</th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{products.length === 0 ? (
						<tr>
							<td colSpan={6}>
								Todavía no agregaste productos.
							</td>
						</tr>
					) : (
						products.map((item, index) => (
							<tr key={`${item.intern_code}-${index}`}>
								<td>{item.name}</td>
								<td>{item.size || '-'}</td>
								<td>{item.price.toFixed(2)}</td>
								<td>{item.stock}</td>
								<td>
									{(item.price * item.stock).toFixed(2)}
								</td>
								<td>
									<Button
										type="button"
										variant="outline-danger"
										size="sm"
										onClick={() => handleRemoveProduct(index)}
									>
										Quitar
									</Button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</Table>

			<h6 className={styles.total}>
				Total: ${total.toFixed(2)}
			</h6>

			{message && (
				<Alert variant={error ? 'danger' : 'success'}>
					{message}
				</Alert>
			)}

			<Button
				type="button"
				variant="success"
				disabled={loading || products.length === 0 || !idSupplier.trim()}
				onClick={handleConfirmPurchase}
			>
				{loading ? 'Registrando...' : 'Confirmar compra'}
			</Button>
		</div>
	);
};

export default PurchaseForm;
