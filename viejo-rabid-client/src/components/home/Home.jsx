
import { useState, useEffect } from 'react';
import { Fragment } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import HomeImageCarousels from '../sheared/carousels/HomeImageCarousels';
import NavBar from '../sheared/navbar/NavBar';
import ProductCard from '../sheared/card/ProductCard';

import styles from './Home.module.css';


const Home = () => {

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

						<Row xs={1} sm={2} lg={3} xl={4} className="g-4">
							{products.map((product) => (
								<Col key={product.id_producto}>
									<ProductCard
										id_proveedor_fk={product.id_proveedor_fk}
										color={product.color}
										talle={product.talle}
										precio={product.precio}
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