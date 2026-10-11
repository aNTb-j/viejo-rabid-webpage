
import { useState, Fragment } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const ProductForm = () => {
	const [idSupplier, setIdSupplier] = useState('');
	const [internProductCode, setInternProductCode] = useState('');
	const [productName, setProductName] = useState('');
	const [size, setProductSize] = useState('');
	const [productColor, setProductColor] = useState('');
	const [productBrand, setProductBrand] = useState('');
	const [productStock, setProductStock] = useState('');
	const [buyDate, setBuyDate] = useState('');
	const [extraTags, setExtraTags] = useState('');

	const [message, setMessage] = useState('');
	const [error, setError] = useState(false);

	const handleProductAgregation = async (event) => {
		event.preventDefault();

		setMessage('');

		// Construir el array de tags
		const tags = extraTags
			.split(',')
			.map(tag => tag.trim())
			.filter(Boolean);

		try {
			const response = await fetch(
				'http://localhost:3000/dashboard',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						id_supplier_fk: Number(idSupplier),
						intern_code: Number(internProductCode),
						name: productName,
						brand: productBrand,
						color: productColor,
						size,
						stock: Number(productStock),
						date: buyDate,
						tags
					})
				}
			);

			const data = await response.json();


			if (!response.ok) {
				throw new Error(
					data.message || 'Error al registrar el producto'
				);
			}

			setMessage('Producto creado correctamente');
			setError(false);

		} catch (error) {
			console.error('Error al registrar producto:', error);
			setMessage(error.message || 'Error de conexión con el servidor');
			setError(true);
		}
	};

	return (
		<Fragment>
			{message && (
				<Alert variant={error ? 'danger' : 'success'}>
					{message}
				</Alert>
			)}

			<Form onSubmit={handleProductAgregation}>
				<Form.Group className="mb-3" controlId="idSupplier">
					<Form.Label>Proveedor</Form.Label>
					<Form.Control
						type="number"
						value={idSupplier}
						onChange={e => setIdSupplier(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="productCode">
					<Form.Label>Código</Form.Label>
					<Form.Control
						type="number"
						value={internProductCode}
						onChange={e => setInternProductCode(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="productBrand">
					<Form.Label>Marca</Form.Label>
					<Form.Control
						type="text"
						value={productBrand}
						onChange={e => setProductBrand(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="productName">
					<Form.Label>Producto</Form.Label>
					<Form.Control
						type="text"
						value={productName}
						onChange={e => setProductName(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="productColor">
					<Form.Label>Color</Form.Label>
					<Form.Control
						type="text"
						value={productColor}
						onChange={e => setProductColor(e.target.value)}
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="productSize">
					<Form.Label>Talla</Form.Label>
					<Form.Select
						value={size}
						onChange={e => setProductSize(e.target.value)}
						required
					>
						<option value="">Seleccionar talla</option>
						<option value="XS">XS</option>
						<option value="S">S</option>
						<option value="M">M</option>
						<option value="L">L</option>
						<option value="XL">XL</option>
						<option value="XXL">XXL</option>
					</Form.Select>
				</Form.Group>

				<Form.Group className="mb-3" controlId="productTags">
					<Form.Label>Tags adicionales</Form.Label>
					<Form.Control
						type="text"
						value={extraTags}
						onChange={e => setExtraTags(e.target.value)}
						placeholder="Ej.: verano, algodón, casual"
					/>
					<Form.Text>
						Separá los tags con comas.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="productStock">
					<Form.Label>Stock</Form.Label>
					<Form.Control
						type="number"
						min="0"
						value={productStock}
						onChange={e => setProductStock(e.target.value)}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="date">
					<Form.Label>Fecha de compra</Form.Label>
					<Form.Control
						type="date"
						value={buyDate}
						onChange={e => setBuyDate(e.target.value)}
						required
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Crear producto
				</Button>
			</Form>
		</Fragment>
	);
};

export default ProductForm;
