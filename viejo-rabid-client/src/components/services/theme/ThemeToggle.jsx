import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";

import ToggleButton from "./ToggleButton.jsx";

const ThemeToggle = () => {

	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		<ToggleButton
			checked={theme === "dark"}
			onChange={toggleTheme}
			name="theme-toggle"
			offLabel="off"
			onLabel="on"
		/>
	);
};

export default ThemeToggle;