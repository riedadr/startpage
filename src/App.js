import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "@mantine/core";
import { useState } from "react";
import BackgroundSettings from "./components/BackgroundSettings";
import SearchBar from "./components/search/SearchBar";
import Settings from "./components/Settings";
import WidgetSettings from "./components/WidgetSettings";

function App() {
    const [settings, toggleSettings] = useState(false);

    const getBg = () => {
        let bg = localStorage.bg;
        if (bg !== null && bg !== undefined) {
            if (bg.substring(0, 4) === "http") return `url(${bg})`;
            return bg;
        }
        return "#334155";
    };

    return (
        <>
            <style jsx="true">
                {`
                    :root {
                        --accent: ${localStorage.color
                            ? localStorage.color
                            : "#008dc9"};
                    }

                    body {
                        background: ${getBg()};
                        background-attachment: fixed;
                        -webkit-background-size: cover;
                        -moz-background-size: cover;
                        -o-background-size: cover;
                        background-size: cover;
                    }
                `}
            </style>
            <main>
                <div className="page" id="search">
                    <SearchBar className="SearchBar" />
                </div>
                <Button
                    className="fixed bottom-2 right-2"
                    onClick={() => toggleSettings(true)}
                >
                    <FontAwesomeIcon icon={faCog} />
                </Button>
                <Modal
                    title="Settings"
                    opened={settings}
                    onClose={() => toggleSettings(false)}
                >
                    <div class="flex flex-col gap-5">
                        <Settings />
                        <BackgroundSettings />
                        <WidgetSettings />
                    </div>
                </Modal>
            </main>
        </>
    );
}

export default App;
