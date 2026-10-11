import { useState } from 'react';
import { Fragment } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import HomeImageCarousels from '../sheared/carousels/HomeImageCarousels';
import NavBar from '../sheared/navbar/NavBar';
import ProductCard from '../sheared/card/ProductCard';

import styles from './Home.module.css';

const products = [
	{
		id_product: 1,
		id_supplier_fk: 1,
		name: 'Remera básica',
		color: 'Negro',
		size: 'M',
		price: 15000,
		stock: 12,
		tags: ['verano', 'básico', 'algodón']
	},
	{
		id_product: 2,
		id_supplier_fk: 2,
		name: 'Remera oversize',
		color: 'Blanco',
		size: 'L',
		price: 18500,
		stock: 8,
		tags: ['verano', 'oversize', 'algodón']
	},
	{
		id_product: 3,
		id_supplier_fk: 1,
		name: 'Buzo clásico',
		color: 'Gris',
		size: 'M',
		price: 32000,
		stock: 6,
		tags: ['invierno', 'básico']
	},
	{
		id_product: 4,
		id_supplier_fk: 3,
		name: 'Pantalón cargo',
		color: 'Verde',
		size: 'L',
		price: 42000,
		stock: 4,
		tags: ['cargo', 'urbano']
	},
	{
		id_product: 5,
		id_supplier_fk: 2,
		name: 'Campera',
		color: 'Negro',
		size: 'L',
		price: 58000,
		stock: 3,
		tags: ['invierno', 'urbano']
	},
	{
		id_product: 6,
		id_supplier_fk: 4,
		name: 'Short deportivo',
		color: 'Azul',
		size: 'M',
		price: 22000,
		stock: 10,
		tags: ['verano', 'deportivo']
	},
	{
		id_product: 7,
		id_supplier_fk: 3,
		name: 'Jean recto',
		color: 'Azul',
		size: '42',
		price: 45000,
		stock: 7,
		tags: ['jean', 'urbano']
	},
	{
		id_product: 8,
		id_supplier_fk: 1,
		name: 'Camisa manga larga',
		color: 'Beige',
		size: 'M',
		price: 29000,
		stock: 5,
		tags: ['formal', 'invierno']
	}
];

const Home = () => {


	const [selectedColors, setSelectedColors] = useState(
		Object.fromEntries(
			products.map((product) => [
				product.id_product,
				product.color
			])
		)
	);

	const colorOptions = [
		{ name: 'Negro', value: '#222222' },
		{ name: 'Blanco', value: '#f5f5f0' },
		{ name: 'Gris', value: '#808080' },
		{ name: 'Verde', value: '#526b53' },
		{ name: 'Azul', value: '#365b85' },
		{ name: 'Beige', value: '#d6c5a8' },
		{ name: 'Rojo', value: '#a6443f' }
	];

	const handleColorChange = (productId, color) => {
		setSelectedColors((previous) => ({
			...previous,
			[productId]: color
		}));
	};


	return (
		<Fragment>
			<NavBar />

			<main className={styles.home}>
				<section className={styles.hero}>
					<HomeImageCarousels />
				</section>

				<section className={styles.productsSection}>
					<Container>
						<h2 className={styles.title}>Productos destacados</h2>

						<Row xs={1} sm={2} lg={3} xl={4} className={styles.productRow}>
							{products.map((product) => (
								<Col key={product.id_product} className={styles.productCol}>
									<ProductCard
										name={product.name}
										price={product.price}
										image={product.image}
										selectedColor={selectedColors[product.id_product]}
										colorOptions={colorOptions}
										setSelectedColor={(color) =>
											handleColorChange(product.id_product, color)
										}
									/>
								</Col>
							))}
						</Row>
					</Container>
				</section>
			</main>
		</Fragment>
	);
};

export default Home