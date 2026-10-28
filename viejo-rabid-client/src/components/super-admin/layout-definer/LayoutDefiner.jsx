import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import NavBar from '../../shared/navbar/NavBar';
import CollapsibleForm from  '../dashboard/utils/CollapsibleForm.jsx';

import formStyles from '../../../styles/components/formlayout.module.scss';
import styles from '../../../styles/components/layoutdefiner.module.scss';

const LayoutDefiner = () => {
	const [tags, setTags] = useState([]);
	const [groupName, setGroupName] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);
	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('danger');
	const [loadingTags, setLoadingTags] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadTags = async () => {
			try {
				const response = await fetch('http://localhost:3000/layoutdef');

				if (!response.ok) {
					throw new Error('No se pudieron cargar las etiquetas.');
				}

				const tagsData = await response.json();
				const availableTags = Array.isArray(tagsData)
					? tagsData
					: tagsData.tags ?? [];

				setTags(availableTags);
			} catch (error) {
				setMessage(error.message || 'Error al cargar las etiquetas.');
				setMessageType('danger');
			} finally {
				setLoadingTags(false);
			}
		};

		loadTags();
	}, []);

	const handleTagChange = (tagId, checked) => {
		setSelectedTags(previous =>
			checked
				? [...previous, tagId]
				: previous.filter(id => id !== tagId)
		);
	};

	const handleSaveGroup = async (event) => {
		event.preventDefault();
		setMessage('');

		if (!groupName.trim()) {
			setMessage('Ingresá un nombre para la sección.');
			setMessageType('danger');
			return;
		}

		if (selectedTags.length === 0) {
			setMessage('Seleccioná al menos una etiqueta.');
			setMessageType('danger');
			return;
		}

		try {
			setLoading(true);

			const response = await fetch('http://localhost:3000/layoutdef', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: groupName.trim(),
					tags: selectedTags,
				}),
			});

			const data = await response.json().catch(() => ({}));

			if (!response.ok) {
				throw new Error(
					data.message || 'No se pudo guardar el grupo.'
				);
			}

			setGroupName('');
			setSelectedTags([]);
			setMessage('La sección se guardó correctamente.');
			setMessageType('success');
		} catch (error) {
			setMessage(error.message || 'Ocurrió un error al guardar.');
			setMessageType('danger');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.page}>
			<NavBar />

			<main className={styles.content}>
				<header className={styles.pageHeader}>
					<h1 className={styles.pageTitle}>Layout Definer</h1>
					<p className={styles.pageDescription}>
						Organizá los productos de la página principal en secciones
						según sus etiquetas.
					</p>
				</header>

				<CollapsibleForm
					id="layout-definer-form"
					title="Definir sección de productos"
					description="Elegí un nombre y las etiquetas que determinarán qué productos aparecen en esta sección."
					defaultExpanded
				>
					<Form onSubmit={handleSaveGroup}>
						<Form.Group className={formStyles.formGroup}>
							<Form.Label htmlFor="groupName">
								Nombre de la sección
							</Form.Label>

							<Form.Control
								id="groupName"
								type="text"
								value={groupName}
								onChange={event => setGroupName(event.target.value)}
								placeholder="Ej.: Productos de invierno"
								maxLength={100}
								required
							/>
						</Form.Group>

						<div className={styles.tagsSection}>
							<div className={styles.tagsHeader}>
								<h6 className={styles.tagsTitle}>
									Etiquetas disponibles
								</h6>

								<span className={styles.tagsCount}>
									{selectedTags.length} seleccionadas
								</span>
							</div>

							{loadingTags ? (
								<p className={styles.helperText}>
									Cargando etiquetas...
								</p>
							) : tags.length === 0 ? (
								<p className={styles.helperText}>
									No hay etiquetas disponibles.
								</p>
							) : (
								<div className={styles.tagsGrid}>
									{tags.map(tag => (
										<Form.Check
											key={tag.id_tag}
											id={`tag-${tag.id_tag}`}
											type="checkbox"
											label={tag.name}
											checked={selectedTags.includes(tag.id_tag)}
											onChange={event =>
												handleTagChange(
													tag.id_tag,
													event.target.checked
												)
											}
											className={styles.tagOption}
										/>
									))}
								</div>
							)}
						</div>

						<div className={formStyles.formActions}>
							<Button
								type="submit"
								className={formStyles.submitButton}
								disabled={
									loading ||
									loadingTags ||
									tags.length === 0 ||
									!groupName.trim() ||
									selectedTags.length === 0
								}
							>
								{loading ? 'Guardando...' : 'Guardar sección'}
							</Button>
						</div>
					</Form>
				</CollapsibleForm>

				{message && (
					<Alert
						variant={messageType}
						dismissible
						onClose={() => setMessage('')}
					>
						{message}
					</Alert>
				)}
			</main>
		</div>
	);
};

export default LayoutDefiner;