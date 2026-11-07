import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthenticationContext } from "./auth.context.jsx";

const Protected = ({ children }) => {
	const { token, loading } = useContext(AuthenticationContext);

	if (loading) return <p>Cargando...</p>;

	if (!token) {
		console.log(token)
		return <Navigate to="/home" replace />;
	}

	return children;
};

export default Protected;