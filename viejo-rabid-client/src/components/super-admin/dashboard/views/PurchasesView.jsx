import { useState } from 'react';
import { Alert } from 'react-bootstrap';

import PurchaseForm from './purchaces-utils/PurchaseForm.jsx';
import PurchaseTable from './purchaces-utils/PurchaseTable.jsx';

const PurchasesView = () => {
	const [idSupplier, setIdSupplier] = useState('');
	const [products, setProducts] = useState([]);
	const [message, setMessage] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleAddProduct = (newProduct) => {
		setProducts(prev => [...prev, newProduct]);
		setMessage('Producto agregado a la compra pendiente.');
		setError(false);
	};

	const handleRemoveProduct = (indexToRemove) => {
		setProducts(prev =>
			prev.filter((_, index) => index !== indexToRemove)
		);

		setMessage('Producto quitado de la compra pendiente.');
		setError(false);
	};

	const handleConfirmPurchase = async () => {
		if (!idSupplier.trim() || products.length === 0) {
			setMessage('Seleccioná un proveedor y agregá al menos un producto.');
			setError(true);
			return;
		}

		try {
			setLoading(true);
			setMessage('');

			const response = await fetch('http://localhost:3000/purchases', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id_supplier_fk: Number(idSupplier),
					products: products.map(
						({ purchaseItemId, ...product }) => product
					),
				}),
			});

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
		<div>
			<PurchaseForm
				idSupplier={idSupplier}
				setIdSupplier={setIdSupplier}
				onAddProduct={handleAddProduct}
				setMessage={setMessage}
				setError={setError}
			/>

			<PurchaseTable
				products={products}
				onRemoveProduct={handleRemoveProduct}
				onConfirmPurchase={handleConfirmPurchase}
				loading={loading}
				idSupplier={idSupplier}
			/>

			{message && (
				<Alert
					variant={error ? 'danger' : 'success'}
					dismissible
					onClose={() => setMessage('')}
				>
					{message}
				</Alert>
			)}
		</div>
	);
};

export default PurchasesView;