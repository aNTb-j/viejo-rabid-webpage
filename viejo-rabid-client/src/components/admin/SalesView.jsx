import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";

import { GenericForm } from "../shared/forms/GenericForm.jsx";
import SalesTable from "./SalesTable.jsx";

import styles from "../../styles/components/sales.module.scss";

const SalesView = () => {
	const navigate = useNavigate();

	const [sale, setSale] = useState({
		placeholder: ""
	});

	const [message, setMessage] = useState("");
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setSale(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);
		setMessage("");

		try {
			const response = await fetch("http://localhost:3000/sales", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(sale)
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Error al registrar la venta.");
			}

			setMessage(data.message);
			setError(false);
			setSale({ placeholder: "" });

			setRefreshKey(prev => prev + 1);

		} catch (err) {
			setMessage(err.message);
			setError(true);

		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.salesPage}>

			<header className={styles.pageHeader}>
				<h2 className={styles.pageTitle}>Ventas</h2>
				<p className={styles.pageDescription}>
					Registrá nuevas ventas y consultá el historial.
				</p>
			</header>

			<Card className={styles.formCard}>
				<Card.Body className={styles.formBody}>

					<div className={styles.formHeader}>
						<h4 className={styles.formTitle}>Registrar venta</h4>
						<p className={styles.formDescription}>
							Completá los datos para registrar una nueva venta.
						</p>
					</div>

					{message && (
						<Alert
							variant={error ? "danger" : "success"}
							className={styles.alert}
							dismissible
							onClose={() => setMessage("")}
						>
							{message}
						</Alert>
					)}

					<Form onSubmit={handleSubmit}>
						<GenericForm
							id="placeholder"
							name="placeholder"
							text="Datos de la venta"
							value={sale.placeholder}
							onChange={handleChange}
							placeholder="Ingresar datos"
							required
							className={styles.formField}
						/>

						<Button
							type="submit"
							className={styles.submitButton}
							disabled={loading}
						>
							{loading ? "Registrando..." : "Registrar venta"}
						</Button>
					</Form>

				</Card.Body>
			</Card>

			<section className={styles.tableSection}>
				<SalesTable refreshKey={refreshKey} />
			</section>

			<div className={styles.navigation}>
				<Button
					type="button"
					className={styles.backButton}
					onClick={() => navigate("/home")}
				>
					Volver a Home
				</Button>
			</div>

		</div>
	);
};

export default SalesView;