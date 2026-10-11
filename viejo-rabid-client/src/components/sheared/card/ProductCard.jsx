import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import styles from './ProductCard.module.css';

const ProductCard = ({ name, selectedColor,setSelectedColor, colorOptions, price, image }) => {
	return (
		<Card className={styles.card}>
			<div className={styles.imageContainer}>
				<Card.Img
					className={styles.image}
					variant="top"
					src={
						image ||
						'https://placehold.co/600x750/f0ede5/526b53?text=Viejo+Rabid'
					}
					alt={name || 'Producto'}
				/>
			</div>

			<Card.Body className={styles.body}>
				<Card.Title className={styles.title}>
					{name || 'Producto'}
				</Card.Title>

				<p className={styles.price}>
					${Number(price || 0).toLocaleString('es-AR')}
				</p>

				<div className={styles.colorSection}>
					<span className={styles.colorLabel}>
						Color: {selectedColor}
					</span>

					<div className={styles.colorOptions}>
						{colorOptions.map((option) => (
							<button
								key={option.name}
								type="button"
								title={option.name}
								aria-label={`Seleccionar color ${option.name}`}
								aria-pressed={selectedColor === option.name}
								className={`${styles.colorButton} ${selectedColor === option.name
										? styles.selectedColor
										: ''
									}`}
								style={{ '--swatch-color': option.value }}
								onClick={() => setSelectedColor(option.name)}
							/>
						))}
					</div>
				</div>

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