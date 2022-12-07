import {Link} from "react-router-dom";
import {useEffect} from "react";

import expandDown from "../../media/icons/expandDown.svg"

export default function Home(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function scrollTo(element) {
        let elem = document.getElementById(element);
        elem.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
            inline: 'center'
        });
    }

    return (
            <div id={"home-container"} className={"d-flex-col-c"}>
                <div className={"home-intro fs-buffer d-flex-col-l"}>
                    <div className={"welcome-text"}>
                        {(props.user.isSignedIn) ? <p>Hi {props.user.firstName},</p> : null}
                        <h1>Welcome to</h1>
                    </div>
                    <div className={"typewriter"}>
                        <h1>StudyBuddy.
                            {/*<span>dyBuddy</span>*/}
                            {/*<span>yBuddy</span>*/}
                        </h1>
                    </div>

                    <img src={expandDown} alt="" className={"icon dark-blue-icon down-arrow as-c"} onClick={() => scrollTo("home-menu")}/>
                </div>

                <div id={"home-menu"} className={"d-flex-col-c"}>
                    <h1>Explore Our Page</h1><br/>
                    <div className={"line thin full-length"}/>
                    <div id={"home-op-display"}>
                        <Link to={props.path + "/search"}><div className={"home-option"}>
                            <h1>🔍 Search &rarr;</h1>
                            <p>Search for your favorite study spaces on campus!</p>
                        </div></Link>

                        <Link to={props.path + "/explore"}><div className={"home-option"}>
                            <h1>🚀 Explore &rarr;</h1>
                            <p>Explore study spaces on campus that you haven't visited before!</p>
                        </div></Link>

                        <Link to={props.path + "/recommendation"}><div className={"home-option"}>
                            <h1>🎲 Suggest &rarr;</h1>
                            <p>Find spot recommendations based on your previous activity or work needs!</p>
                        </div></Link>

                        <Link to={props.path + "/collaborate"}><div className={"home-option"}>
                            <h1 className={"collaborate-option"}>👩‍❤️‍👨 Collaborate &rarr;</h1>
                            <p>Find a convenient study space to meet your friends!</p>
                        </div></Link>

                        <Link to={props.path + "/upload"}><div className={"home-option"}>
                            <h1>📤 Upload &rarr;</h1>
                            <p>Add your favorite study space!</p>
                        </div></Link>
                    </div>
                </div>
            </div>
    );
};
