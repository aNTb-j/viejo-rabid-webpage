import { Navigate } from "react-router";
import { useAuth } from "./useAuth.jsx";

const Protected = ({ children }) => {

	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default Protected;