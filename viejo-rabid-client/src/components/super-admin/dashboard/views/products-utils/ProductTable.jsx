
// https://es.react.dev/reference/react/useMemo
import Table from 'react-bootstrap/Table';

import styles from './ProductTable.module.css';

function ProductTable({ products = [], onEdit, onDelete }) {
	return (
		<section className={styles.tableContainer}>
			<div className={styles.tableHeader}>
				<div>
					<h5 className={styles.title}>Inventario de productos</h5>
					<p className={styles.subtitle}>
						Productos registrados en el sistema
					</p>
				</div>

				<span className={styles.productCount}>
					{products.length} productos
				</span>
			</div>

			<div className={styles.tableWrapper}>
				<Table responsive hover className={styles.productTable}>
					<thead>
						<tr>
							<th>ID</th>
							<th>Producto</th>
							<th>Talle</th>
							<th>Stock</th>
						</tr>
					</thead>

					<tbody>
						{products.length > 0 ? (
							products.map(product => (
								<tr key={product.id_product}>
									<td className={styles.idCell}>
										#{product.id_product}
									</td>

									<td className={styles.nameCell}>
										{product.name}
									</td>

									<td>
										<span className={styles.sizeBadge}>
											{product.size || 'Sin talle'}
										</span>
									</td>

									<td>
										<span
											className={`${styles.stockBadge} ${Number(product.stock) === 0
													? styles.stockEmpty
													: Number(product.stock) <= 5
														? styles.stockLow
														: styles.stockAvailable
												}`}
										>
											{product.stock}
										</span>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="4" className={styles.emptyState}>
									<div className={styles.emptyTitle}>
										No hay productos registrados
									</div>

									<p>
										Los productos que agregues aparecerán
										en esta tabla.
									</p>
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</div>
		</section>
	);
}

export default ProductTable;