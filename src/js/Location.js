import {useEffect, useState} from "react";
import {RevModal, EditModal} from "./Modal";

import person from "../media/icons/person.svg";
import star from "../media/icons/double_star.svg";
import share from "../media/icons/share.svg";
import camera from "../media/icons/camera.svg";
import wrong from "../media/icons/close.svg";
import check from "../media/icons/check.svg";

export function Random(props) {
    if (!(props.rand && props.spots)) return;

    const rand = props.rand;

    return (
        <div>
            <Location spots={props.spots} admin={props.admin} setAdmin={props.makeAdmin} id={rand.spot_id} building={rand.building}
                      maxGroup={rand.max_group_size} capacity={rand.max_capacity}
                      location={rand.location} loudness={rand.loudness_rating}
                      outlets={rand.outlets_rating} naturalLight={rand.natural_light_rating}
                      comfortability={[rand.table_seat_comfort, rand.nontable_seat_comfort, rand.couch_comfort]}
                      hasPrinter={rand.printer} hasTables={rand.tables} overall={rand.overall_rating}
                      description={rand.description} floor={rand.floor} notes={rand.notes} basePath={props.basePath}/>
        </div>
    );
}

export function LocationHeader(props) {
    return (
        <div id={"location-header"}>
            <img src={props.image} alt="" className={"location-img"}/>
            <div className={"location-header-info"}>
                <h2>{props.building}</h2>
                <h3>{props.location}</h3>
                <p className={"rating"}>★★★★☆</p>
            </div>
            <button className={"btn see-all-btn"}>
                See All Photos
            </button>
        </div>
    );
}

function LocationButtons(props) {
    const [showRev, setShowRev] = useState(false);

    function handleRev() {setShowRev(() => !showRev);}
    function closeRev() {setShowRev(false);}

    return (
        <div className={"location-buttons"}>
            <button className={"btn d-flex-row-c"} id={"write-review-btn"} onClick={handleRev}>
                <img src={star} alt="" className={"icon white-icon sm-icon"}/>
                Write a Review
            </button>
            <button className={"btn d-flex-row-c"}>
                <img src={share} alt="" className={"icon invert-icon xs-icon"}/>
                Share
            </button>
            <button className={"btn d-flex-row-c"}>
                <img src={camera} alt="" className={"icon invert-icon sm-icon"}/>
                Add a Photo
            </button>

            <button className={"btn d-flex-row-c"} onClick={() => props.handleShowEdit("building")}>Edit Building</button>
            <button className={"btn d-flex-row-c"} onClick={() => props.handleShowEdit("location")}>Edit Location</button>

            <RevModal {...props} show={showRev} close={closeRev}
                      className={(showRev) ? "item-clicked" : 0}/>
        </div>
    );
}

function LocationMain(props) {
    return (
        <div id={"location-main"}>
            <LocationButtons {...props}/>
            <div className={"location-info"}>
                <div className={"line thin full-length"}/>
                <h4>Space Statistics</h4>
                <div className={"d-flex jc-sb full-length"}>
                    <h3>Maximum Capacity</h3>
                    <div className={"d-flex"}>
                        <img src={person} alt="" className={"person icon"}/>
                        <p>{props.capacity}</p>
                    </div>
                </div>
                <div className="stat-line"><h3>Loudness</h3><div id="loudness-bar" className="stat-bar"></div></div>
                <div className="stat-line"><h3>Comfortability</h3><div id="comfort-bar" className="stat-bar"></div></div>
                <div className="stat-line"><h3>Natural Light</h3><div id="natlight-bar" className="stat-bar"></div></div>
                <div className="stat-line"><h3>Outlet Availability</h3><div id="outlet-bar" className="stat-bar"></div></div>

                <br/><div className={"thin full-length line"}></div>
                <h4>About</h4>
                <p>{props.description}</p><br/>
                <div className={"d-flex jc-sb full-length"}>
                    <button className={"btn d-flex-row-c"}>Read More</button>
                    <button className={"btn d-flex-row-c"} onClick={() => props.handleShowEdit("description")}>Edit</button>
                </div>

                <br/><div className={"thin full-length line"}></div>
                <h4>More Spaces Like This</h4>

                <br/><div className={"thin full-length line"}></div>
                <h4>Amenities</h4>
                <div className={"d-flex"}>
                    {(props.hasPrinter) ? <img src={check} alt="" className={"icon sm-icon"}/> : <img src={wrong} alt="" className={"icon sm-icon"}/>}
                    <p>Printer</p>
                </div>
                <div className={"d-flex"}>
                    {(props.hasTables) ? <img src={check} alt="" className={"icon sm-icon"}/> : <img src={wrong} alt="" className={"icon sm-icon"}/>}
                    <p>Tables</p>
                </div>

            </div>

            <EditModal {...props} show={props.showEdit} close={props.closeEdit}
                       query={props.query}
                       editSubmitted={props.editSubmitted} editSubmit={props.editSubmit}/>
        </div>

    );
}

function LocationAside() {
    return (
        <div id={"location-aside"}>
            <h1>Aside</h1>
        </div>
    );
}

export default function Location(props) {
    const image = "./media/locations/" + props.id + "-00.jpg";
    const root = document.querySelector(":root");

    const [showEdit, setShowEdit] = useState(false);
    const [editSubmitted, setEditSubmitted] = useState(false);
    const [query, setQuery] = useState("");


    function handleShowEdit(queryType) {
        setQuery(queryType)
        setShowEdit(() => !showEdit);
        setEditSubmitted(false);
    }

    function closeEdit() {setShowEdit(false)}
    function editSubmit() {setEditSubmitted(true)}


    function calcComf(comfRatings) {
        let avg = 0;
        let count = 0;
        for (const rating of comfRatings) {
            if (rating < 1) continue;
            avg += rating;
            count++;
        }
        return avg/count;
    }

    useEffect(() => {
        root.style.setProperty('--loudness-width', props.loudness/5 * 100 + "%")
        root.style.setProperty('--comfort-width', calcComf(props.comfortability)/5 * 100 + "%")
        root.style.setProperty('--natlight-width', props.naturalLight/5 * 100 + "%")
        root.style.setProperty('--outlet-width', props.outlets/5 * 100 + "%")
    }, [root.style, props.loudness, props.comfortability, props.naturalLight, props.outlets])

    useEffect(() => {
        window.scrollTo(0, 0)
        console.log(props.spots)
        console.log(props.id)
    }, [props.id, props.spots]);

    return (
        <section id={"location-container"}>
            <LocationHeader {...props} image={image} closeEdit={closeEdit} editSubmit={editSubmit} showEdit={showEdit}
                            handleShowEdit={handleShowEdit} query={query} editSubmitted={editSubmitted}/>
            <div className={"d-flex-row-l"}>
                <LocationMain {...props} closeEdit={closeEdit} editSubmit={editSubmit} showEdit={showEdit}
                              handleShowEdit={handleShowEdit} query={query} editSubmitted={editSubmitted}/>
                <LocationAside {...props} closeEdit={closeEdit} editSubmit={editSubmit} showEdit={showEdit}
                               handleShowEdit={handleShowEdit} query={query} editSubmitted={editSubmitted}/>
            </div>
        </section>
    );
}
