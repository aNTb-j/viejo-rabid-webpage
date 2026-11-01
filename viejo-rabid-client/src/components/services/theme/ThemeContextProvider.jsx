
import { useEffect, useState } from "react";

import { DARK_THEME, LIGHT_THEME } from "../../shared/const/themeConsts";
import { ThemeContext } from "./theme.context";

const ThemeContextProvider = ({ children }) => {

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("TUPtheme") || LIGHT_THEME;
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", theme);
        localStorage.setItem("TUPtheme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme =>
            prevTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
        );
    };

    return (
        <ThemeContext value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext>
    );
};

export default ThemeContextProvider;
