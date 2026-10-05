
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import HomeImageCarousels from '../sheared/carousels/HomeImageCarousels';
import ProductCard from '../sheared/card/ProductCard';

const stockData = [
	{
		id_producto_fk: 1,
		id_proveedor_fk: 1,
		id_ventas_fk: 1,
		stock_actual: 25,
		stock_minimo: 10
	},
	{
		id_producto_fk: 2,
		id_proveedor_fk: 1,
		id_ventas_fk: 2,
		stock_actual: 18,
		stock_minimo: 8
	},
	{
		id_producto_fk: 3,
		id_proveedor_fk: 1,
		id_ventas_fk: 3,
		stock_actual: 32,
		stock_minimo: 10
	},
	{
		id_producto_fk: 4,
		id_proveedor_fk: 2,
		id_ventas_fk: 4,
		stock_actual: 7,
		stock_minimo: 10
	},
	{
		id_producto_fk: 5,
		id_proveedor_fk: 2,
		id_ventas_fk: 5,
		stock_actual: 15,
		stock_minimo: 5
	},
	{
		id_producto_fk: 6,
		id_proveedor_fk: 2,
		id_ventas_fk: 6,
		stock_actual: 4,
		stock_minimo: 8
	},
	{
		id_producto_fk: 7,
		id_proveedor_fk: 3,
		id_ventas_fk: 7,
		stock_actual: 21,
		stock_minimo: 10
	},
	{
		id_producto_fk: 8,
		id_proveedor_fk: 3,
		id_ventas_fk: 8,
		stock_actual: 9,
		stock_minimo: 5
	},
	{
		id_producto_fk: 9,
		id_proveedor_fk: 3,
		id_ventas_fk: 9,
		stock_actual: 3,
		stock_minimo: 5
	},
	{
		id_producto_fk: 10,
		id_proveedor_fk: 4,
		id_ventas_fk: 10,
		stock_actual: 27,
		stock_minimo: 10
	},
	{
		id_producto_fk: 11,
		id_proveedor_fk: 4,
		id_ventas_fk: 11,
		stock_actual: 12,
		stock_minimo: 5
	},
	{
		id_producto_fk: 12,
		id_proveedor_fk: 5,
		id_ventas_fk: 12,
		stock_actual: 6,
		stock_minimo: 10
	}
];

const hproducts = [
	{
		id_producto: 1,
		id_proveedor_fk: "PROV001",
		codigo_proveedor: "NIKE-001",
		color: "Negro",
		talle: "S",
		precio: "45000"
	},
	{
		id_producto: 2,
		id_proveedor_fk: "PROV001",
		codigo_proveedor: "NIKE-002",
		color: "Blanco",
		talle: "M",
		precio: "45000"
	},
	{
		id_producto: 3,
		id_proveedor_fk: "PROV001",
		codigo_proveedor: "NIKE-003",
		color: "Rojo",
		talle: "L",
		precio: "48000"
	},
	{
		id_producto: 4,
		id_proveedor_fk: "PROV002",
		codigo_proveedor: "ADIDAS-001",
		color: "Negro",
		talle: "M",
		precio: "52000"
	},
	{
		id_producto: 5,
		id_proveedor_fk: "PROV002",
		codigo_proveedor: "ADIDAS-002",
		color: "Azul",
		talle: "L",
		precio: "55000"
	},
	{
		id_producto: 6,
		id_proveedor_fk: "PROV002",
		codigo_proveedor: "ADIDAS-003",
		color: "Blanco",
		talle: "XL",
		precio: "55000"
	},
	{
		id_producto: 7,
		id_proveedor_fk: "PROV003",
		codigo_proveedor: "PUMA-001",
		color: "Verde",
		talle: "S",
		precio: "39000"
	},
	{
		id_producto: 8,
		id_proveedor_fk: "PROV003",
		codigo_proveedor: "PUMA-002",
		color: "Negro",
		talle: "M",
		precio: "42000"
	},
	{
		id_producto: 9,
		id_proveedor_fk: "PROV003",
		codigo_proveedor: "PUMA-003",
		color: "Gris",
		talle: "L",
		precio: "42000"
	},
	{
		id_producto: 10,
		id_proveedor_fk: "PROV004",
		codigo_proveedor: "REEBOK-001",
		color: "Blanco",
		talle: "M",
		precio: "47000"
	},
	{
		id_producto: 11,
		id_proveedor_fk: "PROV004",
		codigo_proveedor: "REEBOK-002",
		color: "Gris",
		talle: "L",
		precio: "49000"
	},
	{
		id_producto: 12,
		id_proveedor_fk: "PROV005",
		codigo_proveedor: "UNDER-001",
		color: "Negro",
		talle: "L",
		precio: "68000"
	},
	{
		id_producto: 13,
		id_proveedor_fk: "PROV005",
		codigo_proveedor: "UNDER-002",
		color: "Azul",
		talle: "XL",
		precio: "70000"
	}
];

const Home = () => {
	const [products, setProducts] = useState(hproducts);
	

	return (
		<div>
			<Container className="c-1">
				<HomeImageCarousels/>
			</Container>
			<Container>
				<Row xs={1} sm={2} lg={3} xl={4} className="g-4">
					{products.map((product) =>
						<Col key={product.id_producto}>
							<ProductCard
								id_proveedor_fk={product.id_proveedor_fk}
								color={product.color}
								talle={product.talle}
								precio={product.precio} />

						</Col>
						
						
					)}

				</Row>
			</Container>
		</div>
	)
}

export default Home