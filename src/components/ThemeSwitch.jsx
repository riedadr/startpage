import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMoon,
    faSun,
    faCheck,
    faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../contexts/theme";
import { useNotifications } from "@mantine/notifications";

const ThemeSwitch = () => {
    const { theme, setTheme } = React.useContext(ThemeContext);
    const notifications = useNotifications();

    const showSuccess = (obj, content) =>
        notifications.showNotification({
            title: obj + " successfully changed!",
            message: obj + " was changed to '" + content + "'",
            color: "teal",
            icon: <FontAwesomeIcon icon={faCheck} />,
        });

    const showError = (obj, content) =>
        notifications.showNotification({
            title: "An Error occured!",
            message: obj + ":\n" + content,
            color: "red",
            icon: <FontAwesomeIcon icon={faExclamation} />,
        });

    function toggleTheme() {
        try {
            setTheme(theme === "dark" ? "light" : "dark");
            showSuccess("Theme", theme === "dark" ? "light" : "dark");
        } catch (error) {
            showError("Theme", error);
        }
    }

    return (
        <button
            className="rounded px-3 py-1 dark:bg-amber-500 text-white bg-slate-800 cursor-pointer"
            onClick={toggleTheme}
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
