import { useState, Fragment } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './ProductForm.module.css';

const ProductForm = ({ onAddProduct }) => {
	const [isExpanded, setIsExpanded] = useState(false);

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
		<Fragment>
			<section className={styles.productFormContainer}>
				<Button
					variant="light"
					className={styles.toggleButton}
					onClick={() => setIsExpanded(current => !current)}
					aria-expanded={isExpanded}
					aria-controls="product-form-content"
				>
					<span className={styles.toggleContent}>
						<span className={styles.toggleTitle}>



							<span>Registrar producto</span>
						</span>

						<span
							className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''
								}`}
						>
							⌄
						</span>
					</span>

					<span className={styles.toggleDescription}>
						Agregar un nuevo producto al inventario
					</span>
				</Button>

				<div
					id="product-form-content"
					className={`${styles.formContent} ${isExpanded ? styles.formExpanded : ''
						}`}
					aria-hidden={!isExpanded}
					inert={!isExpanded}
				>
					<div className={styles.formInner}>
						<Form onSubmit={handleProductAgregation}>
							<Row>
								<Col md={6}>
									<Form.Group
										className={styles.formGroup}
										controlId="idSupplier"
									>
										<Form.Label>Proveedor</Form.Label>
										<Form.Control
											type="number"
											value={idSupplier}
											onChange={e => setIdSupplier(e.target.value)}
											placeholder="ID del proveedor"
											required
										/>
									</Form.Group>
								</Col>

								<Col md={6}>
									<Form.Group
										className={styles.formGroup}
										controlId="productCode"
									>
										<Form.Label>Código interno</Form.Label>
										<Form.Control
											type="number"
											value={internProductCode}
											onChange={e => setInternProductCode(e.target.value)}
											placeholder="Código del producto"
											required
										/>
									</Form.Group>
								</Col>

								<Col md={6}>
									<Form.Group
										className={styles.formGroup}
										controlId="productBrand"
									>
										<Form.Label>Marca</Form.Label>
										<Form.Control
											type="text"
											value={productBrand}
											onChange={e => setProductBrand(e.target.value)}
											placeholder="Marca del producto"
										/>
									</Form.Group>
								</Col>

								<Col md={6}>
									<Form.Group
										className={styles.formGroup}
										controlId="productName"
									>
										<Form.Label>Nombre del producto</Form.Label>
										<Form.Control
											type="text"
											value={productName}
											onChange={e => setProductName(e.target.value)}
											placeholder="Ej.: Remera básica"
											required
										/>
									</Form.Group>
								</Col>

								<Col md={6}>
									<Form.Group
										className={styles.formGroup}
										controlId="productColor"
									>
										<Form.Label>Color</Form.Label>
										<Form.Control
											type="text"
											value={productColor}
											onChange={e => setProductColor(e.target.value)}
											placeholder="Ej.: Verde"
										/>
									</Form.Group>
								</Col>

								<Col md={6}>
									<Form.Group
										className={styles.formGroup}
										controlId="productSize"
									>
										<Form.Label>Talla</Form.Label>
										<Form.Select
											value={productSize}
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
								</Col>

								<Col md={6}>
									<Form.Group
										className={styles.formGroup}
										controlId="productPrice"
									>
										<Form.Label>Precio</Form.Label>
										<Form.Control
											type="number"
											min="0"
											step="0.01"
											value={productPrice}
											onChange={e => setProductPrice(e.target.value)}
											required
										/>
									</Form.Group>
								</Col>

								<Col md={6}>
									<Form.Group
										className={styles.formGroup}
										controlId="productStock"
									>
										<Form.Label>Stock</Form.Label>
										<Form.Control
											type="number"
											min="0"
											value={productStock}
											onChange={e => setProductStock(e.target.value)}
											placeholder="Cantidad disponible"
											required
										/>
									</Form.Group>
								</Col>

								<Col md={6}>
									<Form.Group
										className={styles.formGroup}
										controlId="date"
									>
										<Form.Label>Fecha de compra</Form.Label>
										<Form.Control
											type="date"
											value={buyDate}
											onChange={e => setBuyDate(e.target.value)}
											required
										/>
									</Form.Group>
								</Col>

								<Col md={6}>
									<Form.Group
										className={styles.formGroup}
										controlId="productTags"
									>
										<Form.Label>Etiquetas</Form.Label>
										<Form.Control
											type="text"
											value={extraTags}
											onChange={e => setExtraTags(e.target.value)}
											placeholder="Ej.: invierno, casual, gala"
										/>
										<Form.Text>
											Separá las etiquetas con comas.
										</Form.Text>
									</Form.Group>
								</Col>
							</Row>

							<div className={styles.formActions}>
								<Button
									variant="success"
									type="submit"
									className={styles.submitButton}
								>
									Crear producto
								</Button>
							</div>
						</Form>
					</div>
				</div>
			</section>

			{message && (
				<Alert
					variant={error ? 'danger' : 'success'}
					className={styles.message}
					dismissible
					onClose={() => setMessage('')}
				>
					{message}
				</Alert>
			)}
		</Fragment>
	);
};

export default ProductForm;