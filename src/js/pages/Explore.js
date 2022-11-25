import {Link} from "react-router-dom";


function ExploreSpot(props) {
    if (!props.gridCol) return;

    const image = "./media/locationsSD/" + props.id + "-00.webp";

    return (
        <Link className={"explore-link fill"} to={`${props.path}/location/${props.id}`} style={{gridColumn: `span ${props.gridCol}`, gridRow: `span ${props.gridRow}`}}>
            <div className={"explore-spot fill"} content={props.id}>
                <img src={image} alt="" className={"explore-spot-img fill"} loading={"lazy"}/>
            </div>
        </Link>
    );
}

function ExploreBuilding(props) {
    const picLayouts = [0, 0, 2, 4, 8, 12];
    const gridAreas = {cols: [[2, 2], [2, 2], [2, 1, 1], [1, 1, 2], [1, 1, 1, 2], [2, 1, 1, 1], [1, 1, 1, 2], [2, 1, 1, 1], [2, 1, 1, 1, 1], [1, 1, 1, 1, 2], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]],
        rows: [[2, 1], [1, 2], [2, 1, 1], [1, 1, 2], [2, 1, 1, 1], [1, 2, 1, 1], [1, 2, 1, 1], [1, 1, 2, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [2, 1, 1, 1, 1], [1, 1, 1, 2, 1]]};
    const set = handleRand(props.idList.length);

    const shuffled = props.idList.sort(() => 0.5 - Math.random());

    function handleRand(n) {
        if (n > 5) n = 5;
        return Math.floor(Math.random() * picLayouts[n]);
    }

    return (
        <div className={"explore-building"}>
            <div className={"explore-building-header fill"}>
                <Link to={"building"} className={"full-length"}>
                    <div className={"explore-see-all d-flex-row-c"}>
                        <p>See All <b>{props.idList.length}</b> Study Spots &rarr;</p>
                    </div>
                </Link>
                <div className={"explore-building-name"}>
                    <h1 className={"fw-100"}><span className={"fw-500"}>{props.building.split(" ")[0]}</span> {props.building.split(" ").slice(1).join(" ")}</h1>
                </div>
            </div>
            <div className={"explore-spots"}>
                {shuffled.slice(0,5).map((id, index) => {
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
    return (
        <div id={"map-bg"}>
            <div id={"explore-container"} className={"d-flex-col-c"}>
                <div className={"explore-page d-flex-col-l gap-40"}>
                    {Object.entries(props.buildings).map(([building, idList]) => {
                        return (
                            // <div key={building} className={"full-length"}>
                                <ExploreBuilding {...props} key={building} building={building} idList={idList}/>
                            // </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}