import {Link} from "react-router-dom";
import {useEffect} from "react";
import settings from "../media/icons/settings.svg";
import {SettingsModal, MenuModal} from "./Modal";


function handleScroll() {

}


export default function Header(props) {
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    }, []);

    return (
        <div className="header">
            <Link to={props.homeRedirect} id="header-main" className="d-flex-row-c">
                {/*<img src="" alt="" id="header-logo"/>*/}
                <h1>StudyBuddy</h1>
            </Link>

            <nav id="header-nav" className="d-flex-row-c">
                <Link to={props.homeRedirect}>
                    <div className="nav-item d-flex-row-c"><h2>Home</h2></div>
                </Link>
                <Link to={props.devRedirect}>
                    <div className="nav-item d-flex-row-c"><h2>Devplan</h2></div>
                </Link>
                <Link to={props.overviewRedirect}>
                    <div className="nav-item d-flex-row-c"><h2>Overview</h2></div>
                </Link>
                <div id={"settings-icon"} className={"d-flex-row-c"} onClick={props.handleSettings}>
                    <img src={settings} alt="" className={"icon settings"}/>
                </div>
            </nav>

            <div id="nav-menu" className={(props.showMenu) ? "open" : ""} onClick={props.handleMenu}>
                <span/> <span/> <span/> <span/>
            </div>


            <SettingsModal show={props.showSettings} close={props.closeSettings}
                           changeUXMode={props.handleUXMode} UXMode={props.UXMode}
                           admin={props.admin} logInAdmin={props.logInAdmin} logOutAdmin={props.logOutAdmin}
                           className={(props.showSettings) ? "item-clicked" : 0}/>
            <MenuModal show={props.showMenu} close={props.closeMenu}
                       homeRd={props.homeRedirect} devRd={props.devRedirect} overviewRd={props.overviewRedirect}
                       handleSettings={props.handleSettings}
                       className={(props.showMenu) ? "item-clicked" : 0}/>
        </div>
    );
}

