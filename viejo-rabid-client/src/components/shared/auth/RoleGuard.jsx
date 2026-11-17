
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";

import { AuthenticationContext } from "./auth.context";

const RoleGuard = ({ children, allowedRoles }) => {
	const { userRole, roleLoading } = useContext(AuthenticationContext);
	const location = useLocation();

	if (roleLoading) return null;

	// Modo visual: mostrar u ocultar componentes
	if (allowedRoles !== undefined) {
		return allowedRoles.includes(userRole) ? children : null;
	}

	const permissions = {
		"/home": ["client", "admin", "superadmin"],
		"/client": ["client", "admin", "superadmin"],
		"/sales": ["admin", "superadmin"],
		"/dashboard": ["superadmin"],
		"/layoutdef": ["superadmin"]
	};

	const currentPath = location.pathname;

	// Reconocer todas las subsecciones del dashboard
	const permissionPath = currentPath.startsWith("/dashboard/")
		? "/dashboard"
		: currentPath;

	const permittedRoles = permissions[permissionPath] || [];

	if (!permittedRoles.includes(userRole)) {
		return <Navigate to="/home" replace />;
	}

	return children;
};

export default RoleGuard;
