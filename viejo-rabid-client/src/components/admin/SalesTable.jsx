
import { useState, useEffect } from "react";
import {
	Button,
	Card,
	Alert,
	Modal,
	Form,
} from "react-bootstrap";

import CustomTable from "../shared/table/CustomTable";
import GenericConfirmModal from "../shared/modal/GenericConfirmModal";

const SalesTable = ({ refreshKey }) => {

	const [sales, setSales] = useState([]);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("danger");

	// Edición
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedSale, setSelectedSale] = useState(null);
	const [description, setDescription] = useState("");
	const [saving, setSaving] = useState(false);

	// Eliminación
	const [showConfirm, setShowConfirm] = useState(false);
	const [saleToDelete, setSaleToDelete] = useState(null);
	const [deleting, setDeleting] = useState(false);

	// Obtener ventas
	useEffect(() => {
		let active = true;

		const fetchSales = async () => {
			try {
				setLoading(true);

				const response = await fetch("http://localhost:3000/sales");
				const data = await response.json();

				if (!response.ok) {
					throw new Error(
						data.message || "Error al obtener las ventas."
					);
				}

				if (active) {
					setSales(data.sales ?? []);
					setMessage("");
				}

			} catch (error) {
				if (active) {
					setMessage(error.message);
					setMessageType("danger");
				}

			} finally {
				if (active) {
					setLoading(false);
				}
			}
		};

		fetchSales();

		return () => {
			active = false;
		};

	}, [refreshKey]);

	// Abrir edición
	const handleEdit = (sale) => {
		setSelectedSale(sale);
		setDescription(sale.placeholder || "");
		setShowEditModal(true);
	};

	// Cerrar edición
	const handleCloseEdit = () => {
		if (saving) return;

		setShowEditModal(false);
		setSelectedSale(null);
		setDescription("");
	};

	// Guardar descripción
	const handleSaveEdit = async () => {
		if (!selectedSale || saving) return;

		if (!description.trim()) {
			setMessage("La descripción no puede estar vacía.");
			setMessageType("danger");
			return;
		}

		try {
			setSaving(true);
			setMessage("");

			const response = await fetch(
				`http://localhost:3000/sales/${selectedSale.id_sales}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						placeholder: description.trim(),
					}),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || "Error al actualizar la venta."
				);
			}

			// Actualizar tabla localmente
			setSales(prev =>
				prev.map(sale =>
					sale.id_sales === selectedSale.id_sales
						? { ...sale, placeholder: description.trim() }
						: sale
				)
			);

			setShowEditModal(false);
			setSelectedSale(null);
			setDescription("");

			setMessage(data.message || "Descripción actualizada correctamente.");
			setMessageType("success");

		} catch (error) {
			setMessage(error.message);
			setMessageType("danger");

		} finally {
			setSaving(false);
		}
	};

	// Abrir confirmación de eliminación
	const handleDeleteClick = (sale) => {
		setSaleToDelete(sale);
		setShowConfirm(true);
	};

	// Cancelar eliminación
	const handleCancelDelete = () => {
		if (deleting) return;

		setShowConfirm(false);
		setSaleToDelete(null);
	};

	// Eliminar venta
	const handleDelete = async () => {
		if (!saleToDelete || deleting) return;

		try {
			setDeleting(true);
			setMessage("");

			const response = await fetch(
				`http://localhost:3000/sales/${saleToDelete.id_sales}`,
				{
					method: "DELETE",
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || "Error al eliminar la venta."
				);
			}

			setSales(prev =>
				prev.filter(
					sale => sale.id_sales !== saleToDelete.id_sales
				)
			);

			setShowConfirm(false);
			setSaleToDelete(null);

			setMessage(data.message || "Venta eliminada correctamente.");
			setMessageType("success");

		} catch (error) {
			setMessage(error.message);
			setMessageType("danger");

		} finally {
			setDeleting(false);
		}
	};

	const titles = [
		{
			key: "id_sales",
			label: "ID",
		},
		{
			key: "placeholder",
			label: "Datos de la venta",
		},
		{
			key: "actions",
			label: "Acciones",
			render: (sale) => (
				<div className="d-flex gap-2">
					<Button
						variant="outline-primary"
						size="sm"
						onClick={() => handleEdit(sale)}
					>
						Editar
					</Button>

					<Button
						variant="outline-danger"
						size="sm"
						onClick={() => handleDeleteClick(sale)}
						disabled={deleting}
					>
						Eliminar
					</Button>
				</div>
			),
		},
	];

	return (
		<>
			<Card className="p-3">
				<Card.Body>
					<h4 className="mb-3">Ventas registradas</h4>

					{message && (
						<Alert
							variant={messageType}
							dismissible
							onClose={() => setMessage("")}
						>
							{message}
						</Alert>
					)}

					{loading ? (
						<p>Cargando ventas...</p>
					) : (
						<CustomTable
							titles={titles}
							data={sales}
							rowKey="id_sales"
							emptyMessage="No hay ventas registradas"
							emptyDescription="Las ventas que registres aparecerán aquí."
						/>
					)}
				</Card.Body>
			</Card>

			{/* Modal de edición */}
			<Modal
				show={showEditModal}
				onHide={handleCloseEdit}
				centered
			>
				<Modal.Header closeButton={!saving}>
					<Modal.Title>Editar descripción</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form.Group>
						<Form.Label>Descripción de la venta</Form.Label>

						<Form.Control
							as="textarea"
							rows={4}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Ingresar descripción de la venta"
							disabled={saving}
						/>
					</Form.Group>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={handleCloseEdit}
						disabled={saving}
					>
						Cancelar
					</Button>

					<Button
						variant="primary"
						onClick={handleSaveEdit}
						disabled={saving}
					>
						{saving ? "Guardando..." : "Guardar cambios"}
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Modal de confirmación */}
			<GenericConfirmModal
				show={showConfirm}
				title="Eliminar venta"
				message={
					<>
						¿Estás seguro de que deseas eliminar la venta{" "}
						<strong>#{saleToDelete?.id_sales}</strong>?
						<br />
						Esta acción no se puede deshacer.
					</>
				}
				onConfirm={handleDelete}
				onCancel={handleCancelDelete}
				confirmText="Eliminar"
				confirmVariant="danger"
				loading={deleting}
			/>
		</>
	);
};

export default SalesTable;
