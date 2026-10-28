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

	const handleProductChange = (e) => {
		const { name, value } = e.target;

		setProduct(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleAddProduct = (event) => {
		event.preventDefault();
		setMessage('');

		if (!idSupplier.trim()) {
			setMessage('Ingresá el ID del proveedor.');
			setError(true);
			return;
		}

		if (
			product.intern_code === '' ||
			!product.name.trim() ||
			product.price === '' ||
			product.stock === ''
		) {
			setMessage('Completá el código, nombre, precio y cantidad.');
			setError(true);
			return;
		}

		const price = Number(product.price);
		const stock = Number(product.stock);
		const internCode = Number(product.intern_code);

		if (
			!Number.isFinite(internCode) ||
			internCode < 0 ||
			!Number.isFinite(price) ||
			price < 0 ||
			!Number.isFinite(stock) ||
			stock <= 0
		) {
			setMessage(
				'Ingresá un código válido, un precio no negativo y una cantidad mayor a cero.'
			);
			setError(true);
			return;
		}

		const newProduct = {
			...product,
			purchaseItemId: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
			intern_code: internCode,
			price,
			stock,
		};

		onAddProduct(newProduct);
		setProduct(initialProduct);
	};

	return (
		<div className={styles.purchaseContainer}>
			<CollapsibleForm
				id="purchase-product-form"
				title="Registrar compra"
				description="Seleccioná el proveedor y agregá los productos que querés comprar."
				defaultExpanded
			>
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
						className={formStyles.formGroup}
					/>

					<hr />

					<h6 className={styles.sectionTitle}>Datos del producto</h6>

					<div className={styles.productFields}>
						<GenericForm
							id="intern_code"
							name="intern_code"
							label="Código del producto"
							type="number"
							value={product.intern_code}
							onChange={handleProductChange}
							placeholder="Código interno"
							error=""
							className={formStyles.formGroup}
						/>

						<GenericForm
							id="name"
							name="name"
							label="Nombre"
							value={product.name}
							onChange={handleProductChange}
							placeholder="Nombre del producto"
							error=""
							className={formStyles.formGroup}
						/>

						<GenericForm
							id="brand"
							name="brand"
							label="Marca"
							value={product.brand}
							onChange={handleProductChange}
							placeholder="Marca"
							error=""
							className={formStyles.formGroup}
						/>

						<GenericForm
							id="color"
							name="color"
							label="Color"
							value={product.color}
							onChange={handleProductChange}
							placeholder="Color"
							error=""
							className={formStyles.formGroup}
						/>

						<GenericForm
							id="size"
							name="size"
							label="Talle"
							value={product.size}
							onChange={handleProductChange}
							placeholder="Talle"
							error=""
							className={formStyles.formGroup}
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
							className={formStyles.formGroup}
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