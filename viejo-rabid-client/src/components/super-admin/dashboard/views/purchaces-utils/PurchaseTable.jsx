import { Button } from 'react-bootstrap';

import CustomTable from '../../../../shared/table/CustomTable.jsx';
import tableStyles from '../../../../../styles/components/table.module.scss';
import styles from '../../../../../styles/components/purchasetable.module.scss';

const PurchaseTable = ({
	products = [],
	onRemoveProduct,
	onConfirmPurchase,
	loading = false,
	idSupplier,
}) => {
	const total = products.reduce(
		(sum, item) => sum + Number(item.price) * Number(item.stock),
		0
	);

	const titles = [
		{
			key: 'name',
			label: 'Producto',
			render: item => (
				<span className={styles.productName}>
					{item.name}
				</span>
			),
		},
		{
			key: 'size',
			label: 'Talle',
			render: item => item.size || '-',
		},
		{
			key: 'price',
			label: 'Precio',
			render: item => `$${Number(item.price).toFixed(2)}`,
		},
		{
			key: 'stock',
			label: 'Cantidad',
		},
		{
			key: 'subtotal',
			label: 'Subtotal',
			render: item => (
				<span className={styles.subtotal}>
					${(Number(item.price) * Number(item.stock)).toFixed(2)}
				</span>
			),
		},
		{
			key: 'actions',
			label: 'Acciones',
			render: (item, index) => (
				<div className={tableStyles.actions}>
					<Button
						type="button"
						variant="outline-danger"
						size="sm"
						className={tableStyles.actionButton}
						onClick={() => onRemoveProduct?.(index)}
					>
						Quitar
					</Button>
				</div>
			),
		},
	];

	return (
		<section className={tableStyles.tableContainer}>
			<div className={tableStyles.tableHeader}>
				<div>
					<h5 className={tableStyles.title}>
						Compra pendiente
					</h5>

					<p className={tableStyles.subtitle}>
						Productos que se registrarán al confirmar la compra.
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
					rowKey="purchaseItemId"
					emptyMessage="Todavía no agregaste productos"
					emptyDescription="Los productos que agregues al formulario aparecerán acá."
					className={tableStyles.table}
				/>
			</div>

			<div className={styles.purchaseFooter}>
				<div className={styles.total}>
					<span>Total de la compra</span>
					<strong>${total.toFixed(2)}</strong>
				</div>

				<Button
					type="button"
					variant="success"
					className={styles.confirmButton}
					disabled={
						loading ||
						products.length === 0 ||
						!String(idSupplier ?? '').trim()
					}
					onClick={onConfirmPurchase}
				>
					{loading ? 'Registrando...' : 'Confirmar compra'}
				</Button>
			</div>
		</section>
	);
};

export default PurchaseTable;