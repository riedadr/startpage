import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMoon,
	faSun,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../contexts/theme";

const ThemeSwitch = () => {
	const { theme, setTheme } = React.useContext(ThemeContext);
	return (
		<button className="rounded px-3 py-1 dark:bg-amber-500 text-white bg-slate-800 cursor-pointer"
		onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
		>
			{theme === "dark" ? (
				
                    <FontAwesomeIcon icon={faSun} />
			) : (
                    <FontAwesomeIcon icon={faMoon} />
			)}
		</button>
	);
};

export default ThemeSwitch;
