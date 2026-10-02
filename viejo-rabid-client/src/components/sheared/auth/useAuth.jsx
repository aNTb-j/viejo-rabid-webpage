// https://es.react.dev/reference/react/useContext

import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
    return useContext(AuthContext);
};