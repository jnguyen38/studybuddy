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
import {Authenticate} from "./Modal";

export default function App() {
    // useState Hooks
    const [UXMode, setUXMode] = useState(false);
    const [spots, setSpots] = useState("");
    const [showSettings, setShowSettings] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showAuthenticate, setShowAuthenticate] = useState(false);
    const [rand, setRand] = useState({});
    const [pageLoaded, setPageLoaded] = useState(false);
    const [user, setUser] = useState({isSignedIn: false, isAdmin: false});
    const [location, setLocation] = useState({latitude: NaN, longitude: NaN});


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
        static handleAdmin(input) {
            let tempUser = user;
            tempUser.isAdmin = input;
            setUser(tempUser);
        }
        static dropAdmin() {
            let tempUser = user;
            tempUser.isAdmin = false;
            setUser(tempUser);
        }
        static signIn() {
            let tempUser = user;
            tempUser.isSignedIn = true;
            setUser(tempUser);
        }
        static signOut() {
            setUser({isSignedIn: false, isAdmin: false});
        }
        static handleShowAuthenticate() {setShowAuthenticate(()=> !showAuthenticate)}
        static closeAuthenticate() {setShowAuthenticate(false)}
    }

    function randomize(n) {return Math.floor(Math.random() * n);}
    function getMyLocation() {
        const location = window.navigator && window.navigator.geolocation
        if (location) {
            location.getCurrentPosition((position) => {
                setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude});
            }, () => {
                setLocation({ latitude: NaN, longitude: NaN})
            }, {maximumAge:10000, timeout:5000, enableHighAccuracy: true});
        }
    }

    // useEffect Hooks
    useEffect(() => {
        Axios.get(basePath + "/api/get").then((data) => {
            setSpots(data.data)
            console.log(data)
        });
    }, [basePath]);

    useEffect(() => {
        setRand(spots[randomize(spots.length)])
        console.log(location)
    }, [location, spots]);

    useEffect(() => {
        setUXMode(JSON.parse(window.localStorage.getItem("UXMode")));
        let userLocal = JSON.parse(window.localStorage.getItem("user"));
        if (userLocal) setUser(userLocal);
        getMyLocation();
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
    }, [UXMode]);

    return (pageLoaded) ? (
        <div id={"app-container"} className={(UXMode) ? "light-mode" : "dark-mode"}>
            <Header handler={handler} redirect={redirect} UXMode={UXMode} user={user}
                    showSettings={showSettings} showMenu={showMenu} showAuthenticate={showAuthenticate}/>

            <main>
                <Authenticate path={path} basePath={basePath} handler={handler} user={user} show={showAuthenticate} close={handler.closeAuthenticate} location={location}/>
                <div id={"sign-in-notification"} className={"d-flex-row-c"}>You have been signed in!</div>
                <div id={"sign-out-notification"} className={"d-flex-row-c"}>You have been signed out!</div>

                <Routes>
                    <Route path={path + "/*"} element={
                        <Home UXMode={UXMode} path={path} basePath={basePath}/>}/>
                    <Route path={path + "/devplan"} element={
                        <Devplan/>}/>
                    <Route path={path + "/overview"} element={
                        <Overview/>}/>
                    <Route path={path + "/location/:spot_id"} element={
                        <Location user={user} handler={handler} basePath={basePath} showAuthenticate={showAuthenticate}/>}/>
                    <Route path={path + "/search"} element={
                        <Search basePath={basePath} path={path}/>}/>
                    <Route path={path + "/upload"} element={
                        <Upload/>}/>
                    <Route path={path + "/random"} element={
                        <Random rand={rand} spots={spots} basePath={basePath} user={user} makeAdmin={handler.handleAdmin}/>}/>
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
