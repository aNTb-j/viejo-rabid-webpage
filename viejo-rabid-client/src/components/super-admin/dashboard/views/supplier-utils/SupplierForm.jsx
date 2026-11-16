
import { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { GenericForm } from '../../../../shared/forms/GenericForm';
import CollapsibleForm from '../../utils/CollapsibleForm.jsx';

import GenericConfirmModal from '../../../../shared/modal/GenericConfirmModal.jsx';
import { errorToast, successToast } from '../../../../shared/toast/toast.js';

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
	const [showModal, setShowModal] = useState(false);

	const fileInputRef = useRef(null);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setSupplier(prev => ({
			...prev,
			[name]: value,
		}));

		setErrors(prev => ({
			...prev,
			[name]: '',
		}));
	};

	// Validar campos del proveedor
	const validateSupplier = () => {
		const newErrors = {};

		// Nombre
		if (!supplier.name.trim()) {
			newErrors.name = 'El nombre es obligatorio.';
		} else if (supplier.name.trim().length < 2) {
			newErrors.name = 'El nombre debe tener al menos 2 caracteres.';
		}

		// Email
		if (!supplier.email.trim()) {
			newErrors.email = 'El correo electrónico es obligatorio.';
		} else if (
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supplier.email.trim())
		) {
			newErrors.email = 'Ingresá un correo electrónico válido.';
		}

		// Teléfono
		const phone = supplier.phone.trim();
		const phoneDigits = phone.replace(/\D/g, '');

		if (!phone) {
			newErrors.phone = 'El teléfono es obligatorio.';
		} else if (!/^[+\d\s().-]+$/.test(phone)) {
			newErrors.phone = 'Ingresá un teléfono válido.';
		} else if (phoneDigits.length < 8 || phoneDigits.length > 15) {
			newErrors.phone = 'El teléfono debe tener entre 8 y 15 dígitos.';
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	};

	const handleFileChange = (e) => {
		const file = e.target.files?.[0] ?? null;

		if (file && !file.name.toLowerCase().endsWith('.csv')) {
			setProductFile(null);
			e.target.value = '';

			setMessageType('danger');
			setMessage('El archivo debe tener formato CSV.');
			return;
		}

		setProductFile(file);
		setMessage('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setMessage('');

		if (!validateSupplier()) {
			setMessageType('danger');
			setMessage('Revisá los campos indicados.');
			return;
		}

		let supplierCreated = false;

		try {
			setLoading(true);

			// Registrar proveedor
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

			// Importar productos CSV
			if (productFile) {
				const supplierId = data.id;

				if (!supplierId) {
					throw new Error(
						'El servidor no devolvió el ID del proveedor.'
					);
				}

				const csvContent = await productFile.text();

				const productsResponse = await fetch(
					'http://localhost:3000/suppliers/products',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							id_supplier_fk: supplierId,
							csv: csvContent,
						}),
					}
				);

				const productsData = await productsResponse.json();

				if (!productsResponse.ok) {
					throw new Error(
						productsData.message ||
						'Falló la importación de productos.'
					);
				}
			}

			// Limpiar formulario
			setSupplier(initialSupplier);
			setProductFile(null);
			setErrors({});

			if (fileInputRef.current) {
				fileInputRef.current.value = '';
			}

			setMessageType('success');
			successToast(
				productFile
					? 'Proveedor y lista de productos registrados correctamente.'
					: 'Proveedor guardado correctamente.'
			);

		} catch (error) {
			console.error('Error al guardar proveedor:', error);

			setMessageType('danger');
			errorToast(
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
				<Form onSubmit={handleSubmit} noValidate>
					<div className={styles.fields}>
						<GenericForm
							id="supplierName"
							name="name"
							text="Nombre del proveedor"
							placeholder="Ingresar nombre"
							value={supplier.name}
							onChange={handleChange}
							error={errors.name}
							required
							minLength={2}
							className={formStyles.formGroup}
						/>

						<GenericForm
							id="supplierEmail"
							name="email"
							text="Correo electrónico"
							type="email"
							placeholder="proveedor@ejemplo.com"
							value={supplier.email}
							onChange={handleChange}
							error={errors.email}
							required
							className={formStyles.formGroup}
						/>

						<GenericForm
							id="supplierPhone"
							name="phone"
							text="Número de teléfono"
							type="tel"
							placeholder="Ingresar teléfono"
							value={supplier.phone}
							onChange={handleChange}
							error={errors.phone}
							required
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
							accept=".csv,text/csv"
							onChange={handleFileChange}
						/>

						<Form.Text>
							Opcional. Seleccioná un archivo CSV con la lista
							de productos del proveedor.
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

			<GenericConfirmModal
				show={showModal}
				title={messageType === 'success' ? 'Operación exitosa' : 'Ocurrió un error'}
				message={message}
				confirmText="Aceptar"
				confirmVariant={messageType === 'success' ? 'success' : 'danger'}
				showCancel={false}
				onConfirm={() => setShowModal(false)}
				onCancel={() => setShowModal(false)}
			/>
		</div>
	);
};

export default SupplierForm;
