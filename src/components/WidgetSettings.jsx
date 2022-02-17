import {
    faCheck,
    faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColorInput, Switch } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import React, { useState } from "react";
import ThemeSwitch from "./ThemeSwitch";

export default function WidgetSettings() {

    const [color, setColor] = useState(localStorage.color);
    const [blur, setBlur] = useState(localStorage.blur ? true : false);
    const notifications = useNotifications();

    //? Notifications
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

    //? User interactions
    const submitColor = (e) => {
        e.preventDefault();
        try {
            localStorage.color = color;
            showSuccess("Color", color);
        } catch (error) {
            showError("Color", error);
        }
    };

    const toggleBlur = () => {
        try {
            if (blur) {
                localStorage.removeItem("blur");
                showSuccess("Searchbar Blur", "disabled");
            } else {
                localStorage.blur = true;
                showSuccess("Searchbar Blur", "enabled");
            }
            setBlur(!blur);
        } catch (error) {
            showError("Searchbar Blur", error);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-2">
                <h1>Widgets</h1>
                <div className="flex justify-between gap-4">
                    <ThemeSwitch />
                    <form
                        onSubmit={submitColor}
                        className="flex justify-between gap-4"
                    >
                        <ColorInput
                            value={color}
                            onChange={setColor}
                            placeholder={
                                localStorage.color
                                    ? localStorage.color
                                    : "theme color"
                            }
                            format="rgba"
                            swatchesPerRow={9}
                            swatches={[
                                "#EF4444",
                                "#F97316",
                                "#EAB308",
                                "#84CC16",
                                "#22C55E",
                                "#0EA5E9",
                                "#8B5CF6",
                                "#D946EF",
                                "#EC4899",
                                "#008dc9",
                                "#ff5000",
                            ]}
                        />

                        <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </form>
                </div>

                <div className="flex justify-between">
                    <p>Searchbar blur (not supported by Firefox)</p>
                    <Switch checked={blur} onChange={toggleBlur} />
                </div>
            </div>
        </>
    );
}
