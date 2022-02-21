import { faBrush, faCog, faImage, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Tabs } from "@mantine/core";
import { useState } from "react";
import BackgroundSettings from "./components/BackgroundSettings";
import SearchBar from "./components/search/SearchBar";
import Settings from "./components/Settings";
import Clock from "./components/widgets/Clock";
import Greetings from "./components/widgets/Greetings";
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
                        --border: ${localStorage.border
                            ? localStorage.border
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
                    <div className="widgets">
                        <div className="widget-row text-black dark:text-white">
                            {localStorage.user ? <Greetings /> : false}
                        </div>
                        <div className="widget-row">
                            {localStorage.clock ? <Clock /> : false}
                        </div>
                        <SearchBar className="SearchBar" />
                    </div>
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
                    <Tabs>
                        <Tabs.Tab label="User" icon={<FontAwesomeIcon icon={faUser}/>}>
                            <Settings />
                        </Tabs.Tab>
                        <Tabs.Tab label="Background" icon={<FontAwesomeIcon icon={faImage}/>}>
                            <BackgroundSettings />
                        </Tabs.Tab>
                        <Tabs.Tab label="Theme" icon={<FontAwesomeIcon icon={faBrush}/>}>
                            <WidgetSettings />
                        </Tabs.Tab>
                    </Tabs>
                </Modal>
            </main>
        </>
    );
}

export default App;
