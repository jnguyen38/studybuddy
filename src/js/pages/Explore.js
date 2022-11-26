import {Link} from "react-router-dom";
import {useEffect} from "react";


function ExploreSpot(props) {
    if (!props.gridCol) return;

    const image = "./media/locationsSD/" + props.id + "-00.webp";

    return (
        <Link className={"explore-link fill"} to={`${props.path}/location/${props.id}`} style={{gridColumn: `span ${props.gridCol}`, gridRow: `span ${props.gridRow}`}}>
            <div className={"explore-spot fill"} content={props.location}>
                <img src={image} alt="" className={"explore-spot-img fill"} loading={"lazy"}/>
            </div>
        </Link>
    );
}

function ExploreBuilding(props) {
    return (
        <div className={"explore-building"}>
            <div className={"explore-building-header full-length"}>
                <div className={"explore-building-name"}>
                    <h1 className={"fw-500"}>{props.building.split(" ")[0]}</h1>
                    <h1 className={"fw-100"}>{props.building.split(" ").slice(1).join(" ")}</h1>
                </div>
                <Link to={props.path + "/building"} className={"full-length"}>
                    <div className={"explore-see-all text-left"}>
                        <p className={"fw-200"}>See All <b>{props.spots.length}</b> Study Spots in</p>
                        <p><b>{props.building} &rarr;</b></p>
                    </div>
                </Link>
            </div>
            <div className={"explore-spots"}>
                {props.spots.slice(0,5).map((spot, index) => {
                    return (spot) ? (
                        <ExploreSpot {...props} key={spot.id} id={spot.id} location={spot.location}

                                     gridCol={props.gridAreas.cols[props.layout][index]} gridRow={props.gridAreas.rows[props.layout][index]}/>
                    ) : (
                        <div/>
                    );
                })}
            </div>
        </div>
    );
}

export default function Explore(props) {
    const gridAreas = {cols: [[2, 2], [2, 2], [2, 1, 1], [1, 1, 2], [1, 1, 1, 2], [2, 1, 1, 1], [1, 1, 1, 2], [2, 1, 1, 1], [2, 1, 1, 1, 1], [1, 1, 1, 1, 2], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]],
        rows: [[2, 1], [1, 2], [2, 1, 1], [1, 1, 2], [2, 1, 1, 1], [1, 2, 1, 1], [1, 2, 1, 1], [1, 1, 2, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [2, 1, 1, 1, 1], [1, 1, 1, 2, 1]]};

    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <div id={"map-bg"}>
            <div id={"explore-container"} className={"d-flex-col-c"}>
                <div className={"explore-page d-flex-col-l gap-40"}>
                    {/*<div className={"explore-header as-fs full-length d-flex-row-c"}>*/}
                    {/*    <h1 className={"fw-700"}>Explore</h1>*/}
                    {/*</div>*/}
                    {Object.entries(props.buildings).map(([building, spots], index) => {
                        return (
                            <ExploreBuilding {...props} key={building} building={building} spots={spots} layout={props.layout[index]} gridAreas={gridAreas}/>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}