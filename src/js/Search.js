import {useEffect} from "react";

export default function Search() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div id={"search-container"}>
            <h1>Find a Study Space</h1>
            <section>
                <nav>

                </nav>
                <div>

                </div>
            </section>
        </div>
    );
}
