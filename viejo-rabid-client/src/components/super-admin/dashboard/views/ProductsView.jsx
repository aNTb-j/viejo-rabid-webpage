
import { useState, useEffect } from 'react';

import ProductForm from './products-utils/ProductForm';
import ProductTable from './products-utils/ProductTable';

import styles from '../../../../styles/components/productview.module.scss';

const ProductsView = () => {
	const [products, setProducts] = useState([]);
	const [editingProduct, setEditingProduct] = useState(null);

	const [search, setSearch] = useState('');

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// Filtrar productos
	const searchValue = search.trim().toLowerCase();

	const filteredProducts = products.filter(product => {
		const values = [
			product.name,
			product.size,
			product.brand,
			product.color,
			product.intern_code
		];

		return values.some(value =>
			String(value ?? '').toLowerCase().includes(searchValue)
		);
	});
	// Agregar producto
	const handleAddProduct = (newItem) => {
		if (!newItem) return;

		setProducts(prev => [...prev, newItem]);
	};

	// Seleccionar producto para editar
	const handleEditProduct = (product) => {
		console.log(product);
		setEditingProduct(product);
	};

	// Actualizar producto en la tabla
	const handleUpdateProduct = (updatedProduct) => {
		setProducts(prev =>
			prev.map(product =>
				Number(product.id_product) === Number(updatedProduct.id_product)
					? updatedProduct
					: product
			)
		);

		setEditingProduct(null);
	};

	// Cancelar edición
	const handleCancelEdit = () => {
		setEditingProduct(null);
	};

	// Eliminar producto
	const handleDeleteProduct = async (id) => {
		try {
			setError('');

			const response = await fetch(
				`http://localhost:3000/product/${id}`,
				{ method: 'DELETE' }
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'No se pudo eliminar el producto');
			}

			setProducts(prev =>
				prev.filter(
					product => Number(product.id_product) !== Number(id)
				)
			);

			if (Number(editingProduct?.id_product) === Number(id)) {
				setEditingProduct(null);
			}

		} catch (error) {
			setError(error.message);
		}
	};

	// Cargar productos
	useEffect(() => {
		const loadProducts = async () => {
			try {
				const response = await fetch('http://localhost:3000/product');

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
					<span className={styles.eyebrow}>ADMINISTRACIÓN</span>
					<h1 className={styles.pageTitle}>Productos</h1>
				</div>

				<div className={styles.totalCard}>
					<span className={styles.totalLabel}>
						Productos registrados:
					</span>

					<strong className={styles.totalValue}>
						{loading ? '—' : products.length}
					</strong>
				</div>
			</header>

			{error && (
				<div className={styles.errorMessage} role="alert">
					<strong>Error</strong>
					<p>{error}</p>
				</div>
			)}

			<section className={styles.formSection}>
				<ProductForm
					onAddProduct={handleAddProduct}
					onUpdateProduct={handleUpdateProduct}
					editingProduct={editingProduct}
					onCancelEdit={handleCancelEdit}
				/>
			</section>

			<section className={styles.inventorySection}>
				<div className={styles.searchContainer}>
					<input
						type="text"
						placeholder="Buscar por nombre, marca, color o código..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className={styles.searchInput}
					/>
				</div>

				{loading ? (
					<div className={styles.statusMessage}>
						Cargando productos...
					</div>
				) : (
					<ProductTable
						products={filteredProducts}
						onEditProduct={handleEditProduct}
						onRemoveProduct={handleDeleteProduct}
					/>
				)}
			</section>
		</main>
	);
};

export default ProductsView;
