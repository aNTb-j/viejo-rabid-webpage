import { useState, useEffect } from 'react';

import ProductForm from './products-utils/ProductForm';
import ProductTable from './products-utils/ProductTable';

import styles from '../../../../styles/components/productview.module.scss';

const ProductsView = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const handleAddProduct = (newItem) => {
		if (!newItem) return;

		setProducts(prevState => [...prevState, newItem]);
	};

	useEffect(() => {
		const loadProducts = async () => {
			try {
				const response = await fetch(
					'http://localhost:3000/dashboard'
				);

				if (!response.ok) {
					throw new Error('No se pudieron cargar los productos');
				}

				const data = await response.json();

				setProducts(Array.isArray(data) ? data : data.products ?? []);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		loadProducts();
	}, []);

	return (
		<main className={styles.productsView}>
			<header className={styles.pageHeader}>
				<div>
					<span className={styles.eyebrow}>
						ADMINISTRACIÓN
					</span>

					<h1 className={styles.pageTitle}>
						Productos
					</h1>

				</div>

				<div className={styles.totalCard}>
					<span className={styles.totalLabel}>
						Productos registrados
					</span>

					<strong className={styles.totalValue}>
						{loading ? '—' : products.length}
					</strong>
				</div>
			</header>

			{error && (
				<div className={styles.errorMessage} role="alert">
					<div>
						<strong>No se pudo cargar el inventario</strong>
						<p>{error}</p>
					</div>

					<button
						type="button"
						className={styles.retryButton}
						onClick={() => window.location.reload()}
					>
						Reintentar
					</button>
				</div>
			)}

			<section className={styles.formSection}>
				<ProductForm onAddProduct={handleAddProduct} />
			</section>

			<section className={styles.inventorySection}>
				{loading ? (
					<div className={styles.statusMessage}>
						Cargando productos...
					</div>
				) : (
					<ProductTable products={products} />
				)}
			</section>
		</main>
	);

};

export default ProductsView;