import {
    faCheck,
    faExclamation,
    faImage,
    faMountain,
    faUser,
    faWater,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColorInput, Input } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import React, { useState, useRef } from "react";
import ThemeSwitch from "./ThemeSwitch";

export default function Settings() {
    const bgIsImage = () => {
        let bg = localStorage.bg;
        if (bg !== null && bg !== undefined) {
            if (bg.substring(0, 4) === "http") {
                return true;
            }
        }
        return false;
    };

    const [color, setColor] = useState(localStorage.color);
    const [bgColor, setBgColor] = useState(bgIsImage() ? "" : localStorage.bg);
    const userRef = useRef();
    const bgRef = useRef();
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
    const submitName = (e) => {
        e.preventDefault();
        try {
            let user = userRef.current.value;
            localStorage.user = user;
            showSuccess("Username", user);
        } catch (error) {
            showError("Username", error);
        }
    };

    const submitColor = (e) => {
        e.preventDefault();
        try {
            localStorage.color = color;
            showSuccess("Color", color);
        } catch (error) {
            showError("Color", error);
        }
    };
    const submitBg = (e) => {
        e.preventDefault();
        try {
            let bgURL = bgRef.current.value;
            localStorage.bg = bgURL;
            showSuccess("Background", bgURL);
        } catch (error) {
            showError("Background", error);
        }
    };
    const setBgMountain = (e) => {
        e.preventDefault();
        try {
            let bgURL =
                "https://images.hdqwalls.com/download/sunset-trails-mountains-road-long-exposure-5k-44-3840x2160.jpg";
            localStorage.bg = bgURL;
            showSuccess("Background", "Mountain");
        } catch (error) {
            showError("Background", error);
        }
    };
    const setBgSea = (e) => {
        e.preventDefault();
        try {
            let bgURL =
                "https://images.hdqwalls.com/wallpapers/garden-city-beach-sunset-5k-ro.jpg";
            localStorage.bg = bgURL;
            showSuccess("Background", "Ocean");
        } catch (error) {
            showError("Background", error);
        }
    };
    const submitBgColor = (e) => {
        e.preventDefault();
        try {
            localStorage.bg = bgColor;
            showSuccess("Background Color", bgColor);
        } catch (error) {
            showError("Background Color", error);
        }
    };
    const toggleBlur = () => {
        try {
            let blurred = localStorage.blur;
        if (blurred) {
            localStorage.removeItem("blur");
            showSuccess("Searchbar Blur", "disabled");
        }
        else {
            localStorage.blur = true;
            showSuccess("Searchbar Blur", "enabled");
        }
        } catch (error) {
            showError("Searchbar Blur", error);
        }
        
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <div>
                    <form
                        onSubmit={submitName}
                        className="flex justify-between gap-4"
                    >
                        <Input
                            className="w-full"
                            ref={userRef}
                            icon={<FontAwesomeIcon icon={faUser} />}
                            placeholder={
                                localStorage.user
                                    ? localStorage.user
                                    : "username"
                            }
                        />
                        <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </form>
                </div>
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
                            format="hex"
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
                <div className="flex flex-col gap-2">
                    <form
                        onSubmit={submitBg}
                        className="flex justify-between gap-4"
                    >
                        <Input
                            className="w-full"
                            ref={bgRef}
                            icon={<FontAwesomeIcon icon={faImage} />}
                            placeholder={
                                bgIsImage() ? localStorage.bg : "background-url"
                            }
                        />
                        <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </form>
                    {bgIsImage() ? (
                        <a
                            href={localStorage.bg}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                className="rounded"
                                src={localStorage.bg}
                                alt="background"
                            />{" "}
                            <small>click on image to open link</small>
                        </a>
                        
                    ) : (
                        ""
                    )}
                    <div className="flex justify-between">
                        <button
                            className="bg-indigo-500 text-white px-3 py-1 rounded"
                            onClick={setBgMountain}
                        >
                            <FontAwesomeIcon icon={faMountain} />
                        </button>
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={setBgSea}
                        >
                            <FontAwesomeIcon icon={faWater} />
                        </button>

                        <form
                            onSubmit={submitBgColor}
                            className="flex justify-between gap-4"
                        >
                            <ColorInput
                                value={bgColor}
                                onChange={setBgColor}
                                placeholder={
                                    bgIsImage()
                                        ? "background color"
                                        : localStorage.bg
                                }
                                format="hex"
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
                    <button
                                className="bg-green-500 text-white px-3 py-1 rounded"
                                onClick={toggleBlur}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </button>
                    </div>
                </div>
            </div>
        </>
    );
}
