import { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import NavBar from '../../shared/navbar/NavBar';

const LayoutDefiner = () => {
	const [tags, setTags] = useState([]);
	const [groupName, setGroupName] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	console.log(tags)
	useEffect(() => {
		const loadTags = async () => {
			try {
				const response = await fetch('http://localhost:3000/layoutdef');

				if (!response.ok) {
					console.log(response)
					throw new Error('No se pudieron cargar las tags');
				}

				const tagsData = await response.json();
				setTags(Array.isArray(tagsData) ? tagsData : tagsData.tags ?? []);
			} catch (error) {
				setError(error.message);
			}
		};

		loadTags();
	}, []);

	const handleSaveGroup = async (event) => {
		event.preventDefault();
		setError('');
		setLoading(true);

		try {
			const response = await fetch('http://localhost:3000/layoutdef', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: groupName,
					tags: selectedTags
				})
			});

			if (!response.ok) {
				throw new Error('No se pudo guardar el grupo');
			}

			setGroupName('');
			setSelectedTags([]);
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<NavBar />

			<Card className="m-3">
				<Card.Header>
					Definir sección de productos
				</Card.Header>

				<Card.Body>
					{error && (
						<Alert variant="danger">
							{error}
						</Alert>
					)}

					<Form onSubmit={handleSaveGroup}>
						<Form.Group className="mb-3">
							<Form.Label>Nombre de la sección</Form.Label>

							<Form.Control
								type="text"
								value={groupName}
								onChange={event => setGroupName(event.target.value)}
								placeholder="Ej.: Productos de invierno"
								required
							/>
						</Form.Group>

						<Form.Label>Seleccionar tags</Form.Label>

						{tags.map(tag => (
							<Form.Check
								key={tag.id_tag}
								type="checkbox"
								label={tag.name}
								checked={selectedTags.includes(tag.id_tag)}
								onChange={event => {
									const checked = event.target.checked;

									setSelectedTags(previous =>
										checked
											? [...previous, tag.id_tag]
											: previous.filter(id => id !== tag.id_tag)
									);
								}}
							/>
						))}

						<Button
							type="submit"
							className="mt-3"
							disabled={
								!groupName.trim() ||
								selectedTags.length === 0 ||
								loading
							}
						>
							{loading ? 'Guardando...' : 'Guardar grupo'}
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
};

export default LayoutDefiner;