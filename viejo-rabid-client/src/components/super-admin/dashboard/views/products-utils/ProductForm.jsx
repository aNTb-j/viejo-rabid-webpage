
import { useState, useEffect } from 'react';
import { errorToast, successToast } from '../../../../shared/toast/toast.js';

import { Form, Row, Col, Button } from 'react-bootstrap';

import CollapsibleForm from '../../utils/CollapsibleForm.jsx';
import { GenericForm } from '../../../../shared/forms/GenericForm';
import formStyles from '../../../../../styles/components/formlayout.module.scss';

const ProductForm = ({
	onAddProduct,
	onUpdateProduct,
	editingProduct,
	onCancelEdit
}) => {

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

	const [errors, setErrors] = useState({});

	// Limpiar campos
	const resetForm = () => {
		setIdSupplier('');
		setInternProductCode('');
		setProductName('');
		setProductSize('');
		setProductPrice(0);
		setProductColor('');
		setProductBrand('');
		setProductStock('');
		setBuyDate('');
		setExtraTags('');
		setErrors({});
	};

	// Cargar datos del producto seleccionado
	useEffect(() => {
		if (editingProduct) {
			setIdSupplier(editingProduct.id_supplier_fk ?? '');
			setInternProductCode(editingProduct.intern_code ?? '');
			setProductName(editingProduct.name ?? '');
			setProductSize(editingProduct.size ?? '');
			setProductPrice(editingProduct.price ?? 0);
			setProductColor(editingProduct.color ?? '');
			setProductBrand(editingProduct.brand ?? '');
			setProductStock(editingProduct.stock ?? '');
			setBuyDate(editingProduct.date?.slice(0, 10) ?? '');

			setExtraTags(
				editingProduct.tags?.map(tag => tag.name).join(', ') || ''
			);
		} else {
			resetForm();
		}
	}, [editingProduct]);

	// Manejar cambios en los campos
	const handleChange = (e, setter, field) => {
		const { value } = e.target;

		setter(value);

		setErrors(prev => ({
			...prev,
			[field]: ''
		}));
	};

	// Validar campos del producto
	const validateProduct = () => {
		const newErrors = {};

		// Proveedor
		if (!String(idSupplier).trim()) {
			newErrors.idSupplier = 'El proveedor es obligatorio.';
		} else if (
			!Number.isInteger(Number(idSupplier)) ||
			Number(idSupplier) <= 0
		) {
			newErrors.idSupplier = 'Ingresá un ID de proveedor válido.';
		}

		// Código interno
		if (!String(internProductCode).trim()) {
			newErrors.internProductCode = 'El código interno es obligatorio.';
		} else if (
			!Number.isInteger(Number(internProductCode)) ||
			Number(internProductCode) < 0
		) {
			newErrors.internProductCode = 'Ingresá un código interno válido.';
		}

		// Nombre
		if (!productName.trim()) {
			newErrors.productName = 'El nombre del producto es obligatorio.';
		} else if (productName.trim().length < 2) {
			newErrors.productName = 'El nombre debe tener al menos 2 caracteres.';
		}

		// Talla
		if (!productSize) {
			newErrors.productSize = 'La talla es obligatoria.';
		}

		// Precio
		if (productPrice === '' || !Number.isFinite(Number(productPrice))) {
			newErrors.productPrice = 'El precio es obligatorio.';
		} else if (Number(productPrice) < 0) {
			newErrors.productPrice = 'El precio no puede ser negativo.';
		}

		// Stock
		if (productStock === '') {
			newErrors.productStock = 'El stock es obligatorio.';
		} else if (
			!Number.isInteger(Number(productStock)) ||
			Number(productStock) < 0
		) {
			newErrors.productStock = 'Ingresá una cantidad de stock válida.';
		}

		// Fecha de compra
		if (!buyDate) {
			newErrors.buyDate = 'La fecha de compra es obligatoria.';
		} else if (buyDate > new Date().toISOString().slice(0, 10)) {
			newErrors.buyDate = 'La fecha no puede ser futura.';
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	// Crear o actualizar producto
	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!validateProduct()) {
			return;
		}

		const tags = extraTags
			.split(',')
			.map(tag => tag.trim())
			.filter(Boolean);

		const productData = {
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
		};

		const isEditing = Boolean(editingProduct);

		const url = isEditing
			? `http://localhost:3000/product/${editingProduct.id_product}`
			: 'http://localhost:3000/product';

		try {
			const response = await fetch(url, {
				method: isEditing ? 'PUT' : 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(productData)
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Error al guardar el producto');
			}

			if (isEditing) {
				onUpdateProduct?.(data.product);
				successToast('Producto actualizado correctamente.');
			} else {
				onAddProduct?.(data.product);
				successToast('Producto creado correctamente.');
				resetForm();
			}

		} catch (error) {
			console.error('Error al guardar producto:', error);

			errorToast(
				error.message || 'Error de conexión con el servidor.'
			);
		}
	};

	// Cancelar edición
	const handleCancel = () => {
		resetForm();
		onCancelEdit?.();
	};

	const isEditing = Boolean(editingProduct);

	return (
		<CollapsibleForm
			id="product-form"
			title={isEditing ? 'Editar producto' : 'Registrar producto'}
			description={
				isEditing
					? 'Modificar los datos del producto seleccionado'
					: 'Agregar un nuevo producto al inventario'
			}
		>
			<Form noValidate onSubmit={handleSubmit}>
				<Row>
					<Col md={6}>
						<GenericForm
							id="idSupplier"
							text="Proveedor"
							type="number"
							value={idSupplier}
							onChange={(e) => handleChange(e, setIdSupplier, 'idSupplier')}
							error={errors.idSupplier}
							placeholder="ID del proveedor"
							className={formStyles.formGroup}
							required
						/>
					</Col>

					<Col md={6}>
						<GenericForm
							id="productCode"
							text="Código interno"
							type="number"
							value={internProductCode}
							onChange={(e) => handleChange(e, setInternProductCode, 'internProductCode')}
							error={errors.internProductCode}
							placeholder="Código del producto"
							className={formStyles.formGroup}
							required
						/>
					</Col>

					<Col md={6}>
						<GenericForm
							id="productBrand"
							text="Marca"
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
							value={productName}
							onChange={(e) => handleChange(e, setProductName, 'productName')}
							error={errors.productName}
							placeholder="Ej.: Remera básica"
							className={formStyles.formGroup}
							required
						/>
					</Col>

					<Col md={6}>
						<GenericForm
							id="productColor"
							text="Color"
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
								onChange={(e) => handleChange(e, setProductSize, 'productSize')}
								isInvalid={Boolean(errors.productSize)}
								required
							>
								<option value="">Seleccionar talla</option>
								<option value="XS">-</option>
								<option value="XS">XS</option>
								<option value="S">S</option>
								<option value="M">M</option>
								<option value="L">L</option>
								<option value="XL">XL</option>
								<option value="XXL">XXL</option>
							</Form.Select>

							<Form.Control.Feedback type="invalid">
								{errors.productSize}
							</Form.Control.Feedback>
						</Form.Group>
					</Col>

					<Col md={6}>
						<GenericForm
							id="productPrice"
							text="Precio"
							type="number"
							min="0"
							step="0.01"
							value={productPrice}
							onChange={(e) => handleChange(e, setProductPrice, 'productPrice')}
							error={errors.productPrice}
							className={formStyles.formGroup}
							required
						/>
					</Col>

					<Col md={6}>
						<GenericForm
							id="productStock"
							text="Stock"
							type="number"
							min="0"
							value={productStock}
							onChange={(e) => handleChange(e, setProductStock, 'productStock')}
							error={errors.productStock}
							placeholder="Cantidad disponible"
							className={formStyles.formGroup}
							required
						/>
					</Col>

					<Col md={6}>
						<GenericForm
							id="date"
							text="Fecha de compra"
							type="date"
							value={buyDate}
							onChange={(e) => handleChange(e, setBuyDate, 'buyDate')}
							error={errors.buyDate}
							className={formStyles.formGroup}
							required
						/>
					</Col>

					<Col md={6}>
						<GenericForm
							id="productTags"
							text="Etiqueta/s"
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
						{isEditing ? 'Guardar cambios' : 'Crear producto'}
					</Button>

					{isEditing && (
						<Button
							variant="outline-secondary"
							type="button"
							onClick={handleCancel}
						>
							Cancelar
						</Button>
					)}
				</div>
			</Form>
		</CollapsibleForm>
	);
};

export default ProductForm;
