import {useEffect} from "react";

export default function Location(props) {

    useEffect(() => {
        console.log(props.spots)
    }, [props.spots]);

    return (
        <div id={"location-container"}>
            <img src={props.spots} alt=""/>
        </div>
    );
}