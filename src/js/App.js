import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";

import Devplan from "./Devplan";
import Home from "./Home";
import Header from "./Header";
import Overview from "./Overview";

export default function App() {
    const [UXMode, setUXMode] = useState(true);

    const path = "";
    const basePath = "http://db8.cse.nd.edu:5000";

    function changeUXMode() {
        setUXMode(!UXMode);
    }

    useEffect(() => {
        setUXMode(JSON.parse(window.localStorage.getItem("UXMode")));
    }, []);

    useEffect(() => {
        window.localStorage.setItem("UXMode", JSON.stringify(UXMode));
    }, [UXMode]);

    return (
        <main id={"app-container"} className={(UXMode) ? "light-mode" : "dark-mode"}>
            <Header UXMode={UXMode} path={path}/>
            <Routes>
                <Route path={path + "/devplan"} element={<Devplan UXMode={UXMode}/>}/>
                <Route path={path + "/*"} element={<Home UXMode={UXMode} basePath={basePath}/>}/>
                <Route path={path + "/overview"} element={<Overview/>}/>
            </Routes>
            <button onClick={changeUXMode}>{(UXMode) ? "Dark Mode" : "Light Mode"}</button>
        </main>
    );
}
