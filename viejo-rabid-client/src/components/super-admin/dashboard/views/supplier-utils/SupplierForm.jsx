import { useState } from "react";

import { Form, Button, Alert } from 'react-bootstrap';
import { GenericForm } from "../../../../shared/forms/GenericForm";

import styles from './SupplierForm.module.css';

// Lista de proveedores con su lista de productos

/*
	2 POST
	1 para proveedores
	
	1 para lista de producto por proovedores 
		Revisar la opcion de cargar / actualizar la lista de un proveedor en base a un archivo

*/

/*
	El formulario debe tener Proveedor

	Nombre, Mail y Numero de telefono

	Lista de productos. Ver Si se sube un archivo.
*/

const SupplierForm = () => {
	const [supplier, setSupplier] = useState({ name: '', email: '', phone: ''});

	const [productFile, setProductFile] = useState(null);
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setSupplier(prev => ({ ...prev, [name]: value }));
		setErrors(prev => ({ ...prev, [name]: false }));
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
			setMessage('Completa todos los campos obligatorios.');
			return;
		}

		try {
			setLoading(true);

			// POST 1: Registrar proveedor
			const response = await fetch(
				'http://localhost:3000/suppliers',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						suppliersName: supplier.name.trim(),
						email: supplier.email.trim(),
						supplierPhone: supplier.phone.trim(),
					}),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || 'No se pudo registrar el proveedor.'
				);
			}

			// POST 2: Importar la lista de productos, si hay un archivo
			if (productFile) {
				const formData = new FormData();

				formData.append('file', productFile);
				formData.append('id_supplier_fk', data.id);

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

			setSupplier({name: '', email: '', phone: ''});
			setProductFile(null);

			const fileInput = document.getElementById('productFile');
			if (fileInput) fileInput.value = '';

			setErrors({});
			setMessage('Proveedor guardado correctamente.');
		} catch (error) {
			setMessage(error.message || 'Ocurrió un error al guardar.');
		} finally {
			setLoading(false);
		}
	};


	return (
		<div className={styles.formContainer}>
			<h5 className={styles.title}>Registrar proveedor</h5>

			<p className={styles.subtitle}>
				Ingresá los datos de contacto del proveedor.
			</p>

			<Form onSubmit={handleSubmit} noValidate>
				<GenericForm
					id="supplierName"
					name="name"
					label="Nombre del proveedor"
					placeholder="Ingresar nombre"
					value={supplier.name}
					onChange={handleChange}
					error={errors.name ? 'Debe ingresar un nombre.' : ''}
					className={styles.field}
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
					className={styles.field}
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
					className={styles.field}
				/>

				<Form.Group className={styles.field}>
					<Form.Label htmlFor="productFile">
						Lista de productos
					</Form.Label>

					<Form.Control
						id="productFile"
						type="file"
						accept=".csv,.xlsx,.xls"
						onChange={handleFileChange}
					/>

					<Form.Text muted>
						Opcional. Podés seleccionar un archivo CSV o Excel
						con la lista de productos del proveedor.
					</Form.Text>
				</Form.Group>

				{message && (
					<Alert variant={
						message.includes('correctamente')
							? 'success'
							: 'danger'
					}>
						{message}
					</Alert>
				)}

				<Button
					type="submit"
					variant="secondary"
					disabled={loading}
				>
					{loading ? 'Guardando...' : 'Guardar proveedor'}
				</Button>
			</Form>
		</div>
	);
};

export default SupplierForm;