
import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import NavBar from '../../shared/navbar/NavBar';
import CollapsibleForm from '../dashboard/utils/CollapsibleForm.jsx';

import formStyles from '../../../styles/components/formlayout.module.scss';
import styles from '../../../styles/components/layoutdefiner.module.scss';

const API_URL = 'http://localhost:3000';

const LayoutDefiner = () => {
	const [tags, setTags] = useState([]);
	const [tagGroups, setTagGroups] = useState([]);

	const [groupName, setGroupName] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);

	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('danger');

	const [loadingTags, setLoadingTags] = useState(true);
	const [loadingGroups, setLoadingGroups] = useState(true);
	const [loading, setLoading] = useState(false);
	const [deletingGroup, setDeletingGroup] = useState(null);

	// Cargar etiquetas disponibles
	const loadTags = async () => {
		try {
			const response = await fetch(`${API_URL}/layoutdef`);

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

	// Cargar grupos creados
	const loadTagGroups = async () => {
		try {
			const response = await fetch(`${API_URL}/taggroups`);

			if (!response.ok) {
				throw new Error('No se pudieron cargar las secciones.');
			}

			const groupsData = await response.json();

			setTagGroups(
				Array.isArray(groupsData) ? groupsData : []
			);

		} catch (error) {
			setMessage(error.message || 'Error al cargar las secciones.');
			setMessageType('danger');
		} finally {
			setLoadingGroups(false);
		}
	};

	useEffect(() => {
		loadTags();
		loadTagGroups();
	}, []);

	// Seleccionar etiquetas
	const handleTagChange = (tagId, checked) => {
		setSelectedTags(previous =>
			checked
				? [...previous, tagId]
				: previous.filter(id => id !== tagId)
		);
	};

	// Crear grupo
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

			const response = await fetch(`${API_URL}/layoutdef`, {
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

			await loadTagGroups();

			setMessage('La sección se guardó correctamente.');
			setMessageType('success');

		} catch (error) {
			setMessage(error.message || 'Ocurrió un error al guardar.');
			setMessageType('danger');
		} finally {
			setLoading(false);
		}
	};

	// Eliminar grupo
	const handleDeleteGroup = async (groupId) => {
		const confirmed = window.confirm(
			'¿Estás seguro de que querés eliminar esta sección?'
		);

		if (!confirmed) return;

		try {
			setDeletingGroup(groupId);
			setMessage('');

			const response = await fetch(
				`${API_URL}/taggroups/${groupId}`,
				{
					method: 'DELETE',
				}
			);

			const data = await response.json().catch(() => ({}));

			if (!response.ok) {
				throw new Error(
					data.message || 'No se pudo eliminar la sección.'
				);
			}

			await loadTagGroups();

			setMessage('La sección se eliminó correctamente.');
			setMessageType('success');

		} catch (error) {
			setMessage(error.message || 'Error al eliminar la sección.');
			setMessageType('danger');
		} finally {
			setDeletingGroup(null);
		}
	};

	return (
		<div className={styles.page}>
			<NavBar />

			<main className={styles.content}>
				<header className={styles.pageHeader}>
					<h1 className={styles.pageTitle}>
						Layout Definer
					</h1>

					<p className={styles.pageDescription}>
						Organizá los productos de la página principal
						en secciones según sus etiquetas.
					</p>
				</header>

				{/* FORMULARIO DE CREACIÓN */}
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
								onChange={event =>
									setGroupName(event.target.value)
								}
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

				{/* GRUPOS CREADOS */}
				<section className={styles.groupsSection}>
					<header className={styles.groupsHeader}>
						<div>
							<h2 className={styles.groupsTitle}>
								Secciones creadas
							</h2>

							<p className={styles.groupsDescription}>
								Administrá las secciones de productos
								que aparecen en la página principal.
							</p>
						</div>

						<span className={styles.groupsCount}>
							{tagGroups.length} secciones
						</span>
					</header>

					{loadingGroups ? (
						<p className={styles.helperText}>
							Cargando secciones...
						</p>
					) : tagGroups.length === 0 ? (
						<div className={styles.emptyGroups}>
							<p>No hay secciones creadas todavía.</p>
							<span>
								Creá una sección utilizando el formulario
								superior.
							</span>
						</div>
					) : (
						<div className={styles.groupsGrid}>
							{tagGroups.map(group => (
								<article
									key={group.id_tag_group}
									className={styles.groupCard}
								>
									<div className={styles.groupCardHeader}>
										<div>
											<h3 className={styles.groupName}>
												{group.name}
											</h3>

											<span className={styles.groupTagCount}>
												{group.tags?.length ?? 0} etiquetas
											</span>
										</div>

										<Button
											variant="outline-danger"
											size="sm"
											onClick={() =>
												handleDeleteGroup(
													group.id_tag_group
												)
											}
											disabled={
												deletingGroup === group.id_tag_group
											}
										>
											{deletingGroup === group.id_tag_group
												? 'Eliminando...'
												: 'Eliminar'}
										</Button>
									</div>

									<div className={styles.groupTags}>
										{group.tags?.length > 0 ? (
											group.tags.map(tag => (
												<span
													key={tag.id_tag}
													className={styles.groupTag}
												>
													{tag.name}
												</span>
											))
										) : (
											<span className={styles.helperText}>
												Sin etiquetas asociadas.
											</span>
										)}
									</div>
								</article>
							))}
						</div>
					)}
				</section>

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
