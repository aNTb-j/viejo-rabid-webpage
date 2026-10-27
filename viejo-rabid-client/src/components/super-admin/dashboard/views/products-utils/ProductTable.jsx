
import CustomTable from '../../../../shared/table/CustomTable';
import styles from './ProductTable.module.css';

function ProductTable({ products = [], onEdit, onDelete }) {
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
					<span
						className={`${styles.stockBadge} ${stockClass}`}
					>
						{product.stock}
					</span>
				);
			},
		},
		{
			key: 'actions',
			label: 'Acciones',
			render: (product) => (
				<div>
					<button onClick={() => onEdit?.(product)}>
						Editar
					</button>

					<button onClick={() => onDelete?.(product.id_product)}>
						Eliminar
					</button>
				</div>
			),
		} 
	];


	return (
		<section className={styles.tableContainer}>
			<div className={styles.tableHeader}>
				<div>
					<h5 className={styles.title}>
						Inventario de productos
					</h5>

					<p className={styles.subtitle}>
						Productos registrados en el sistema
					</p>
				</div>

				<span className={styles.productCount}>
					{products.length} productos
				</span>
			</div>

			<div className={styles.tableWrapper}>
				<CustomTable
					titles={titles}
					data={products}
					rowKey="id_product"
					emptyMessage="No hay productos registrados"
					emptyDescription="Los productos que agregues aparecerán en esta tabla."
					className={styles.productTable}
				/>
			</div>
		</section>
	);
}

export default ProductTable;
