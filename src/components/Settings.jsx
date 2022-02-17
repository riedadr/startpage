import {
    faCheck,
    faExclamation,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import React, { useRef } from "react";

export default function Settings() {
    const userRef = useRef();
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

    return (
        <>
            <div className="flex flex-col gap-2">
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
            </div>
        </>
    );
}
