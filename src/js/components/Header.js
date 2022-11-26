import {Link} from "react-router-dom";
import {useEffect} from "react";
import {SettingsModal, MenuModal} from "./Modal";

import settings from "../../media/icons/settings.svg";
// import search from "../../media/icons/search.svg";

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
        <div id={"header"}>
            <Link to={props.redirect.home} id="header-main" className="d-flex-row-c">
                {/*<img src="" alt="" id="header-logo"/>*/}
                <h1>StudyBuddy</h1>
            </Link>

            {/*<div id={"search"} className={"d-flex jc-sb"}>*/}
            {/*    <div className={"search-img d-flex-col-c"}>*/}
            {/*        <img src={search} alt="" className={"icon warning-icon xs-icon"}/>*/}
            {/*    </div>*/}
            {/*    <form>*/}
            {/*        <input type="text" placeholder={"Search"}/>*/}
            {/*    </form>*/}
            {/*</div>*/}

            <nav id={"header-nav"} className={"d-flex-row-c"}>
                <Link to={props.redirect.home}>
                    <div className="nav-item d-flex-row-c"><h2>Home</h2></div>
                </Link>
                <Link to={props.redirect.dev}>
                    <div className="nav-item d-flex-row-c"><h2>Devplan</h2></div>
                </Link>
                <Link to={props.redirect.overview}>
                    <div className="nav-item d-flex-row-c"><h2>Overview</h2></div>
                </Link>
                <div id={"settings-icon"} className={"d-flex-row-c"} onClick={props.handler.handleSettings}>
                    <img src={settings} alt="" className={"icon settings"}/>
                </div>
            </nav>

            <div id="nav-menu" className={(props.showMenu) ? "open" : ""} onClick={props.handler.handleMenu}>
                <span/> <span/> <span/> <span/>
            </div>


            <SettingsModal show={props.showSettings} close={props.handler.closeSettings}
                           {...props}
                           className={(props.showSettings) ? "item-clicked" : 0}/>
            <MenuModal show={props.showMenu} close={props.handler.closeMenu}
                       redirect={props.redirect}
                       handleSettings={props.handler.handleSettings}
                       className={(props.showMenu) ? "item-clicked" : 0}/>
        </div>
    );
}
