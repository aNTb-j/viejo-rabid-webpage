import { Fragment } from 'react';

import Form from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const ProductForm = () => {
	return (
		<Fragment>
			<Form>
				<Form.Group className="mb-3" controlId="productCode">
					<Form.Label>Codigo</Form.Label>
					<Form.Control type="prod-name" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="productBrand">
					<Form.Label>Marca</Form.Label>
					<Form.Control type="prod-brand" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="productName">
					<Form.Label>Producto</Form.Label>
					<Form.Control type="prod-name" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="productColor">
					<Form.Label>Color</Form.Label>
					<Form.Control type="prod-color" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="productSize">
					<Form.Label>Talla</Form.Label>
					<Form.Select>
						<option>-</option>
						<option>XS</option>
						<option>S</option>
						<option>M</option>
						<option>L</option>
						<option>XL</option>
						<option>XXL</option>
					</Form.Select>
				</Form.Group>

				<Form.Group className="mb-3" controlId="productStock">
					<Form.Label>Stock</Form.Label>
					<Form.Control type="prod-stock" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="date">
					<Form.Label>Fecha</Form.Label>
					<Form.Control type="prod-date" />
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>

			</Form>
		</Fragment>

	)
}

export default ProductForm;
