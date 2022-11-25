import {useEffect} from "react";
import {Link} from "react-router-dom";


function ExploreSpot(props) {
    if (!props.gridCol) return;

    const image = "./media/webp/" + props.id + "-00.webp";

    return (
        <Link className={"explore-spot"} to={`${props.path}/location/${props.id}`} style={{gridColumn: `span ${props.gridCol}`, gridRow: `span ${props.gridRow}`}}>
            <img src={image} alt="" className={"explore-spot-img"} loading={"lazy"}/>
        </Link>
    );
}

function ExploreBuilding(props) {
    const layouts = [0, 0, 2, 4, 8, 12];
    const gridAreas = {cols: [[2, 2], [2, 2], [2, 1, 1], [1, 1, 2], [1, 1, 1, 2], [2, 1, 1, 1], [1, 1, 1, 2], [2, 1, 1, 1], [2, 1, 1, 1, 1], [1, 1, 1, 1, 2], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]],
        rows: [[2, 1], [1, 2], [2, 1, 1], [1, 1, 2], [2, 1, 1, 1], [1, 2, 1, 1], [1, 2, 1, 1], [1, 1, 2, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [2, 1, 1, 1, 1], [1, 1, 1, 2, 1]]};
    const set = handleRand(props.idList.length);

    function handleRand(n) {
        if (n > 5) n = 5;
        return Math.floor(Math.random() * layouts[n]);
    }

    return (
        <div className={"explore-building"}>
            <div className={"explore-building-header"}>
                <h1 className={"fw-500"}>{props.building}</h1>
            </div>
            <div className={"explore-spots"}>
                {props.idList.slice(0,5).map((id, index) => {

                    return (
                        <ExploreSpot {...props} key={id} id={id}
                                     gridCol={gridAreas.cols[set][index]} gridRow={gridAreas.rows[set][index]}/>
                    );
                })}
            </div>
        </div>
    );
}

export default function Explore(props) {
    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <div id={"map-bg"}>
            <div id={"explore-container"} className={"d-flex-col-c"}>
                <div className={"explore-page d-flex-col-l gap-40"}>
                    {Object.entries(props.buildings).map(([building, idList]) => {
                        return (
                            <ExploreBuilding {...props} key={building} building={building} idList={idList}/>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}