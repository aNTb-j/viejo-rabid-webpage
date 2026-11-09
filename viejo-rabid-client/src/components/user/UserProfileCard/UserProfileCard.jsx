
import { useContext, useEffect, useState } from "react";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";

import { AuthenticationContext } from "../../shared/auth/auth.context";

const UserProfileCard = () => {
	const { token, handleUserLogout } = useContext(AuthenticationContext);

	const [user, setUser] = useState(null);
	const [username, setUsername] = useState("");

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");



	// Obtiene los datos del usuario
	useEffect(() => {
		const fetchUser = async () => {
			if (!token) {
				setError("Debés iniciar sesión para ver tu perfil.");
				setLoading(false);
				return;
			}

			try {
				const response = await fetch("http://localhost:3000/client", {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});

				const data = await response.json();

				console.log("Status:", response.status);
				console.log("Respuesta backend:", data);

				if (!response.ok) {
					throw new Error(data.message || "No se pudieron obtener los datos.");
				}

				setUser(data);
				setUsername(data.username ?? "");

			} catch (error) {
				console.error("Error al obtener usuario:", error);
				setError(error.message);

			} finally {
				setLoading(false);
			}
		};

		fetchUser();

	}, [token]);

	// Modifica el nombre de usuario
	const handleEditUsername = async (e) => {
		e.preventDefault();

		if (!username.trim()) {
			setError("El nombre de usuario es obligatorio.");
			return;
		}

		try {
			setSaving(true);
			setError("");
			setMessage("");

			const response = await fetch("http://localhost:3000/client", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ user: username.trim() })
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "No se pudo actualizar el usuario.");
			}

			setMessage(data.message);
			setUser(prev => ({ ...prev, user: data.user }));
			setUsername(data.user);

		} catch (error) {
			setError(error.message);

		} finally {
			setSaving(false);
		}
	};

	// Elimina la cuenta
	const handleDeleteAccount = async () => {
		const confirmed = window.confirm(
			"¿Estás seguro de que deseas eliminar tu cuenta?"
		);

		if (!confirmed) return;

		try {
			setError("");

			const response = await fetch("http://localhost:3000/client", {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "No se pudo eliminar la cuenta.");
			}

			handleUserLogout();

		} catch (error) {
			setError(error.message);
		}
	};

	if (loading) {
		return <Spinner animation="border" />;
	}

	if (!user) {
		return <Alert variant="danger">{error || "No se pudo cargar el usuario."}</Alert>;
	}

	return (
		<Card className="mx-auto shadow-sm" style={{ maxWidth: "600px" }}>
			<Card.Body className="p-4">

				<Card.Title className="mb-4">
					Mi perfil
				</Card.Title>

				{message && <Alert variant="success">{message}</Alert>}
				{error && <Alert variant="danger">{error}</Alert>}

				{/* Información del usuario */}
				<div className="mb-4">
					<p><strong>Nombre:</strong> {user.user}</p>
					<p><strong>Apellido:</strong> {user.surname}</p>
					<p><strong>Email:</strong> {user.email}</p>
					<p><strong>DNI:</strong> {user.dni}</p>
				</div>

				<hr />

				{/* Modificar nombre de usuario */}
				<Form onSubmit={handleEditUsername}>
					<Form.Group className="mb-3">
						<Form.Label>Nuevo nombre de usuario</Form.Label>

						<Form.Control
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</Form.Group>

					<Button type="submit" disabled={saving}>
						{saving ? "Actualizando..." : "Actualizar nombre"}
					</Button>
				</Form>

				<hr />

				{/* Eliminar cuenta */}
				<div className="d-flex justify-content-end">
					<Button variant="danger" onClick={handleDeleteAccount}>
						Eliminar cuenta
					</Button>
				</div>

			</Card.Body>
		</Card>
	);
};

export default UserProfileCard;
