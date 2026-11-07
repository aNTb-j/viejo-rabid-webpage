import { AuthenticationContext } from "./auth.context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const RoleGuard = ({ allowedRoles, children }) => {

	const { token } = useContext(AuthenticationContext);
	const navigate = useNavigate();

	const [userRole, setUserRole] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserRole = async () => {
			try {
				const response = await fetch("http://localhost:3000/auth/role", {
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`
					}
				});

				if (!response.ok) {
					throw new Error("No se pudo obtener el rol");
				}

				const data = await response.json();

				setUserRole(data.role);

				console.log("Rol del usuario autenticado:", data.role);

			} catch (error) {
				console.error("Error al obtener el rol:", error);
				setUserRole(null);

			} finally {
				setLoading(false);
			}
		};

		if (token) {
			setLoading(true);
			fetchUserRole();
		} else {
			setUserRole(null);
			setLoading(false);
		}

	}, [token]);

	useEffect(() => {
		if (!loading && (!userRole || !allowedRoles.includes(userRole))) {
			navigate(-1);
		}
	}, [loading, userRole, allowedRoles, navigate]);

	if (loading || !allowedRoles.includes(userRole)) {
		return null;
	}

	return children;
};

export default RoleGuard;