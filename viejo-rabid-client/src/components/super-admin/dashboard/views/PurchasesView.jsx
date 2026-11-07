import { useState } from 'react';
import { Alert } from 'react-bootstrap';

import PurchaseForm from './purchaces-utils/PurchaseForm.jsx';
import PurchaseTable from './purchaces-utils/PurchaseTable.jsx';
import GenericConfirmModal from '../../../shared/modal/GenericConfirmModal.jsx';

const PurchasesView = () => {
	const [idSupplier, setIdSupplier] = useState('');
	const [products, setProducts] = useState([]);
	const [message, setMessage] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const [confirmAction, setConfirmAction] = useState(null);

	const handleAddProduct = (newProduct) => {
		setProducts(prev => [...prev, newProduct]);
		setMessage('Producto agregado a la compra pendiente.');
		setError(false);
	};

	// Eliminar producto por ID
	const handleRemoveProduct = (productId) => {
		setProducts(prev =>
			prev.filter(product => product.purchaseItemId !== productId)
		);

		setMessage('Producto quitado de la compra pendiente.');
		setError(false);
	};

	// Handles modal para quitar producto
	const handleRequestRemoveProduct = (product) => {
		setConfirmAction({
			type: 'remove',
			productId: product.purchaseItemId,
		});
	};

	// Handler modal para registrar compra
	const handleRequestPurchaseConfirmation = () => {
		if (!idSupplier.trim() || products.length === 0) {
			setMessage('Seleccioná un proveedor y agregá al menos un producto.');
			setError(true);
			return;
		}

		setConfirmAction({ type: 'purchase' });
	};

	// Registrar compra
	const handleConfirmPurchase = async () => {
		try {
			setLoading(true);
			setMessage('');

			const purchaseData = {
				id_supplier_fk: Number(idSupplier),
				products: products.map(
					({ purchaseItemId, ...product }) => product
				),
			};

			const response = await fetch('http://localhost:3000/purchases', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(purchaseData),
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
			setConfirmAction(null);

		} catch (err) {
			console.error('Error al registrar la compra:', err);
			setMessage(err.message || 'Error de conexion con el servidor.');
			setError(true);

		} finally {
			setLoading(false);
		}
	};

	// Handler accion confirmada
	const handleConfirmAction = async () => {
		if (confirmAction?.type === 'remove') {
			handleRemoveProduct(confirmAction.productId);
			setConfirmAction(null);
			return;
		}

		if (confirmAction?.type === 'purchase') {
			await handleConfirmPurchase();
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
				onRemoveProduct={handleRequestRemoveProduct}
				onConfirmPurchase={handleRequestPurchaseConfirmation}
				loading={loading}
				idSupplier={idSupplier}
			/>

			<GenericConfirmModal
				show={Boolean(confirmAction)}
				title={
					confirmAction?.type === 'purchase'
						? 'Confirmar compra'
						: 'Quitar producto'
				}
				message={
					confirmAction?.type === 'purchase'
						? '¿Estás seguro de que deseas registrar esta compra?'
						: '¿Estás seguro de que deseas quitar este producto de la compra pendiente?'
				}
				onConfirm={handleConfirmAction}
				onCancel={() => setConfirmAction(null)}
				confirmText="Sí, confirmar"
				cancelText="No, cancelar"
				loading={loading}
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