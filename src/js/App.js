import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";

import Axios from "axios";
import Devplan from "./Devplan";
import Home from "./Home";
import Header from "./Header";
import Overview from "./Overview";
import Footer from "./Footer";
import Location, {Random} from "./Location";
import Search from "./Search";
import Upload from "./Upload";

export default function App() {
    // useState Hooks
    const [UXMode, setUXMode] = useState(false);
    const [spots, setSpots] = useState("");
    const [tmp, setTmp] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [rand, setRand] = useState({});

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
    function randomize(n) {return Math.floor(Math.random() * n);}

    // useEffect Hooks
    useEffect(() => {
        Axios.get(basePath + "/api/get").then((data) => {
            setSpots(data.data)
            setTmp(data.data[81])
            console.log(data)
        });
    }, [basePath]);

    useEffect(() => {
        setRand(spots[randomize(spots.length)])
    }, [spots]);

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
                                  outlets={tmp.outlets_rating} naturalLight={tmp.natural_light_rating}
                                  comfortability={[tmp.table_seat_comfort, tmp.nontable_seat_comfort, tmp.couch_comfort]}
                                  hasPrinter={tmp.printer} hasTables={tmp.tables} overall={tmp.overall_rating}
                                  description={tmp.description} floor={tmp.floor} notes={tmp.notes} basePath={basePath}/>
                    }/>
                    <Route path={path + "/search"} element={<Search UXMode={UXMode}/>}/>
                    <Route path={path + "/upload"} element={<Upload UXMode={UXMode}/>}/>
                    <Route path={path + "/random"} element={<Random rand={rand} spots={spots} basePath={basePath}/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    );
}
