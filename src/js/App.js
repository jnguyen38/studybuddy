import {Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";


import Axios from "axios";
import Devplan from "./pages/Devplan";
import Home from "./pages/Home";
import Header from "./components/Header";
import Overview from "./pages/Overview";
import Footer from "./components/Footer";
import Location, {Random} from "./pages/Location";
import Search from "./pages/Search";
import Upload from "./pages/Upload";
import Collaborate from "./pages/Collaborate";
import {Authenticate} from "./components/Modal";
import SignUp from "./pages/SignUp";
import Explore from "./pages/Explore";

export default function App() {
    // useState Hooks
    const [UXMode, setUXMode] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showAuthenticate, setShowAuthenticate] = useState(false);
    const [rand, setRand] = useState({});
    const [pageLoaded, setPageLoaded] = useState(false);
    const [user, setUser] = useState({isSignedIn: false, isAdmin: false, firstName: "", lastName: "", username: ""});
    const [spots, setSpots] = useState("");
    const [majors, setMajors] = useState([]);       // List of majors for sign up Ex: [{value: "Computer Science", label: "Computer Science"}, ...]
    const [buildings, setBuildings] = useState({}); // Object of buildings and corresponding spot_ids Ex: {"Duncan Student Center": ["010100", "010101",...], ...}
    const [exploreLayout, setExploreLayout] = useState([]);
    const [userLikes, setUserLikes] = useState([]);
    const [userUnlikes, setUserUnlikes] = useState([]);

    // Path variables
    const path = "";
    const apiPath = "http://db8.cse.nd.edu:5002";
    const redirect = {home: path + "/", dev: path + "/devplan", overview: path + "/overview"};

    // Handler Functions
    class handler {
        static closeMenu() {setShowMenu(false)}
        static closeSettings() {setShowSettings(false)}
        static handleUXMode() {setUXMode(!UXMode);}
        static handleMenu() {setShowMenu(() => !showMenu); handler.closeSettings();}
        static handleSettings() {setShowSettings(() => !showSettings); handler.closeMenu();}
        static findLikes(likesData) {
          let tempLikes = [];
          for (const like of likesData) {
            if (user.username === like.username && like.like_bool === 1) {
              tempLikes.push(like.spot_id)
            };
          };

          let tempUnlikes = [];
          for (const like of likesData) {
            if (user.username === like.username && like.like_bool === 0) {
              tempUnlikes.push(like.spot_id)
            };
          };

          setUserLikes(tempLikes);
          setUserUnlikes(tempUnlikes);

        }
        static signIn(userData) {
            let tempUser = user;
            tempUser.isSignedIn = true;
            tempUser.isAdmin = userData.isAdmin;
            tempUser.firstName = userData.firstName;
            tempUser.lastName = userData.lastName;
            tempUser.username = userData.username;
            setUser(tempUser);
            handler.notifySignIn();
            window.localStorage.setItem("user", JSON.stringify(user));
        }
        static signOut() {
            setUser({isSignedIn: false, isAdmin: false, firstName: "", lastName: "", username: ""});
            handler.notifySignOut();
            window.localStorage.setItem("user", JSON.stringify({isSignedIn: false, isAdmin: false}));
        }
        static handleShowAuthenticate() {setShowAuthenticate(()=> !showAuthenticate)}
        static closeAuthenticate() {setShowAuthenticate(false)}
        static notifySignOut() {
            document.getElementById("sign-in-notification").classList.remove("notification-animation");
            document.getElementById("sign-out-notification").classList.add("notification-animation");
        }
        static notifySignIn() {
            document.getElementById("sign-out-notification").classList.remove("notification-animation");
            document.getElementById("sign-in-notification").classList.add("notification-animation");
        }
        static notifyError() {
            document.getElementById("error-notification").classList.add("notification-animation");
        }
        static getMyLocation() {
            const location = window.navigator && window.navigator.geolocation;

            if (location) {
                return new Promise((res, rej) => {
                    location.getCurrentPosition(res, rej);
                });
            }

            return {coords: {latitude: NaN, longitude: NaN}};
        }
    }

    function handleExploreRand(n) {
        const picLayouts = [0, 0, 2, 4, 8, 12];
        if (n > 5) n = 5;
        return Math.floor(Math.random() * picLayouts[n]);
    }
    function randomize(n) {return Math.floor(Math.random() * n);}

    // useEffect Hooks
    useEffect(() => {
        // Get all spots and store into spots state on page load
        Axios.get(apiPath + "/api/get").then(res => {
            setSpots(res.data);
            console.log(res);
            return res.data;
        }).then(data => {
            let tempBuildings = {}
            for (const spot of data)
                if (spot.building in tempBuildings) tempBuildings[spot.building].push([spot.spot_id, spot.location]);
                else tempBuildings[spot.building] = [[spot.spot_id, spot.location]];
            setBuildings(tempBuildings);
        });

        // Get majors and store into majors state on page load
        Axios.get(apiPath + "/api/get/majors").then(res => {
            let tempMajors = [];
            for (const major of res.data) tempMajors.push({value: major.major, label: major.major})
            setMajors(tempMajors)
        });

    }, [apiPath]);

    useEffect(() => {
        let tempLayouts = [];
        for (const building in buildings)
            tempLayouts.push(handleExploreRand(buildings[building].length));
        setExploreLayout(tempLayouts);
    }, [buildings]);

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
    }, [UXMode]);

    return (pageLoaded) ? (
        <div id={"app-container"} className={(UXMode) ? "light-mode" : "dark-mode"}>
            <div id={"map-bg"}></div>

            <Header handler={handler} redirect={redirect} UXMode={UXMode} user={user}
                    showSettings={showSettings} showMenu={showMenu} showAuthenticate={showAuthenticate}/>

            <main>
                <Authenticate path={path} apiPath={apiPath} handler={handler} user={user} show={showAuthenticate} close={handler.closeAuthenticate}/>
                <div id={"sign-in-notification"} className={"d-flex-row-c notification"}>You have been signed in!</div>
                <div id={"sign-out-notification"} className={"d-flex-row-c notification"}>You have been signed out!</div>
                <div id={"error-notification"} className={"d-flex-row-c notification warning"}>An unknown error occurred!</div>

                <Routes>
                    <Route path={path + "/*"} element={
                        <Home user={user} UXMode={UXMode} path={path} apiPath={apiPath}/>}/>
                    <Route path={path + "/devplan"} element={
                        <Devplan/>}/>
                    <Route path={path + "/overview"} element={
                        <Overview/>}/>
                    <Route path={path + "/location/:spot_id"} element={
                        <Location user={user} userLikes={userLikes} userUnlikes={userUnlikes} handler={handler} apiPath={apiPath} showAuthenticate={showAuthenticate}/>}/>
                    <Route path={path + "/search"} element={
                        <Search apiPath={apiPath} path={path}/>}/>
                    <Route path={path + "/upload"} element={
                        <Upload/>}/>
                    <Route path={path + "/random"} element={
                        <Random rand={rand} spots={spots} apiPath={apiPath} user={user}/>}/>
                    <Route path={path + "/collaborate"} element={
                        <Collaborate apiPath={apiPath} path={path}/>}/>
                    <Route path={path + "/signup"} element={
                        <SignUp user={user} redirect={redirect} path={path} apiPath={apiPath} majors={majors} handler={handler}/>}/>
                    <Route path={path + "/explore"} element={buildings && exploreLayout &&
                        <Explore buildings={buildings} path={path} layout={exploreLayout}/>}/>
                </Routes>
            </main>
            <Footer/>
        </div>
    ) : (
        <div/>
    );
}
