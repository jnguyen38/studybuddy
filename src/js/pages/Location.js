import {useEffect, useState} from "react";
import {RevModal, EditModal, AllPhotos} from "../components/Modal";
import {Link, useParams} from "react-router-dom";
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
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [photos, setPhotos] = useState([]);

    function closeAllPhotos() {setShowAllPhotos(false);}

    const stars = {0: "☆☆☆☆☆", 1: "★☆☆☆☆", 2: "★★☆☆☆", 3: "★★★☆☆", 4: "★★★★☆", 5: "★★★★★"};

    function handleLike() {
        if (props.user.isSignedIn) {
            props.handler.updateLikes(props.spot_id);

            Axios.put(props.apiPath + "/api/put/toggleLike", {
                "user": props.user.username,
                "spot_id": props.spot_id
            }).then(res => {
                console.log(res);
            });
        } else {
            props.handler.handleShowAuthenticate();
        }

        props.handler.setDictHelper({});
        props.handler.setHistDataHelper([]);
    }

    function handleSeeAll() {
        Axios.get(props.apiPath + "/api/get/allPhotos", {
            params: {spot_id: props.spot_id}
        }).then(data => {
           setPhotos(data.data.split(","));
           setShowAllPhotos(true)
        });
    }

    function avgRating(allReviews) {
        if (!allReviews) return 0;
        let sum = 0;
        let count = 0;
        for (const review of allReviews) {
            sum += review.rating;
            count++;
        }

        return Math.round(sum / count);
    }

    return (
        <div id={"location-header"}>
            <img src={props.image} alt="" className={"location-img"}/>
            <div className={"location-header-info"}>
                <h2>{props.building}</h2>
                <h3 className={"fw-500"}>{props.location}</h3>
                <p className={"rating"}>{stars[avgRating(props.allReviews[props.spot_id])]}</p>
            </div>
            <div className={"d-flex f-wrap jc-fe"}>
                <img src={(props.userLikes.has(props.spot_id)) ? fullHeart : emptyHeart} alt="" style={{zIndex: 20}}
                     className={(props.userLikes.has(props.spot_id)) ? "icon warning-icon lg-icon like-button" : "icon white-icon lg-icon like-button"} onClick={handleLike}/>
                <button className={"btn see-all-btn"} onClick={handleSeeAll}>
                    See All Photos
                </button>
            </div>

            <AllPhotos {...props} show={showAllPhotos} close={closeAllPhotos} photos={photos}/>
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
            {/*<button className={"btn d-flex-row-c"}>*/}
            {/*    <img src={camera} alt="" className={"icon invert-icon sm-icon"}/>*/}
            {/*    Add a Photo*/}
            {/*</button>*/}

            {props.user.isAdmin && <button className={"btn d-flex-row-c"} onClick={() => props.handleEditAuth("building")}>Edit Building</button>}
            {props.user.isAdmin && <button className={"btn d-flex-row-c"} onClick={() => props.handleEditAuth("location")}>Edit Location</button>}
            <RevModal {...props} show={showRev} close={closeRev}
                      className={(showRev) ? "item-clicked" : 0}/>
        </div>
    );
}

