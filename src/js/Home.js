import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div id={"home-bg"}>
            <div id={"home-container"}>
                <div className={"home-intro blur d-flex-row-c"}>
                    <div className={"typewriter"}>
                        <h1>
                            Welcome to StudyBuddy.
                            {/*<span>dyBuddy</span>*/}
                            {/*<span>yBuddy</span>*/}
                        </h1>
                    </div>
                </div>

                <div id={"home-menu"}>
                    <Link to={"/search"}><div className={"home-option"}>
                        <h1>🔍 Search &rarr;</h1>
                        <p>Search for your favorite study spaces on campus!
                        </p>
                    </div></Link>
                    <Link to={"/explore"}><div className={"home-option"}>
                        <h1>🚀 Explore &rarr;</h1>
                        <p>Explore study spaces on campus that you haven't visited before!</p>
                    </div></Link>
                    <Link to={"/random"}><div className={"home-option"}>
                        <h1>🎲 Random &rarr;</h1>
                        <p>Feeling Lucky? Find a hidden gem on campus.</p>
                    </div></Link>
                    <Link to={"/favorite"}><div className={"home-option"}>
                        <h1>😍 Favorite &rarr;</h1>
                        <p>Give us your thoughts on which study space you like the most!</p>
                    </div></Link>
                </div>
            </div>
        </div>
    );
};
