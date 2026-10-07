import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import styles from './ProductCard.module.css';

const ProductCard = ({ name, size, color, price }) => {
	return (
		<Card className={styles.card}>

			<Card.Img
				className={styles.image}
				variant="top"
				src="holder.js/100px180"
			/>

			<Card.Body className={styles.body}>

				<Card.Title className={styles.title}>
					{name}
				</Card.Title>

				<Card.Text className={styles.info}>
					<span>{size}</span>
					<span>{color}</span>
					<span>${price}</span>
				</Card.Text>

				<Button
					className={styles.button}
					variant="primary"
				>
					Ver más
				</Button>

			</Card.Body>

		</Card>
	);
};

export default ProductCard;