function LocationReviews(props) {
    const stars = {1: "★☆☆☆☆", 2: "★★☆☆☆", 3: "★★★☆☆", 4: "★★★★☆", 5: "★★★★★"};

    function timestamp(date, time) {
        const monthDict = {1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"}
        const ending = {1: "st", 2: "nd", 3: "rd"}
        const year = parseInt(date.slice(0, 4));
        const month = parseInt(date.slice(5, 7));
        const day = parseInt(date.slice(8, 10));

        const hourGMT = parseInt(time.slice(0,3));
        const hourET = (hourGMT - 5 < 0) ? hourGMT + 7 : hourGMT - 5;
        const minute = parseInt(time.slice(3, 5));

        return `${monthDict[month]} ${day}${ending[day%10] ? ending[day%10] : "th"}, ${year} at ${hourET}:${minute} ET`;
    }

    return (
        <div className={"d-flex f-col full-length"}>
            <br/><div className={"thin full-length line"}/>
            <h4 className={"as-fs"}>Reviews</h4>

            {(props.allReviews[props.spot_id]) ? props.allReviews[props.spot_id].map((review, index) => {
                return (
                    <div className={"review"} key={index}>
                        <p className={"rating"}>{stars[review.rating]}</p>
                        <p className={"review-title"}><b>{review.name}</b></p>
                        <p>{review.content}</p>
                        <p className={"small-text"}>Posted on {timestamp(review.date, review.time)}</p>
                    </div>
                );
            }) : (
                <div className={"review"}>
                    <p>☆☆☆☆☆</p>
                    <p className={"review-title"}><b>Oh No!</b></p>
                    <p>There are currently no reviews for this page.</p>
                    <p>Be the <b>first</b> to leave one!</p>
                </div>
            )}
        </div>
    );
}

function SimilarLocations(props) {
    const [similarSpaces, setSimilarSpaces] = useState([]);

    useEffect(() => {
        setSimilarSpaces(props.buildings[props.building].sort(() => .5 - Math.random()).slice(0, 2))
    }, [props.building, props.buildings])
    
    return (
        <div className={"full-length"}>
            <br/><div className={"thin full-length line"}/>
            <h4>More Spaces Like This</h4>
            <div className={"similar-locations d-flex f-wrap gap-20"}>
                {similarSpaces.length && similarSpaces.map((spot, index) => {
                    const image = "./media/locationsSD/" + spot.id + "-00.webp";

                    return (
                        <Link className={"explore-link"} to={`${props.path}/location-${spot.id}`} key={index} onClick={window.location.reload}>
                            <div className={"explore-spot"} content={spot.location}>
                                <img src={image} alt="" className={"explore-spot-img fill"} loading={"lazy"}/>
                            </div>
                        </Link>
                    )
                })}
            </div>
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
                    {props.user.isAdmin && <button className={"btn d-flex-row-c"} onClick={() => props.handleEditAuth("description")}>Edit</button>}
                </div>

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

                {props.buildings[props.building] && <SimilarLocations {...props}/>}

                <LocationReviews {...props}/>
            </div>

            <EditModal {...props} show={props.showEdit} close={props.closeEdit}
                       query={props.query}
                       editSubmitted={props.editSubmitted} editSubmit={props.editSubmit}/>
        </div>
    );
}

function LocationAside(props) {
    const [currentState, setCurrentState] = useState(false);
    const bInfo = props.buildingInfo;

    const AnyReactComponent = ({ text }) => <div className={"map-marker"} content={text}></div>;

    function formatTime(date) {
        let h = parseInt(date.toString().slice(0, 2)), m = parseInt(date.toString().slice(3, 5)), dd = "AM";
        if (h >= 12) {h = h - 12; dd = "PM";}
        if (h === 0) h = 12;
        m = m < 10 ? "0" + m : m;

        return `${h.toString()}:${m.toString()} ${dd}`;
    }

    function current(open, close) {
        let today = new Date();

        let openVal = parseInt(open.toString().slice(0, 2))*60 + parseInt(open.toString().slice(3, 5));
        let closeVal = parseInt(close.toString().slice(0, 2))*60 + parseInt(close.toString().slice(3, 5));
        let currVal = today.getHours()*60 + today.getMinutes();

        return currVal >= openVal && currVal <= closeVal;
    }
    
    useEffect(() => {
        setCurrentState(current(props.buildingInfo.open, props.buildingInfo.close))
    }, [props.buildingInfo.close, props.buildingInfo.open]);

    return (
        <div id={"location-aside"}>
            <div className={"location-map"}>
                <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyBYmmmLt6AxjNqDP4DW-uGZ8UHTPGqkgRE" }}
                                defaultCenter={{lat: bInfo.lat, lng: bInfo.long}}
                                defaultZoom={17}>
                    <AnyReactComponent lat={bInfo.lat} lng={bInfo.long} text={props.building}/>
                </GoogleMapReact>
            </div>

            <div className={"thin full-length line"}/>
            <h2 className={"fw-500"}>{props.building} Information</h2><br/>
            <div style={{width: "min(325px, 100%)"}}>
                <div className={"d-flex jc-sb full-length"}><p>Sunday</p><p>{formatTime(bInfo.sunOpen)} - {formatTime(bInfo.sunClose)}</p></div>
                <div className={"d-flex jc-sb full-length"}><p>Monday</p><p>{formatTime(bInfo.monOpen)} - {formatTime(bInfo.monClose)}</p></div>
                <div className={"d-flex jc-sb full-length"}><p>Tuesday</p><p>{formatTime(bInfo.tuesOpen)} - {formatTime(bInfo.tuesClose)}</p></div>
                <div className={"d-flex jc-sb full-length"}><p>Wednesday</p><p>{formatTime(bInfo.wedOpen)} - {formatTime(bInfo.wedClose)}</p></div>
                <div className={"d-flex jc-sb full-length"}><p>Thursday</p><p>{formatTime(bInfo.thursOpen)} - {formatTime(bInfo.thursClose)}</p></div>
                <div className={"d-flex jc-sb full-length"}><p>Friday</p><p>{formatTime(bInfo.friOpen)} - {formatTime(bInfo.friClose)}</p></div>
                <div className={"d-flex jc-sb full-length"}><p>Saturday</p><p>{formatTime(bInfo.satOpen)} - {formatTime(bInfo.satClose)}</p></div>
            </div><br/>
            <div>
                <div className={"thin line"}></div>
                <p className={"fw-500"}>Today</p><br/>
                <p className={"fw-500"}>{formatTime(bInfo.open)} - {formatTime(bInfo.close)}</p>
                <p className={currentState ? "current green" : "current red"}>{currentState ? "Currently Open" : "Currently Closed"}</p>
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
    const [buildingInfo, setBuildingInfo] = useState({open: NaN, close: NaN, lat: NaN, long: NaN, swipe: false});

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
                const day = new Date().getDay()
                const hoursDict = {0: {open: "sunOpen", close: "sunClose"}, 1: {open: "monOpen", close: "monClose"}, 2: {open: "tuesOpen", close: "tuesClose"},
                    3: {open: "wedOpen", close: "wedClose"}, 4: {open: "thursOpen", close: "thursClose"},
                    5: {open: "friOpen", close: "friClose"}, 6: {open: "satOpen", close: "satClose"}}

                setBuildingInfo({...data.data[0], open: data.data[0][hoursDict[day].open], close: data.data[0][hoursDict[day].close], 
                    lat: data.data[0].latitude, long: data.data[0].longitude, swipe: data.data[0].swipeAccess})
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
                {(!isNaN(buildingInfo.long)) && <LocationAside {...spotData} {...props} closeEdit={closeEdit} editSubmit={editSubmit} showEdit={showEdit} buildingInfo={buildingInfo}
                               handleShowEdit={handleShowEdit} query={query} editSubmitted={editSubmitted} handleEditAuth={handleEditAuth}/>}
            </div>
        </section>
    );
}
