import { useState, useEffect } from "react";

import { Fragment } from "react";
import ProductForm from "./products-utils/ProductForm";
import ProductTable from "./products-utils/ProductTable";


import Card from 'react-bootstrap/Card'

const ProductsView = () => {

	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const handleAddProduct = ( newItem ) => {
		setProducts(prevState => [...prevState, newItem])

	};
	
	useEffect(() => {
		const loadProducts = async () => {
			try {
				const response = await fetch(
					'http://localhost:3000/dashboard'
				);

				if (!response.ok) {
					throw new Error('No se pudo cargar los productos');
				}

				const data = await response.json();

				setProducts(data);
				console.log
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		loadProducts();

	}, []);

	return (
		<Fragment>
			<Card>
				<ProductForm onAddProduct={handleAddProduct} />
			</Card>
			<Card>
				<ProductTable products={products}/>
			</Card>
		</Fragment>
	)
}

export default ProductsView;