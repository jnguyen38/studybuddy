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
    const [showSettings, setShowSettings] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [rand, setRand] = useState({});
    const [pageLoaded, setPageLoaded] = useState(false);
    const [user, setUser] = useState({isSignedIn: false, isAdmin: false});

    // Path variables
    const path = "";
    const basePath = "http://db8.cse.nd.edu:5000";
    const redirect = {home: path + "/", dev: path + "/devplan", overview: path + "/overview"};

    // Handler Functions
    class handler {
        static closeMenu() {setShowMenu(false)}
        static closeSettings() {setShowSettings(false)}
        static handleUXMode() {setUXMode(!UXMode);}
        static handleMenu() {setShowMenu(() => !showMenu); handler.closeSettings();}
        static handleSettings() {setShowSettings(() => !showSettings); handler.closeMenu();}
        static makeAdmin() {setUser({isSignedIn: user.isSignedIn, isAdmin: true});}
        static dropAdmin() {setUser({isSignedIn: user.isSignedIn, isAdmin: false});}
        static userSignIn() {setUser({isSignedIn: true, isAdmin: user.isAdmin});}
        static userSignOut() {setUser({isSignedIn: false, isAdmin: user.isAdmin});}
    }


    function randomize(n) {return Math.floor(Math.random() * n);}

    // useEffect Hooks
    useEffect(() => {
        Axios.get(basePath + "/api/get").then((data) => {
            setSpots(data.data)
            console.log(data)
        });
    }, [basePath]);

    useEffect(() => {
        setRand(spots[randomize(spots.length)])
    }, [spots]);

    useEffect(() => {
        setUXMode(JSON.parse(window.localStorage.getItem("UXMode")));
        let userLocal = JSON.parse(window.localStorage.getItem("user"));
        if (userLocal) setUser(userLocal);
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
        window.localStorage.setItem("user", JSON.stringify(user));
    }, [UXMode, user]);

    return (pageLoaded) ? (
        <div id={"app-container"} className={(UXMode) ? "light-mode" : "dark-mode"}>
            <Header handler={handler} redirect={redirect} UXMode={UXMode} user={user}
                    showSettings={showSettings} showMenu={showMenu}/>

            <main>
                <Routes>
                    <Route path={path + "/*"} element={
                        <Home UXMode={UXMode} path={path} basePath={basePath}/>}/>
                    <Route path={path + "/devplan"} element={
                        <Devplan/>}/>
                    <Route path={path + "/overview"} element={
                        <Overview/>}/>
                    <Route path={path + "/location/:spot_id"} element={
                        <Location user={user} setAdmin={handler.makeAdmin} basePath={basePath}/>}/>
                    <Route path={path + "/search"} element={
                        <Search basePath={basePath}/>}/>
                    <Route path={path + "/upload"} element={
                        <Upload/>}/>
                    <Route path={path + "/random"} element={
                        <Random rand={rand} spots={spots} basePath={basePath} user={user} makeAdmin={handler.makeAdmin}/>}/>
                    <Route path={path + "/collaborate"} element={
                        <Collaborate/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    ) : (
        <div></div>
    );
}
