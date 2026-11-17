
import { useState } from 'react';
import { Button } from 'react-bootstrap';

import CustomTable from '../../../../shared/table/CustomTable';
import GenericConfirmModal from '../../../../../components/shared/modal/GenericConfirmModal.jsx';

import tableStyles from '../../../../../styles/components/table.module.scss';
import styles from '../../../../../styles/components/purchasetable.module.scss';

function ProductTable({ products = [], onEditProduct, onRemoveProduct }) {

	const [showConfirm, setShowConfirm] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [loading, setLoading] = useState(false);

	// Abrir confirmación
	const handleDeleteClick = (product) => {
		setSelectedProduct(product);
		setShowConfirm(true);
	};

	// Cancelar eliminación
	const handleCancelDelete = () => {
		if (loading) return;

		setShowConfirm(false);
		setSelectedProduct(null);
	};

	// Confirmar eliminación
	const handleConfirmDelete = async () => {
		if (!selectedProduct || loading) return;

		try {
			setLoading(true);

			await onRemoveProduct?.(selectedProduct.id_product);

			setShowConfirm(false);
			setSelectedProduct(null);
		} finally {
			setLoading(false);
		}
	};

	const titles = [
		{
			key: 'id_product',
			label: 'ID',
			render: (product) => (
				<span className={styles.idCell}>
					#{product.id_product}
				</span>
			),
		},
		{
			key: 'name',
			label: 'Producto',
			render: (product) => (
				<span className={styles.nameCell}>
					{product.name}
				</span>
			),
		},
		{
			key: 'size',
			label: 'Talle',
			render: (product) => (
				<span className={styles.sizeBadge}>
					{product.size || 'Sin talle'}
				</span>
			),
		},
		{
			key: 'stock',
			label: 'Stock',
			render: (product) => {
				const stock = Number(product.stock);

				const stockClass =
					stock === 0
						? styles.stockEmpty
						: stock <= 5
							? styles.stockLow
							: styles.stockAvailable;

				return (
					<span className={`${styles.stockBadge} ${stockClass}`}>
						{product.stock}
					</span>
				);
			},
		},
		{
			key: 'actions',
			label: 'Acciones',
			render: (product) => (
				<div className={styles.actions}>
					<Button
						variant="outline-primary"
						size="sm"
						onClick={() => onEditProduct?.(product)}
					>
						Editar
					</Button>

					<Button
						variant="outline-danger"
						size="sm"
						onClick={() => handleDeleteClick(product)}
					>
						Eliminar
					</Button>
				</div>
			),
		},
	];

	return (
		<>
			<section className={tableStyles.tableContainer}>
				<div className={tableStyles.tableHeader}>
					<div>
						<h5 className={tableStyles.title}>
							Inventario de productos
						</h5>

						<p className={tableStyles.subtitle}>
							Productos registrados en el sistema
						</p>
					</div>

					<span className={tableStyles.productCount}>
						{products.length} productos
					</span>
				</div>

				<div className={tableStyles.tableWrapper}>
					<CustomTable
						titles={titles}
						data={products}
						rowKey="id_product"
						emptyMessage="No hay productos registrados"
						emptyDescription="Los productos que agregues aparecerán en esta tabla."
						className={tableStyles.table}
					/>
				</div>
			</section>

			<GenericConfirmModal
				show={showConfirm}
				title="Eliminar producto"
				message={
					<>
						¿Estás seguro de que deseas eliminar el producto{' '}
						<strong>{selectedProduct?.name}</strong>?
						<br />
						Esta acción no se puede deshacer.
					</>
				}
				onConfirm={handleConfirmDelete}
				onCancel={handleCancelDelete}
				confirmText="Eliminar"
				confirmVariant="danger"
				loading={loading}
			/>
		</>
	);
}

export default ProductTable;
