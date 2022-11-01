import {useEffect, useState} from "react";
import person from "../media/icons/person.svg";

export function Random(props) {
    const [rand, setRand] = useState([]);
    
    function randomize() {
        return 0;
    }
    
    useEffect(() => {
    }, [props.spots]);
    
    return (
        <div>
            {rand &&
                <Location spots={props.spots} id={rand.spot_id} building={rand.building}
                          maxGroup={rand.max_group_size} capacity={rand.max_capacity}
                          location={rand.location} loudness={rand.loudness_rating}
                          description={rand.description} floor={rand.floor}/>
            }
        </div>
    );
}

export default function Location(props) {
    const image = "./media/locations/" + props.id + "-00.jpg";
    const root = document.querySelector(":root");


    useEffect(() => {
        root.style.setProperty('--loudness-width', props.loudness.toString() + "/5")
    }, [root.style, props.loudness])

    useEffect(() => {
        window.scrollTo(0, 0)
        console.log(props.spots)
        console.log(props.id)
    }, [props.id, props.spots]);

    return (
        <section id={"location-container"}>
            <div className={"location-title"}>
                <h1>{props.location} - {props.description}</h1>
                <div className={"d-flex-row-c"}>
                    <img src={person} alt="" className={"person icon"}/>
                    <p>{props.capacity}</p>
                </div>
            </div>
            <div className={"location-content"}>
                <div className={"location-img d-flex-row-c"}>{image}</div>
                <div className={"location-stats"}>
                    <div className="stat-line">
                        <h3>Loudness</h3><div id="loudness-bar" className="stat-bar"></div>
                    </div>
                </div>
            </div>

        </section>
    );
}
