
import { useContext } from "react";
import { Navigate } from "react-router";

import { AuthenticationContext } from "./auth.context";

const Protected = ({ children }) => {
	const { token } = useContext(AuthenticationContext);

	if (!token) {
		return <Navigate to="/home" replace />;
	}

	return children;
};

export default Protected;
