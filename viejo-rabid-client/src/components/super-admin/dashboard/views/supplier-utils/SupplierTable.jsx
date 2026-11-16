
import { useEffect, useState } from "react";
import { Table, Alert, Spinner, Button } from "react-bootstrap";

import styles from "../../../../../styles/components/suplierstable.module.scss";

const SuppliersTable = ({ refreshKey = 0 }) => {
	const [suppliers, setSuppliers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [deletingId, setDeletingId] = useState(null);

	const loadSuppliers = async () => {
		try {
			setLoading(true);
			setError("");

			const response = await fetch("http://localhost:3000/suppliers");
			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || "No se pudieron cargar los proveedores."
				);
			}

			setSuppliers(
				Array.isArray(data) ? data : data.suppliers ?? []
			);

		} catch (err) {
			console.error("Error al cargar proveedores:", err);
			setError(err.message);

		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadSuppliers();
	}, [refreshKey]);

	const handleDeleteSupplier = async (supplier) => {
		const confirmed = window.confirm(
			`¿Estás seguro de que deseas eliminar al proveedor "${supplier.suppliersName}"?`
		);

		if (!confirmed) return;

		try {
			setDeletingId(supplier.id_supplier);
			setError("");

			const response = await fetch(
				`http://localhost:3000/suppliers/${supplier.id_supplier}`,
				{
					method: "DELETE",
				}
			);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || "No se pudo eliminar el proveedor."
				);
			}

			setSuppliers(prev =>
				prev.filter(
					item => item.id_supplier !== supplier.id_supplier
				)
			);

		} catch (err) {
			console.error("Error al eliminar proveedor:", err);
			setError(err.message);

		} finally {
			setDeletingId(null);
		}
	};

	if (loading) {
		return (
			<div className={styles.loading}>
				<Spinner animation="border" />
				<span>Cargando proveedores...</span>
			</div>
		);
	}

	if (error && suppliers.length === 0) {
		return <Alert variant="danger">{error}</Alert>;
	}

	return (
		<section className={styles.tableContainer}>

			<header className={styles.tableHeader}>
				<div>
					<h4 className={styles.title}>Proveedores</h4>
					<p className={styles.subtitle}>
						Listado de proveedores registrados.
					</p>
				</div>

				<span className={styles.count}>
					{suppliers.length} proveedores
				</span>
			</header>

			{error && (
				<Alert variant="danger" dismissible onClose={() => setError("")}>
					{error}
				</Alert>
			)}

			<div className={styles.tableWrapper}>
				<Table responsive hover className={styles.table}>
					<thead>
						<tr>
							<th>ID</th>
							<th>Proveedor</th>
							<th>Email</th>
							<th>Teléfono</th>
							<th>Acciones</th>
						</tr>
					</thead>

					<tbody>
						{suppliers.length > 0 ? (
							suppliers.map(supplier => (
								<tr key={supplier.id_supplier}>
									<td>{supplier.id_supplier}</td>
									<td>{supplier.suppliersName}</td>
									<td>{supplier.email || "-"}</td>
									<td>{supplier.supplierPhone || "-"}</td>
									<td>
										<Button
											variant="outline-danger"
											size="sm"
											disabled={deletingId !== null}
											onClick={() => handleDeleteSupplier(supplier)}
										>
											{deletingId === supplier.id_supplier ? (
												<Spinner
													animation="border"
													size="sm"
												/>
											) : (
												"Eliminar"
											)}
										</Button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={5} className={styles.emptyState}>
									Todavía no hay proveedores registrados.
								</td>
							</tr>
						)}
					</tbody>
				</Table>
			</div>

		</section>
	);
};

export default SuppliersTable;
