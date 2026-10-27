import Carousel from 'react-bootstrap/Carousel';

const HomeImageCarousels = ({ images = [] }) => {
	if (images.length === 0) {
		return null;
	}

	return (
		<Carousel interval={4000} pause="hover" indicators controls>
			{images.map((image, index) => (
				<Carousel.Item key={image.src ?? index}>
					<img className="d-block w-100" src={image.src} alt={image.alt || `Imagen ${index + 1}`}/>

					{(image.title || image.description) && (
						<Carousel.Caption>
							{image.title && (<h3>{image.title}</h3>)}
							{image.description && (<p>{image.description}</p>)}
						</Carousel.Caption>
					)}
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default HomeImageCarousels;