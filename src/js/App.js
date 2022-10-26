import {Route, Routes} from "react-router-dom";
import Devplan from "./Devplan";
import Home from "./Home";
import {useEffect, useState} from "react";
import Header from "./Header";
import Overview from "./Overview";

export default function App() {
    const [UXMode, setUXMode] = useState(true);

    const path = "/cse30246/studybuddy/build";

    function changeUXMode() {
        setUXMode(!UXMode);
    }

    useEffect(() => {
        setUXMode(JSON.parse(window.localStorage.getItem("UXMode")));
        console.log(window.localStorage)
    }, []);

    useEffect(() => {
        window.localStorage.setItem("UXMode", JSON.stringify(UXMode));
    }, [UXMode]);

    return (
        <main id={"app-container"} className={(UXMode) ? "light-mode" : "dark-mode"}>
            <Header UXMode={UXMode} path={path}/>
            <Routes>
                <Route path={path + "/devplan"} element={<Devplan UXMode={UXMode}/>}/>
                <Route path={path + "/*"} element={<Home UXMode={UXMode} />}/>
                <Route path={path + "/overview"} element={<Overview/>}/>
            </Routes>
            <button onClick={changeUXMode}>{(UXMode) ? "Dark Mode" : "Light Mode"}</button>
        </main>
    );
}
