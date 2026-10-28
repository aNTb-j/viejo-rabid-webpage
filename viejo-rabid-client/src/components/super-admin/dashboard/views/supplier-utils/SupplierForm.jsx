import { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { GenericForm } from '../../../../shared/forms/GenericForm';
import CollapsibleForm from '../../utils/CollapsibleForm.jsx';

import formStyles from '../../../../../styles/components/formlayout.module.scss';
import styles from '../../../../../styles/components/suppliersform.module.scss';

const initialSupplier = {
	name: '',
	email: '',
	phone: '',
};

const SupplierForm = () => {
	const [supplier, setSupplier] = useState(initialSupplier);
	const [productFile, setProductFile] = useState(null);
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('success');
	const [loading, setLoading] = useState(false);

	const fileInputRef = useRef(null);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setSupplier(prev => ({
			...prev,
			[name]: value,
		}));

		setErrors(prev => ({
			...prev,
			[name]: false,
		}));
	};

	const handleFileChange = (e) => {
		setProductFile(e.target.files?.[0] ?? null);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newErrors = {
			name: !supplier.name.trim(),
			email: !supplier.email.trim(),
			phone: !supplier.phone.trim(),
		};

		setErrors(newErrors);
		setMessage('');

		if (Object.values(newErrors).some(Boolean)) {
			setMessageType('danger');
			setMessage('Completá todos los campos obligatorios.');
			return;
		}

		let supplierCreated = false;

		try {
			setLoading(true);

			const response = await fetch('http://localhost:3000/suppliers', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					suppliersName: supplier.name.trim(),
					email: supplier.email.trim(),
					supplierPhone: supplier.phone.trim(),
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || 'No se pudo registrar el proveedor.'
				);
			}

			supplierCreated = true;

			if (productFile) {
				const supplierId = data.id_supplier ?? data.id;

				if (!supplierId) {
					throw new Error(
						'El proveedor se creó, pero el servidor no devolvió su ID para importar los productos.'
					);
				}

				const formData = new FormData();
				formData.append('file', productFile);
				formData.append('id_supplier_fk', String(supplierId));

				const productsResponse = await fetch(
					'http://localhost:3000/suppliers/products',
					{
						method: 'POST',
						body: formData,
					}
				);

				const productsData = await productsResponse.json();

				if (!productsResponse.ok) {
					throw new Error(
						productsData.message ||
						'El proveedor se creó, pero falló la importación de productos.'
					);
				}
			}

			setSupplier(initialSupplier);
			setProductFile(null);

			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}

			setErrors({});
			setMessageType('success');
			setMessage(
				productFile
					? 'Proveedor y lista de productos registrados correctamente.'
					: 'Proveedor guardado correctamente.'
			);
		} catch (error) {
			console.error('Error al guardar proveedor:', error);

			setMessageType('danger');
			setMessage(
				supplierCreated
					? `El proveedor se creó, pero ocurrió un problema al importar los productos: ${error.message}`
					: error.message || 'Ocurrió un error al guardar el proveedor.'
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.formContainer}>
			<CollapsibleForm
				id="supplier-form"
				title="Registrar proveedor"
				description="Ingresá los datos de contacto y, opcionalmente, su lista de productos."
				defaultExpanded
			>
				<Form
					onSubmit={handleSubmit}
					noValidate
				>
					<div className={styles.fields}>
						<GenericForm
							id="supplierName"
							name="name"
							label="Nombre del proveedor"
							placeholder="Ingresar nombre"
							value={supplier.name}
							onChange={handleChange}
							error={errors.name ? 'Debe ingresar un nombre.' : ''}
							className={formStyles.formGroup}
						/>

						<GenericForm
							id="supplierEmail"
							name="email"
							label="Correo electrónico"
							type="email"
							placeholder="proveedor@ejemplo.com"
							value={supplier.email}
							onChange={handleChange}
							error={errors.email ? 'Debe ingresar un correo electrónico.' : ''}
							className={formStyles.formGroup}
						/>

						<GenericForm
							id="supplierPhone"
							name="phone"
							label="Número de teléfono"
							type="tel"
							placeholder="Ingresar teléfono"
							value={supplier.phone}
							onChange={handleChange}
							error={errors.phone ? 'Debe ingresar un teléfono.' : ''}
							className={formStyles.formGroup}
						/>
					</div>

					<Form.Group className={formStyles.formGroup}>
						<Form.Label htmlFor="productFile">
							Lista de productos
						</Form.Label>

						<Form.Control
							ref={fileInputRef}
							id="productFile"
							type="file"
							accept=".csv,.xlsx,.xls"
							onChange={handleFileChange}
						/>

						<Form.Text>
							Opcional. Seleccioná un archivo CSV o Excel con la lista de productos del proveedor.
						</Form.Text>
					</Form.Group>

					<div className={formStyles.formActions}>
						<Button
							type="submit"
							className={formStyles.submitButton}
							disabled={loading}
						>
							{loading ? 'Guardando...' : 'Guardar proveedor'}
						</Button>
					</div>
				</Form>
			</CollapsibleForm>

			{message && (
				<Alert
					variant={messageType}
					dismissible
					onClose={() => setMessage('')}
				>
					{message}
				</Alert>
			)}
		</div>
	);
};

export default SupplierForm;