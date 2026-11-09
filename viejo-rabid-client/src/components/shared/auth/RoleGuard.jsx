import { AuthenticationContext } from "./auth.context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const RoleGuard = ({ allowedRoles, children }) => {

	const { token } = useContext(AuthenticationContext);
	const navigate = useNavigate();

	const [userRole, setUserRole] = useState(null);
	const [loading, setLoading] = useState(Boolean(token));

	useEffect(() => {

		// Si no hay token, no realiza la consulta
		if (!token) return;

		let active = true;

		// Obtiene el rol del usuario
		const fetchUserRole = async () => {
			try {
				const response = await fetch("http://localhost:3000/auth/role", {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});

				if (!response.ok) {
					throw new Error("No se pudo obtener el rol");
				}

				const data = await response.json();

				if (active) {
					setUserRole(data.role);
				}

			} catch (error) {
				console.error("Error al obtener el rol:", error);

				if (active) {
					setUserRole(null);
				}

			} finally {
				if (active) {
					setLoading(false);
				}
			}
		};

		fetchUserRole();

		// Evita actualizar estados si el componente se desmonta
		return () => {
			active = false;
		};

	}, [token]);

	useEffect(() => {

		// Redirige si el usuario no tiene permisos
		if (!loading && (!userRole || !allowedRoles.includes(userRole))) {
			navigate("/home", { replace: true });
		}

	}, [loading, userRole, allowedRoles, navigate]);

	// Evita mostrar el contenido mientras verifica los permisos
	if (loading || !allowedRoles.includes(userRole)) {
		return null;
	}

	return children;
};

export default RoleGuard;