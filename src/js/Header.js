import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function handleScroll() {

}

function Header(props) {
    const [menuClicked, setMenuClicked] = useState(false);

    const homeRedirect = props.path + "/";
    const devRedirect = props.path + "/devplan";
    const overviewRedirect = props.path + "/overview";

    function menuClick() {
        setMenuClicked(() => {
           return !menuClicked;
        });
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
        };
    });

    return (
        <div className="header">
            <Link to={homeRedirect} id="header-main" className="d-flex-row-c">
                {/*<img src="" alt="" id="header-logo"/>*/}
                <h1>StudyBuddy</h1>
            </Link>
            <nav id="header-nav" className="d-flex-row-c">
                <Link to={homeRedirect}>
                    <div className="nav-item d-flex-row-c"><h2 className="nav-link">Home</h2></div>
                </Link>
                <Link to={devRedirect}>
                    <div className="nav-item d-flex-row-c"><h2 className="nav-link">Devplan</h2></div>
                </Link>
                <Link to={overviewRedirect}>
                    <div className="nav-item d-flex-row-c"><h2 className="nav-link">Overview</h2></div>
                </Link>
            </nav>
            <div id="nav-menu" className={(menuClicked) ? "open" : ""} onClick={menuClick}>
                <span/> <span/> <span/> <span/>
            </div>
        </div>
    );
}

export default Header;
