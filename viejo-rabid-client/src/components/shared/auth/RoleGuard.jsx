
import { useContext } from "react";
import { Navigate } from "react-router";

import { AuthenticationContext } from "./auth.context";

const RoleGuard = ({ children, allowedRoles }) => {
	const { userRole, roleLoading } = useContext(AuthenticationContext);

	if (roleLoading) return null;

	// Modo visual: mostrar u ocultar componentes
	if (allowedRoles !== undefined) {
		return allowedRoles.includes(userRole) ? children : null;
	}

	// Modo protección de rutas
	const permissions = {
		"/home": ["client", "admin", "superadmin"],
		"/client": ["client", "admin", "superadmin"],
		"/sales": ["admin", "superadmin"],
		"/dashboard": ["superadmin"],
		"/layoutdef": ["superadmin"]
	};

	const currentPath = window.location.pathname;
	const permittedRoles = permissions[currentPath] || [];

	console.log("RoleGuard:", {
		path: window.location.pathname,
		userRole,
		roleLoading,
		allowedRoles,
		hasAccess: allowedRoles?.includes(userRole)
	});

	if (!permittedRoles.includes(userRole)) {
		return <Navigate to="/home" replace />;
	}

	return children;
};

export default RoleGuard;
