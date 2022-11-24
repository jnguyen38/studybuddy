import {Link} from "react-router-dom";
import {useEffect} from "react";

export default function Home(props) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <div id={"map-bg"}>
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
                </div>

                <div id={"home-menu"} className={"d-flex-col-c"}>
                    <h1>Explore Our Page</h1><br/>
                    <div className={"line thick"}/>
                    <div id={"home-op-display"}>
                        <Link to={props.path + "/search"}><div className={"home-option"}>
                            <h1>🔍 Search &rarr;</h1>
                            <p>Search for your favorite study spaces on campus!
                            </p>
                        </div></Link>
                        <Link to={props.path + "/explore"}><div className={"home-option"}>
                            <h1>🚀 Explore &rarr;</h1>
                            <p>Explore study spaces on campus that you haven't visited before!</p>
                        </div></Link>
                        <Link to={props.path + "/random"}><div className={"home-option"}>
                            <h1>🎲 Random &rarr;</h1>
                            <p>Feeling Lucky? Find a hidden gem on campus.</p>
                        </div></Link>
                        <Link to={props.path + "/upload"}><div className={"home-option"}>
                            <h1>📤 Upload &rarr;</h1>
                            <p>Add your favorite study space!</p>
                        </div></Link>
                        <Link to={props.path + "/collaborate"}><div className={"home-option"}>
                            <div className={"collaborate-option"}>
                            <h1>👩‍❤️‍👨 Collaborate &rarr;</h1>
                            </div>
                            <p>Find a convenient study space to meet your friends!</p>
                        </div></Link>
                        <Link to={props.path + "/location/040101"}><div className={"home-option"}>
                            <h1>🔬 Location &rarr;</h1>
                            <p>Location test page!</p>
                        </div></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
