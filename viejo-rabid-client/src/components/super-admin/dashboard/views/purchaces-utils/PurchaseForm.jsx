
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { GenericForm } from '../../../../shared/forms/GenericForm';
import CollapsibleForm from '../../utils/CollapsibleForm.jsx';

import formStyles from '../../../../../styles/components/formlayout.module.scss';
import styles from '../../../../../styles/components/purchaseform.module.scss';

const initialProduct = {
	intern_code: '',
	name: '',
	brand: '',
	color: '',
	size: '',
	price: '',
	stock: '',
};

const PurchaseForm = ({
	idSupplier,
	setIdSupplier,
	onAddProduct,
	setMessage,
	setError,
}) => {
	const [product, setProduct] = useState(initialProduct);

	const [errors, setErrors] = useState({});

	const handleProductChange = (e) => {
		const { name, value } = e.target;

		setProduct(prev => ({ ...prev, [name]: value, }));

		// Limpia el error al modificar el campo
		setErrors(prev => ({ ...prev, [name]: '', }));
	};

	const validateProduct = () => {
		const newErrors = {};

		// Validar proveedor
		if (!String(idSupplier).trim()) {
			newErrors.idSupplier = 'El ID del proveedor es obligatorio.';
		} else if (
			!Number.isInteger(Number(idSupplier)) ||
			Number(idSupplier) <= 0
		) {
			newErrors.idSupplier = 'Ingresá un ID válido.';
		}

		// Validar código interno
		if (product.intern_code === '') {
			newErrors.intern_code = 'El código es obligatorio.';
		} else if (
			!Number.isInteger(Number(product.intern_code)) ||
			Number(product.intern_code) < 0
		) {
			newErrors.intern_code = 'Ingresá un código válido.';
		}

		// Validar nombre
		if (!product.name.trim()) {
			newErrors.name = 'El nombre es obligatorio.';
		} else if (product.name.trim().length < 2) {
			newErrors.name = 'El nombre debe tener al menos 2 caracteres.';
		}

		// Validar precio
		if (product.price === '') {
			newErrors.price = 'El precio es obligatorio.';
		} else if (
			!Number.isFinite(Number(product.price)) ||
			Number(product.price) < 0
		) {
			newErrors.price = 'Ingresá un precio válido.';
		}

		// Validar stock
		if (product.stock === '') {
			newErrors.stock = 'La cantidad es obligatoria.';
		} else if (
			!Number.isInteger(Number(product.stock)) ||
			Number(product.stock) <= 0
		) {
			newErrors.stock = 'La cantidad debe ser un entero mayor a cero.';
		}

		// Validar marca
		if (!product.brand.trim()) {
			newErrors.brand = 'La marca es obligatoria.';
		} else if (product.brand.trim().length < 2) {
			newErrors.brand = 'La marca debe tener al menos 2 caracteres.';
		}

		// Validar color
		if (!product.color.trim()) {
			newErrors.color = 'El color es obligatorio.';
		} else if (product.color.trim().length < 3) {
			newErrors.color = 'El color debe tener al menos 3 caracteres.';
		}

		// Validar talle
		if (!product.size.trim()) {
			newErrors.size = 'El talle es obligatorio.';
		} else if (product.size.trim().length > 10) {
			newErrors.size = 'El talle no puede superar los 10 caracteres.';
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const handleAddProduct = (event) => {
		event.preventDefault();

		setMessage('');
		setError(false);

		if (!validateProduct()) {
			setMessage('Revisá los campos indicados.');
			setError(true);
			return;
		}

		const newProduct = {
			...product,
			purchaseItemId: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
			intern_code: Number(product.intern_code),
			price: Number(product.price),
			stock: Number(product.stock),
		};

		onAddProduct(newProduct);

		setProduct(initialProduct);
		setErrors({});
	};

	return (
		<div className={styles.purchaseContainer}>
			<CollapsibleForm
				id="purchase-product-form"
				title="Registrar compra"
				description="Seleccioná el proveedor y agregá los productos que querés comprar."
				defaultExpanded
			>
				<Form onSubmit={handleAddProduct} noValidate>
					<GenericForm
						id="idSupplier"
						name="idSupplier"
						text="ID del proveedor"
						type="number"
						placeholder="Ingresar ID del proveedor"
						value={idSupplier}
						onChange={e => {
							setIdSupplier(e.target.value);
							setErrors(prev => ({
								...prev,
								idSupplier: '',
							}));
						}}
						error={errors.idSupplier}
						required
						min="1"
						step="1"
						className={formStyles.formGroup}
					/>

					<hr />

					<h6 className={styles.sectionTitle}>
						Datos del producto
					</h6>

					<div className={styles.productFields}>
						<GenericForm
							id="intern_code"
							name="intern_code"
							text="Código del producto"
							type="number"
							value={product.intern_code}
							onChange={handleProductChange}
							placeholder="Código interno"
							error={errors.intern_code}
							required
							min="0"
							step="1"
							className={formStyles.formGroup}
						/>

						<GenericForm
							id="name"
							name="name"
							text="Nombre"
							value={product.name}
							onChange={handleProductChange}
							placeholder="Nombre del producto"
							error={errors.name}
							required
							minLength={2}
							className={formStyles.formGroup}
						/>

						<GenericForm
							id="brand"
							name="brand"
							text="Marca"
							value={product.brand}
							onChange={handleProductChange}
							placeholder="Marca"
							error={errors.brand}
							required
							minLength={2}
							className={formStyles.formGroup}
						/>

						<GenericForm
							id="color"
							name="color"
							text="Color"
							value={product.color}
							onChange={handleProductChange}
							placeholder="Color"
							error={errors.color}
							required
							minLength={3}
							className={formStyles.formGroup}
						/>

						<GenericForm
							id="size"
							name="size"
							text="Talle"
							value={product.size}
							onChange={handleProductChange}
							placeholder="Talle"
							error={errors.size}
							required
							maxLength={10}
							className={formStyles.formGroup}
						/>

						<GenericForm
							id="price"
							name="price"
							text="Precio unitario"
							type="number"
							value={product.price}
							onChange={handleProductChange}
							placeholder="Precio"
							error={errors.price}
							required
							min="0"
							step="0.01"
							className={formStyles.formGroup}
						/>

						<GenericForm
							id="stock"
							name="stock"
							text="Cantidad"
							type="number"
							value={product.stock}
							onChange={handleProductChange}
							placeholder="Cantidad a comprar"
							error={errors.stock}
							required
							min="1"
							step="1"
							className={formStyles.formGroup}
						/>
					</div>

					<div className={formStyles.formActions}>
						<Button
							type="submit"
							className={formStyles.submitButton}
						>
							Agregar producto
						</Button>
					</div>
				</Form>
			</CollapsibleForm>
		</div>
	);
};

export default PurchaseForm;
