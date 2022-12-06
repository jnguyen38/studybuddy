import {useEffect, useState} from "react";
import {RevModal, EditModal} from "../components/Modal";
import {useParams} from "react-router-dom";
import Axios from "axios";
import GoogleMapReact from 'google-map-react';

import person from "../../media/icons/person.svg";
import star from "../../media/icons/double_star.svg";
import share from "../../media/icons/share.svg";
import camera from "../../media/icons/camera.svg";
import wrong from "../../media/icons/close.svg";
import check from "../../media/icons/check.svg";
import fullHeart from "../../media/icons/full_heart.svg";
import emptyHeart from "../../media/icons/empty_heart.svg";

export function LocationHeader(props) {
    function handleLike() {
        if (props.user.isSignedIn) {
            props.handler.updateLikes(props.spot_id);

            Axios.put(props.apiPath + "/api/put/toggleLike", {
                "user": props.user.username,
                "spot_id": props.spot_id
            });
        } else {
            props.handler.handleShowAuthenticate();
        }

        props.handler.setDictHelper({});
        props.handler.setHistDataHelper([]);
    }

    return (
        <div id={"location-header"}>
            <img src={props.image} alt="" className={"location-img"}/>
            <div className={"location-header-info"}>
                <h2>{props.building}</h2>
                <h3>{props.location}</h3>
                <p className={"rating"}>★★★★☆</p>
            </div>
            <div className={"d-flex f-wrap jc-fe"}>
                <img src={(props.userLikes.has(props.spot_id)) ? fullHeart : emptyHeart} alt="" style={{zIndex: 20}}
                     className={(props.userLikes.has(props.spot_id)) ? "icon warning-icon lg-icon like-button" : "icon white-icon lg-icon like-button"} onClick={handleLike}/>
                <button className={"btn see-all-btn"}>
                    See All Photos
                </button>
            </div>
        </div>
    );
}

function LocationButtons(props) {
    const [showRev, setShowRev] = useState(false);

    function handleRev() {(props.user.isSignedIn) ? setShowRev(() => !showRev) : props.handler.handleShowAuthenticate();}
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

            {props.user.isAdmin && <button className={"btn d-flex-row-c"} onClick={() => props.handleEditAuth("building")}>Edit Building</button>}
            {props.user.isAdmin && <button className={"btn d-flex-row-c"} onClick={() => props.handleEditAuth("location")}>Edit Location</button>}
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
                <div className={"stat-line d-flex jc-sb full-length"}>
                    <h3>Maximum Group</h3>
                    <div className={"d-flex"}>
                        <img src={person} alt="" className={"icon sm-icon"}/>
                        <p>{props.max_group_size}</p>
                    </div>
                </div>
                <div className={"stat-line d-flex jc-sb full-length"}>
                    <h3>Maximum Capacity</h3>
                    <div className={"d-flex"}>
                        <img src={person} alt="" className={"icon sm-icon"}/>
                        <p>{props.max_capacity}</p>
                    </div>
                </div>
                <div className={"stat-line"}><h3>Loudness</h3><div id="loudness-bar" className="stat-bar"></div></div>
                <div className={"stat-line"}><h3>Comfortability</h3><div id="comfort-bar" className="stat-bar"></div></div>
                <div className={"stat-line"}><h3>Natural Light</h3><div id="natlight-bar" className="stat-bar"></div></div>
                <div className={"stat-line"}><h3>Outlet Availability</h3><div id="outlet-bar" className="stat-bar"></div></div>

                <br/><div className={"thin full-length line"}/>
                <h4>About</h4>
                <p className={"fw-300"}>{props.description}</p><br/>
                <div className={"d-flex jc-sb full-length"}>
                    <button className={"btn d-flex-row-c"}>Read More</button>
                    {props.user.isAdmin && <button className={"btn d-flex-row-c"} onClick={() => props.handleEditAuth("description")}>Edit</button>}
                </div>

                <br/><div className={"thin full-length line"}/>
                <h4>More Spaces Like This</h4>

                <br/><div className={"thin full-length line"}/>
                <h4>Amenities</h4>
                <div className={"d-flex"}>
                    {(props.printer) ? <img src={check} alt="" className={"icon sm-icon"}/> : <img src={wrong} alt="" className={"icon sm-icon"}/>}
                    <p>Printer</p>
                </div>
                <div className={"d-flex"}>
                    {(props.tables) ? <img src={check} alt="" className={"icon sm-icon"}/> : <img src={wrong} alt="" className={"icon sm-icon"}/>}
                    <p>Tables</p>
                </div>
            </div>

            <EditModal {...props} show={props.showEdit} close={props.closeEdit}
                       query={props.query}
                       editSubmitted={props.editSubmitted} editSubmit={props.editSubmit}/>
        </div>
    );
}

