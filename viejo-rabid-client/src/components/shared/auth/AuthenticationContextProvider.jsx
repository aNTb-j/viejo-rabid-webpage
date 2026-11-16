
import { useEffect, useState } from "react";
import { AuthenticationContext } from "./auth.context";

const AuthenticationContextProvider = ({ children }) => {
	const [token, setToken] = useState(() =>
		localStorage.getItem("ViejoRabid")
	);

	const [roleState, setRoleState] = useState(() => ({
		userRole: null,
		loading: Boolean(localStorage.getItem("ViejoRabid"))
	}));

	useEffect(() => {
		if (!token) return;

		let active = true;

		const fetchUserRole = async () => {
			try {
				const response = await fetch(
					"http://localhost:3000/auth/role",
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
					}
				);

				if (!response.ok) {
					throw new Error("No se pudo obtener el rol");
				}

				const data = await response.json();

				if (active) {
					setRoleState({
						userRole: data.role,
						loading: false
					});
				}
			} catch (error) {
				console.error("Error al obtener el rol:", error);

				if (active) {
					setRoleState({
						userRole: null,
						loading: false
					});
				}
			}
		};

		fetchUserRole();

		return () => {
			active = false;
		};
	}, [token]);

	const handleUserLogin = (userToken) => {
		setRoleState({
			userRole: null,
			loading: true
		});

		localStorage.setItem("ViejoRabid", userToken);
		setToken(userToken);
	};

	const handleUserLogout = () => {
		localStorage.removeItem("ViejoRabid");
		setToken(null);

		setRoleState({
			userRole: null,
			loading: false
		});
	};

	return (
		<AuthenticationContext.Provider
			value={{
				token,
				userRole: roleState.userRole,
				roleLoading: roleState.loading,
				handleUserLogin,
				handleUserLogout
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};

export default AuthenticationContextProvider;
