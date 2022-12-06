import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";

export default function Building(props) {
    const {building} = useParams()

    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <div id={"map-bg"}>
            <div id={"building-container"} className={"d-flex-row-c"}>
                <div className={"building-page d-flex-col-l gap-40 as-fs"}>
                    <h1 className={"fw-500"}>{building}</h1>
                    <div className={"thick line"}/>

                    <div className={"spots-display gap-20"}>
                        {props.buildings[building].map((spot) => {
                            const image = "../media/locationsSD/" + spot.id + "-00.webp";

                            return (
                                <Link className={"explore-link fill"} to={`${props.path}/location-${spot.id}`} key={spot.id}>
                                    <div className={"explore-spot fill"} content={spot.location}>
                                        <img src={image} alt="" className={"explore-spot-img fill"} loading={"lazy"}/>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}