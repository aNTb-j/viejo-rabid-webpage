import { useState, useEffect, Fragment } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import HomeImageCarousels from '../carousels/Carousel.jsx';
import NavBar from '../navbar/NavBar.jsx';
import ProductCard from '../card/ProductCard.jsx';

import styles from './Home.module.css';

// Cambiarla a banco de imagenes

const homeImages = [
	{
		src: '../../../../public/images/home-1.jpg',
		alt: 'Colección de ropa masculina',
		title: 'Nueva colección',
		description: 'Descubrí las novedades de Viejo Rabid.',
	},
	{
		src: '../../../../public/images/home-2.png',
		alt: 'Ropa casual masculina',
		title: 'Estilo para todos los días',
		description: 'Prendas para acompañar tu estilo.',
	}
];

const Home = () => {
	const [products, setProducts] = useState([]);
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		const loadData = async () => {
			try {
				const [responseProducts, responseGroups] = await Promise.all([
					fetch('http://localhost:3000/dashboard'),
					fetch('http://localhost:3000/taggroups')
				]);

				if (!responseProducts.ok || !responseGroups.ok) {
					throw new Error('No se pudieron cargar los datos');
				}

				const productsData = await responseProducts.json();
				const groupsData = await responseGroups.json();

				setProducts(productsData);
				setGroups(groupsData);
			} catch (error) {
				console.error(error);
			}
		};

		loadData();
	}, []);

	return (
		<Fragment>
			<NavBar />

			<main className={styles.home}>
				<section className={styles.hero}>
					<HomeImageCarousels images={homeImages} />
				</section>

				{groups.map(group => {
					const groupTagIds = (group.tags ?? []).map(tag => Number(tag.id_tag));

					const groupProducts = products.filter(product => {
						const productTagIds = (product.tags ?? []).map(tag => Number(tag.id_tag));

						return (
							groupTagIds.length > 0 &&
							groupTagIds.every(id => productTagIds.includes(id))
						);
					});

					return (
						<section key={group.id_tag_group}>
							<h2>{group.name}</h2>

							<Row>
								{groupProducts.map(product => (
									<Col key={product.id_product}>
										<ProductCard
											name={product.name}
											price={product.price}
											image={product.image}
										/>
									</Col>
								))}
							</Row>
						</section>
					);
				})}
			</main>
		</Fragment>
	);
};

export default Home;