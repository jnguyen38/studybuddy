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
        <div className={"explore-building"} id={props.building}>
            <div className={"explore-building-header full-length"}>
                <div className={"explore-building-name"}>
                    <h1 className={"fw-500"}>{props.building.split(" ")[0]}</h1>
                    <h1 className={"fw-100"}>{props.building.split(" ").slice(1).join(" ")}</h1>
                </div>

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
            <Link to={props.path + "/building"} className={"full-length"}>
                <div className={"explore-see-all text-left"}>
                    <p className={"fw-200"}>See All <b>{props.spots.length}</b> Study Spots in</p>
                    <p><b>{props.building} &rarr;</b></p>
                </div>
            </Link>
        </div>
    );
}

export default function Explore(props) {
    const gridAreas = {cols: [[2, 2], [2, 2], [2, 1, 1], [1, 1, 2], [1, 1, 1, 2], [2, 1, 1, 1], [1, 1, 1, 2], [2, 1, 1, 1], [2, 1, 1, 1, 1], [1, 1, 1, 1, 2], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]],
        rows: [[2, 1], [1, 2], [2, 1, 1], [1, 1, 2], [2, 1, 1, 1], [1, 2, 1, 1], [1, 2, 1, 1], [1, 1, 2, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [2, 1, 1, 1, 1], [1, 1, 1, 2, 1]]};

    useEffect(() => window.scrollTo(0, 0), []);

    function scrollTo(element) {
        let elem = document.getElementById(element);
        elem.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
            inline: 'center'
        });
    }

    return (
        <div id={"map-bg"}>
            <div id={"explore-container"} className={"d-flex"}>
                <aside className={"side-nav d-flex-col-l no-select"}>
                    <h2>Navigation</h2>
                    <div className={"thin inverted line"}/>
                    {Object.entries(props.buildings).map(([building, spots]) => {
                        console.log(building)
                        return (
                            <div onClick={() => scrollTo(building)} key={building} className={"side-nav-link"}><p>{building}</p></div>
                        );
                    })}
                </aside>
                <div className={"explore-page d-flex-col-l gap-40"}>
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