import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthenticationContext } from "../../services/auth/auth.context";

const Protected = ({ children }) => {
    const { token } = useContext(AuthenticationContext);
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default Protected;