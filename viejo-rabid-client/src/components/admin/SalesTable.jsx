import { useState, useEffect } from "react";
import { Button, Card, Alert } from "react-bootstrap";

import CustomTable from "../shared/table/CustomTable";

const SalesTable = ({ refreshKey }) => {

	const [sales, setSales] = useState([]);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("danger");

	useEffect(() => {
		let active = true;

		const fetchSales = async () => {
			try {
				const response = await fetch("http://localhost:3000/sales");
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.message || "Error al obtener las ventas.");
				}

				if (active) {
					setSales(data.sales);
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

	const handleDelete = async (id) => {

		if (!window.confirm("¿Está seguro de eliminar esta venta?")) {
			return;
		}

		try {
			const response = await fetch(`http://localhost:3000/sales/${id}`, {
				method: "DELETE"
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Error al eliminar la venta.");
			}

			setSales(prev => prev.filter(sale => sale.id_sales !== id));
			setMessage(data.message);
			setMessageType("success");

		} catch (error) {
			setMessage(error.message);
			setMessageType("danger");
		}
	};

	const titles = [
		{
			key: "id_sales",
			label: "ID"
		},
		{
			key: "placeholder",
			label: "Datos de la venta"
		},
		{
			key: "actions",
			label: "Acciones",
			render: (sale) => (
				<Button
					variant="danger"
					size="sm"
					onClick={() => handleDelete(sale.id_sales)}>
					Eliminar
				</Button>
			)
		}
	];

	return (
		<Card className="p-3">
			<Card.Body>
				<h4 className="mb-3">Ventas registradas</h4>

				{message && (
					<Alert
						variant={messageType}
						dismissible
						onClose={() => setMessage("")}>
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
	);
};

export default SalesTable;