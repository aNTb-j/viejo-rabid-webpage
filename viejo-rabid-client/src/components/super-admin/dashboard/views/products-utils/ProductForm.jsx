import { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';

import CollapsibleForm from '../../utils/CollapsibleForm.jsx';
import { GenericForm } from '../../../../shared/forms/GenericForm';
import formStyles from '../../../../../styles/components/formlayout.module.scss';

const ProductForm = ({ onAddProduct }) => {

	const [idSupplier, setIdSupplier] = useState('');
	const [internProductCode, setInternProductCode] = useState('');
	const [productName, setProductName] = useState('');
	const [productSize, setProductSize] = useState('');
	const [productPrice, setProductPrice] = useState(0);
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
						size: productSize,
						price: Number(productPrice),
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

			onAddProduct?.(data.product);

			setMessage('Producto creado correctamente');
			setError(false);

		} catch (error) {
			console.error('Error al registrar producto:', error);
			setMessage(
				error.message || 'Error de conexión con el servidor'
			);
			setError(true);
		}
	};

	return (
		<>
			<CollapsibleForm
				id="product-form"
				title="Registrar producto"
				description="Agregar un nuevo producto al inventario"
			>
				<Form onSubmit={handleProductAgregation}>
					<Row>
						<Col md={6}>
							<GenericForm
								id="idSupplier"
								text="Proveedor"
								label="Proveedor"
								type="number"
								value={idSupplier}
								onChange={(e) => setIdSupplier(e.target.value)}
								placeholder="ID del proveedor"
								className={formStyles.formGroup}
								required
							/>
						</Col>

						<Col md={6}>
							<GenericForm
								id="productCode"
								text="Código interno"
								label="Código interno"
								type="number"
								value={internProductCode}
								onChange={(e) => setInternProductCode(e.target.value)}
								placeholder="Código del producto"
								className={formStyles.formGroup}
								required
							/>
						</Col>

						<Col md={6}>
							<GenericForm
								id="productBrand"
								text="Marca"
								label="Marca"
								value={productBrand}
								onChange={(e) => setProductBrand(e.target.value)}
								placeholder="Marca del producto"
								className={formStyles.formGroup}
							/>
						</Col>

						<Col md={6}>
							<GenericForm
								id="productName"
								text="Producto"
								label="Nombre del producto"
								value={productName}
								onChange={(e) => setProductName(e.target.value)}
								placeholder="Ej.: Remera básica"
								className={formStyles.formGroup}
								required
							/>
						</Col>

						<Col md={6}>
							<GenericForm
								id="productColor"
								text="Color"
								label="Color"
								value={productColor}
								onChange={(e) => setProductColor(e.target.value)}
								placeholder="Ej.: Verde"
								className={formStyles.formGroup}
							/>
						</Col>

						<Col md={6}>
							<Form.Group
								className={formStyles.formGroup}
								controlId="productSize"
							>
								<Form.Label>Talla</Form.Label>
								<Form.Select
									value={productSize}
									onChange={(e) => setProductSize(e.target.value)}
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
						</Col>

						<Col md={6}>
							<GenericForm
								id="productPrice"
								text="Precio"
								label="Precio del producto"
								type="number"
								min="0"
								step="0.01"
								value={productPrice}
								onChange={(e) => setProductPrice(e.target.value)}
								className={formStyles.formGroup}
								required
							/>
						</Col>

						<Col md={6}>
							<GenericForm
								id="productStock"
								text="Stock"
								label="Stock del producto"
								type="number"
								min="0"
								value={productStock}
								onChange={(e) => setProductStock(e.target.value)}
								placeholder="Cantidad disponible"
								className={formStyles.formGroup}
								required
							/>
						</Col>

						<Col md={6}>
							<GenericForm
								id="date"
								text="Fecha de compra"
								label="Fecha de compra"
								type="date"
								value={buyDate}
								onChange={(e) => setBuyDate(e.target.value)}
								className={formStyles.formGroup}
								required
							/>
						</Col>

						<Col md={6}>
							<GenericForm
								id="productTags"
								text="Etiqueta/s"
								label="Etiquetas"
								value={extraTags}
								onChange={(e) => setExtraTags(e.target.value)}
								placeholder="Ej.: invierno, casual, gala"
								description="Separá las etiquetas con comas."
								className={formStyles.formGroup}
							/>
						</Col>
					</Row>

					<div className={formStyles.formActions}>
						<Button
							variant="success"
							type="submit"
							className={formStyles.submitButton}
						>
							Crear producto
						</Button>
					</div>
				</Form>
			</CollapsibleForm>

			{message && (
				<Alert
					variant={error ? 'danger' : 'success'}
					className={formStyles.message}
					dismissible
					onClose={() => setMessage('')}
				>
					{message}
				</Alert>
			)}
		</>
	)
};

export default ProductForm;