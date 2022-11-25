import {useEffect} from "react";


function ExploreSpot(props) {
    const image = "./media/webp/" + props.id + "-00.webp";

    return (
        <div className={"explore-spot"}>
            <img src={image} alt="" className={"explore-img"} loading={"lazy"}/>
        </div>
    );
}

function ExploreBuilding(props) {
    return (
        <div className={"explore-building"}>
            <h1 className={"fw-500"}>{props.building}</h1>
            <div className={"line"}/>
            <div className={"d-flex-row-l gap-20 f-wrap"}>
                {props.idList.slice(0,3).map(id => {
                    return (
                        <ExploreSpot key={id} id={id}/>
                    );
                })}
            </div>
        </div>
    );
}

export default function Explore(props) {
    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <div id={"explore-container"} className={"d-flex-col-c"}>
            <div className={"explore-page"}>
                {Object.entries(props.buildings).map(([building, idList]) => {
                    return (
                        <ExploreBuilding {...props} key={building} building={building} idList={idList}/>
                    );
                })}
            </div>
        </div>
    );
}