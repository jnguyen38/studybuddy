import {useEffect} from "react";
import person from "../media/icons/person.svg";

export default function Location(props) {
    const image = "./media/locations/" + props.id + "-00.jpg";

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        console.log(props.spots)
        console.log(props.id)
    }, [props.id, props.spots]);

    return (
        <div id={"location-container"}>
            <div className={"location-title"}>
                <h1>{props.location} - {props.description}</h1>
                <div className={"d-flex-row-c"}>
                    <img src={person} alt="" className={"person icon"}/>
                    <p>{props.capacity}</p>
                </div>
            </div>
            <div className={"location-img d-flex-row-c"}>{image}</div>

        </div>
    );
}