function LocationAside(props) {
    const defaultProps = {
        center: {
            lat: 59.955413,
            lng: 30.337844
        },
        zoom: 13
    };

    const AnyReactComponent = ({ text }) => <div>{text}</div>;

    return (
        <div id={"location-aside"}>
            <div style={{ height: '20vmax', width: '30vmax' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBYmmmLt6AxjNqDP4DW-uGZ8UHTPGqkgRE" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        </div>
    );
}

export default function Location(props) {
    const [spotData, setSpotData] = useState([]);
    const [image, setImage] = useState("");
    const [showEdit, setShowEdit] = useState(false);
    const [editSubmitted, setEditSubmitted] = useState(false);
    const [query, setQuery] = useState("");
    const [geolocation, setGeolocation] = useState({lat: NaN, long: NaN})

    const root = document.querySelector(":root");
    const params = useParams()

    function handleShowEdit(queryType) {
        setQuery(queryType)
        setShowEdit(() => !showEdit);
        setEditSubmitted(false);
    }

    function handleEditAuth(query) {
        if (props.user.isAdmin)
            handleShowEdit(query);
        else
            props.handler.handleShowAuthenticate();
    }

    function closeEdit() {setShowEdit(false)}
    function editSubmit() {setEditSubmitted(true)}

    function calcComf(comfRatings) {
        let avg = 0, count = 0;
        for (const rating of comfRatings) {
            if (rating < 1) continue;
            avg += rating;
            count++;
        }
        return avg/count;
    }

    useEffect(() => {
        Axios.post(props.apiPath + "/api/post/location", {
            "spot_id": params.spot_id
        }).then(data => {
            setSpotData(data.data[0]);
        });
    }, [params.spot_id, props.apiPath]);

    useEffect(() => {
        if ("building" in spotData) {
            Axios.get(props.apiPath + "/api/get/buildingInfo", {
                params: {
                    "building": spotData.building
                }
            }).then(data => {
                setGeolocation({lat: data.data[0].latitude, long: data.data[0].longitude})
                console.log(data.data[0]);
            });
        }
    }, [props.apiPath, spotData])

    useEffect(() => {
        root.style.setProperty('--loudness-width', spotData.loudness_rating/5 * 100 + "%");
        root.style.setProperty('--comfort-width', calcComf([spotData.couch_comfort, spotData.table_seat_comfort, spotData.nontable_seat_comfort])/5 * 100 + "%");
        root.style.setProperty('--natlight-width', spotData.natural_light_rating/5 * 100 + "%");
        root.style.setProperty('--outlet-width', spotData.outlets_rating/5 * 100 + "%");
        setImage("../media/locationsHD/" + spotData.spot_id + "-00.webp");
    }, [root.style, spotData]);

    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <section id={"location-container"}>
            <LocationHeader {...spotData} {...props} image={image} closeEdit={closeEdit} editSubmit={editSubmit} showEdit={showEdit}
                            handleShowEdit={handleShowEdit} query={query} editSubmitted={editSubmitted} handleEditAuth={handleEditAuth}/>
            <div className={"d-flex-row-l"}>
                <LocationMain {...spotData} {...props} closeEdit={closeEdit} editSubmit={editSubmit} showEdit={showEdit}
                              handleShowEdit={handleShowEdit} query={query} editSubmitted={editSubmitted} handleEditAuth={handleEditAuth}/>
                {(!isNaN(geolocation.long)) && <LocationAside {...spotData} {...props} closeEdit={closeEdit} editSubmit={editSubmit} showEdit={showEdit} center={geolocation}
                               handleShowEdit={handleShowEdit} query={query} editSubmitted={editSubmitted} handleEditAuth={handleEditAuth}/>}
            </div>
        </section>
    );
}
