import { useState, useEffect, Fragment } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';

import HomeImageCarousels from '../carousels/Carousel.jsx';
import NavBar from '../navbar/NavBar.jsx';
import ProductCard from '../card/ProductCard.jsx';

import styles from '../../../styles/components/home.module.scss';

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
    const [search, setSearch] = useState('');

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

    // Filtrar productos según el texto ingresado
    const filteredProducts = products.filter(product => {
        const searchText = search.toLowerCase().trim();

        return (
            product.name?.toLowerCase().includes(searchText) ||
            product.brand?.toLowerCase().includes(searchText) ||
            product.color?.toLowerCase().includes(searchText)
        );
    });

    return (
        <Fragment>
            <NavBar />

            <main className={styles.home}>

                {/* Carrusel principal */}
                <section className={styles.hero}>
                    <HomeImageCarousels images={homeImages} />
                </section>

                {/* Buscador */}
                <section className={styles.search}>
                    <Form.Control
                        type="search"
                        placeholder="Buscar productos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </section>

                {/* Resultados de búsqueda */}
                {search.trim() !== '' ? (

                    <section className={styles.productsSection}>
                        <h2 className={styles.title}>
                            Resultados de búsqueda
                        </h2>

                        {filteredProducts.length > 0 ? (
                            <Row>
                                {filteredProducts.map(product => (
                                    <Col
                                        key={product.id_product}
                                        xs={12}
                                        sm={6}
                                        lg={4}
                                        xl={3}
                                    >
                                        <ProductCard
                                            name={product.name}
                                            price={product.price}
                                            image={product.image}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <p className={styles.noResults}>
                                No se encontraron productos.
                            </p>
                        )}
                    </section>

                ) : (

                    /* Grupos de productos */
                    groups.map(group => {
                        const groupTagIds = (group.tags ?? [])
                            .map(tag => Number(tag.id_tag));

                        const groupProducts = products.filter(product => {
                            const productTagIds = (product.tags ?? [])
                                .map(tag => Number(tag.id_tag));

                            return (
                                groupTagIds.length > 0 &&
                                groupTagIds.every(id =>
                                    productTagIds.includes(id)
                                )
                            );
                        });

                        return (
                            <section
                                key={group.id_tag_group}
                                className={styles.productsSection}
                            >
                                <h2 className={styles.title}>
                                    {group.name}
                                </h2>

                                <Row>
                                    {groupProducts.map(product => (
                                        <Col
                                            key={product.id_product}
                                            xs={12}
                                            sm={6}
                                            lg={4}
                                            xl={3}
                                        >
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
                    })
                )}

            </main>
        </Fragment>
    );
};

export default Home;