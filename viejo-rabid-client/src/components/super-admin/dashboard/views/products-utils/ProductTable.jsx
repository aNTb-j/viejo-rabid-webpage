
// https://es.react.dev/reference/react/useMemo
import { useState, useEffect } from 'react';


import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';



function ProductTable({ products = [], onEdit, onDelete}) {

	return (
		<Table striped bordered hover responsive>
			<thead>
				<tr>
					<th>ID</th>
					<th>Producto</th>
					<th>Talle</th>
					<th>Stock</th>
				</tr>
			</thead>

			<tbody>
				{products.map(product => (
					<tr key={product.id_product}>
						<td>{product.id_product}</td>
						<td>{product.name}</td>
						<td>{product.size}</td>
						<td>{product.stock}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

export default ProductTable;