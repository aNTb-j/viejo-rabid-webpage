// https://es.react.dev/reference/react/createContext

import { useState } from "react"
import { AuthenticationContext } from "./auth.context";

const tokenStorage = localStorage.getItem("ViejoRabid");

const AuthenticationContextProvider = ({ children }) => {
    const [token, setToken] = useState(tokenStorage);

    const handleUserLogin = (userToken) => {
        localStorage.setItem("ViejoRabid", userToken);
        setToken(userToken);
    }

    const handleUserLogout = () => {
        localStorage.removeItem("ViejoRabid");
        setToken(null)
    }

    return (
        <AuthenticationContext value={{ token, handleUserLogin, handleUserLogout}}>
            {children}
        </AuthenticationContext>
    )
}

export default AuthenticationContextProvider;