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
import Collaborate from "./Collaborate";

export default function App() {

    // useState Hooks
    const [UXMode, setUXMode] = useState(false);
    const [spots, setSpots] = useState("");
    const [testSpot, setTestSpot] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [rand, setRand] = useState({});
    const [pageLoaded, setPageLoaded] = useState(false);
    const [admin, setAdmin] = useState(false);

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
    function makeAdmin() {setAdmin(true)}
    function dropAdmin() {setAdmin(false)}
    function randomize(n) {return Math.floor(Math.random() * n);}

    // useEffect Hooks
    useEffect(() => {
        Axios.get(basePath + "/api/get").then((data) => {
            setSpots(data.data)
            setTestSpot(data.data[81])
            console.log(data)
        });
    }, [basePath]);

    useEffect(() => {
        setRand(spots[randomize(spots.length)])
    }, [spots]);

    useEffect(() => {
        setUXMode(JSON.parse(window.localStorage.getItem("UXMode")));
        setAdmin(JSON.parse(window.localStorage.getItem("admin")));
        function onPageLoad() {setPageLoaded(true);}
        if (document.readyState === "complete") {
            onPageLoad()
        } else {
            window.addEventListener("load", onPageLoad);
            return () => window.removeEventListener("load", onPageLoad);
        }

    }, []);

    useEffect(() => {
        window.localStorage.setItem("UXMode", JSON.stringify(UXMode));
        window.localStorage.setItem("admin", JSON.stringify(admin));
    }, [UXMode, admin]);

    return (pageLoaded) ? (
        <div id={"app-container"} className={(UXMode) ? "light-mode" : "dark-mode"}>
            <Header handleMenu={handleMenu} handleSettings={handleSettings}
                    closeMenu={closeMenu} closeSettings={closeSettings}
                    handleUXMode={handleUXMode} UXMode={UXMode}
                    homeRedirect={homeRedirect} devRedirect={devRedirect}
                    overviewRedirect={overviewRedirect} spots={spots}
                    admin={admin} logInAdmin={makeAdmin} logOutAdmin={dropAdmin}
                    showSettings={showSettings} showMenu={showMenu}/>
            <main>
                <Routes>
                    <Route path={path + "/devplan"} element={<Devplan UXMode={UXMode}/>}/>
                    <Route path={path + "/*"} element={<Home UXMode={UXMode}
                                                             spots={spots} path={path}
                                                             basePath={basePath}/>}/>
                    <Route path={path + "/overview"} element={<Overview/>}/>
                    <Route path={path + "/location"} element={spots &&
                        <Location spots={spots} admin={admin} setAdmin={makeAdmin} id={testSpot.spot_id} building={testSpot.building}
                                  maxGroup={testSpot.max_group_size} capacity={testSpot.max_capacity}
                                  location={testSpot.location} loudness={testSpot.loudness_rating}
                                  outlets={testSpot.outlets_rating} naturalLight={testSpot.natural_light_rating}
                                  comfortability={[testSpot.table_seat_comfort, testSpot.nontable_seat_comfort, testSpot.couch_comfort]}
                                  hasPrinter={testSpot.printer} hasTables={testSpot.tables} overall={testSpot.overall_rating}
                                  description={testSpot.description} floor={testSpot.floor} notes={testSpot.notes} basePath={basePath}/>
                    }/>
                    <Route path={path + "/search"} element={<Search UXMode={UXMode} basePath={basePath}/>}/>
                    <Route path={path + "/upload"} element={<Upload UXMode={UXMode}/>}/>
                    <Route path={path + "/random"} element={<Random rand={rand} spots={spots}
                                                                    basePath={basePath}
                                                                    admin={admin} makeAdmin={makeAdmin}/>}/>
                    <Route path={path + "/collaborate"} element={<Collaborate UXMode={UXMode}/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    ) : (
        <div></div>
    );
}
