import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";

import Axios from "axios";
import Devplan from "./Devplan";
import Home from "./Home";
import Header from "./Header";
import Overview from "./Overview";
import Footer from "./Footer";
import Location from "./Location";
import Search from "./Search";

export default function App() {
    // useState Hooks
    const [UXMode, setUXMode] = useState(true);
    const [spots, setSpots] = useState("");
    const [tmp, setTmp] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    // Path variables
    const path = "";
    const basePath = "http://db8.cse.nd.edu:5000";
    const homeRedirect = path + "/";
    const devRedirect = path + "/devplan";
    const overviewRedirect = path + "/overview";

    // Handler Functions
    function closeMenu() {setShowMenu(false)}
    function closeSettings() {setShowSettings(false)}
    function handleUXMode() {setUXMode(!UXMode);closeSettings();}
    function handleMenu() {setShowMenu(() => !showMenu);closeSettings();}
    function handleSettings() {setShowSettings(() => !showSettings);closeMenu();}

    // useEffect Hooks
    useEffect(() => {
        Axios.get(basePath + "/api/get").then((data) => {
            setSpots(data.data)
            setTmp(data.data[19])
            console.log(data)
        });
    }, [basePath]);

    useEffect(() => {
        setUXMode(JSON.parse(window.localStorage.getItem("UXMode")));
    }, []);

    useEffect(() => {
        window.localStorage.setItem("UXMode", JSON.stringify(UXMode));
    }, [UXMode]);

    return (
        <div id={"app-container"} className={(UXMode) ? "light-mode" : "dark-mode"}>
            <Header handleMenu={handleMenu} handleSettings={handleSettings}
                    closeMenu={closeMenu} closeSettings={closeSettings}
                    handleUXMode={handleUXMode} UXMode={UXMode}
                    homeRedirect={homeRedirect} devRedirect={devRedirect}
                    overviewRedirect={overviewRedirect} spots={spots}
                    showSettings={showSettings} showMenu={showMenu}/>
            <main>
                <Routes>
                    <Route path={path + "/devplan"} element={<Devplan UXMode={UXMode}/>}/>
                    <Route path={path + "/*"} element={<Home UXMode={UXMode}
                                                             spots={spots}
                                                             basePath={basePath}/>}/>
                    <Route path={path + "/overview"} element={<Overview/>}/>
                    <Route path={path + "/location"} element={spots &&
                        <Location spots={spots} id={tmp.spot_id} building={tmp.building}
                                  maxGroup={tmp.max_group_size} capacity={tmp.max_capacity}
                                  location={tmp.location} loudness={tmp.loudness_rating}
                                  description={tmp.description} floor={tmp.floor}/>
                    }/>
                    <Route path={path + "/search"} element={<Search/>}/>
                </Routes>
            </main>

            <Footer/>
        </div>
    );
}
