import {Link} from "react-router-dom";
import {useEffect, useState} from "react";


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
            <Link to={props.path + "/explore/" + props.building} className={"full-length"}>
                <div className={"explore-see-all text-left"}>
                    <p className={"fw-200"}>See All <b>{props.spots.length}</b> Study Spots in</p>
                    <p><b>{props.building} &rarr;</b></p>
                </div>
            </Link>
        </div>
    );
}

export default function Explore(props) {
    const [scrollItem, setScrollItem] = useState(0);
    const [sectorHeight, setSectorHeight] = useState(0);

    const gridAreas = {cols: [[2, 2], [2, 2], [2, 1, 1], [1, 1, 2], [1, 1, 1, 2], [2, 1, 1, 1], [1, 1, 1, 2], [2, 1, 1, 1], [2, 1, 1, 1, 1], [1, 1, 1, 1, 2], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1]],
        rows: [[2, 1], [1, 2], [2, 1, 1], [1, 1, 2], [2, 1, 1, 1], [1, 2, 1, 1], [1, 2, 1, 1], [1, 1, 2, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [2, 1, 1, 1, 1], [1, 1, 1, 2, 1]]};


    useEffect(() => window.scrollTo(0, 0), []);

    useEffect(() => {
        console.log(Object.entries(props.buildings)[0][0])
        const sector = document.getElementById(Object.entries(props.buildings)[0][0])
        if (sector)
            setSectorHeight(sector.clientHeight + 40)
    }, [props.buildings]);
    
    useEffect(() => {
        window.addEventListener('scroll', () => setScrollItem(Math.floor(window.scrollY / sectorHeight)), { passive: true })
        return () => {
            window.removeEventListener('scroll', () => setScrollItem(Math.floor(window.scrollY / sectorHeight)))
        };
    }, [sectorHeight]);


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
                    {Object.entries(props.buildings).map(([building, spots], index) => {
                        return (
                            <div onClick={() => scrollTo(building)} key={building} className={(scrollItem === index) ? "side-nav-link-scrolled side-nav-link" : "side-nav-link"}><p>{building}</p></div>
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