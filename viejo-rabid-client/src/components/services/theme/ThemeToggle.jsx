import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";

import Button from "react-bootstrap/Button";

const ThemeToggle = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Button
            variant="outline-secondary"
            onClick={toggleTheme}
        >
            {theme === "light" ? "Modo oscuro" : "Modo claro"}
        </Button>
    );
};

export default ThemeToggle;