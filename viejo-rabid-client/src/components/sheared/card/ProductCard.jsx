import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductCard = ( {id_producto, id_proveedor_fk, codigo_proveedor, color, talle, precio} ) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{codigo_proveedor}</Card.Title>
        <Card.Text>
          {id_producto}
			 {id_proveedor_fk}
			 {color}
			 {talle}
			 {precio}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;