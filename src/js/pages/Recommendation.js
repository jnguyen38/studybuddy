import {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useParams, useNavigate} from "react-router-dom";
import Axios from "axios";
import Select from 'react-select';


function Choice(props) {
    let params = useParams()

    if (params.typerec === "history") {
        return (<History {...props}/>)
    } else if (params.typerec === "work") {
        return (<Work {...props}/>)
    }

    return (<div></div>)

}

function Work(props) {
    const [workType, setWorkType] = useState(false)
    const [showDesc, setShowDesc] = useState(false)
    const [workDict, setWorkDict] = useState({})
    const [results, setResults] = useState([])

    let loud = (workDict["loud"] >= 3.75 ? "loud" : (workDict["loud"] >= 2 ? "moderately loud" : (workDict["loud"] >= 1.25 ? "moderately quiet" : "quiet")))
    let light = (workDict["light"] >= 3.75 ? "lots of" : (workDict["light"] >= 2 ? "some" : (workDict["light"] >= 1.25 ? "a little" : "very little")))
    let outlet = (workDict["outlet"] >= 3.75 ? "lots of" : (workDict["outlet"] >= 2 ? "some" : (workDict["outlet"] >= 1.25 ? "a few" : "no")))
    let comfort = (workDict["comfort"] >= 3.75 ? "very comfortable" : (workDict["comfort"] >= 2 ? "comfortable" : (workDict["comfort"] >= 1.25 ? "less comfortable" : "uncomfortable")))
    let table = (workDict["table"] >= 0.75 ? "needed" : (workDict["table"] >= 0.5 ? "wanted" : (workDict["table"] >= 0.25 ? "didn't need" : "didn't want")))
    let capacity = (workDict["capacity"] >= 60 ? "lots of" : (workDict["capacity"] >= 30 ? "many" : (workDict["capacity"] >= 15 ? "some" : "a few")))

    function handleSelect(selectedOption) {
        setWorkType(selectedOption.value)
    }

    function Description() {
        if (showDesc) {
            return (
                <div>
                    <div className={"recommendation-desc d-flex-row-l"}>
                        <p>Other users with <b>{workType}</b> work have...</p>
                    </div>
                    <div className={"history-typewriter1 d-flex-row-l"}>
                        <p>...wanted a <b>{loud}</b> environment...</p>
                    </div>
                    <div className={"history-typewriter2 d-flex-row-l"}>
                        <p>...liked a location with <b>{light}</b> light...</p>
                    </div>
                    <div className={"history-typewriter3 d-flex-row-l"}>
                        <p>...wanted a study spot with <b>{outlet}</b> outlets...</p>
                    </div>
                    <div className={"history-typewriter4 d-flex-row-l"}>
                        <p>...prefered <b>{comfort}</b> seating...</p>
                    </div>
                    <div className={"history-typewriter5 d-flex-row-l"}>
                        <p>...<b>{table}</b> a table or writing surface...</p>
                    </div>
                    <div className={"history-typewriter6 d-flex-row-l"}>
                        <p>...like a study spot with <b>{capacity}</b> people...</p>
                    </div>
                </div>
            )
        }
    }

    function HelperResults(props) {
        if (showDesc) {
            return (
                <Results results={results} {...props}/>
            )
        }
    }

    const handleRequestWork = useCallback(() => {
        Axios.post(props.apiPath + "/api/post/searchHistory", {
            "comfort": workDict["comfort"],
            "outlet": workDict["outlet"],
            "loud": workDict["loud"],
            "light": workDict["light"],
            "capacity": workDict["capacity"],
            "table": workDict["table"]
        }).then(data => {
            setResults(data.data)
        });
    }, [props.apiPath, workDict]);

    const getAllInfo = useCallback(async (workType) => {
        console.log(workType)
        let lengthSpots = props.workReviews[workType].length;
        let tempWorkDict = {"loud": 0, "light": 0, "outlet": 0, "comfort": 0, "table": 0, "capacity": 0}
        let rating = 0;

        for (const spot of props.workReviews[workType]) {
            if (spot[1] === 5) {
                rating = 6;
            } else if (spot[1] === 4) {
                rating = 5.5;
            } else if (spot[1] === 3) {
                rating = 5;
            } else if (spot[1] === 2) {
                rating = 4.5;
            } else if (spot[1] === 1) {
                rating = 4;
            }

            const response = await Axios.get(props.apiPath + "/api/get/location/", {params: {spot_id: spot[0]}});
            tempWorkDict["loud"] += response.data[0].loudness_rating * (rating / 5) / lengthSpots;
            tempWorkDict["light"] += response.data[0].natural_light_rating * (rating / 5) / lengthSpots;
            tempWorkDict["outlet"] += response.data[0].outlets_rating * (rating / 5) / lengthSpots;

            let comfSum = 0
            let comfNum = 0
            if (response.data[0].table_seat_comfort !== -1) {
                comfSum += response.data[0].table_seat_comfort;
                comfNum += 1;
            }
            if (response.data[0].nontable_seat_comfort !== -1) {
                comfSum = response.data[0].nontable_seat_comfort;
                comfNum += 1;
            }
            if (response.data[0].couch_comfort !== -1) {
                comfSum = response.data[0].couch_comfort;
                comfNum += 1;
            }

            tempWorkDict["comfort"] += comfSum / comfNum * (rating / 5) / lengthSpots;

            tempWorkDict["table"] += response.data[0].tables * (rating / 5) / lengthSpots;
            tempWorkDict["capacity"] += response.data[0].max_capacity * (rating / 5) / lengthSpots;
        }

        setWorkDict(tempWorkDict)
        return Promise.resolve()

    }, [props.apiPath, props.workReviews]);

    useEffect(() => {

        if (workType) {
            getAllInfo(workType).then(() => {
                handleRequestWork()
            })
        }

    }, [workType])

    useEffect(() => {
        handleRequestWork()

        if (workType) {
            setShowDesc(true)
        } else {
            setShowDesc(false)
        }

    }, [handleRequestWork, workDict, workType])

    return (
        <div className={"work-container d-flex-col-c"}>
            <div id={"work-sel-container"} className={"d-flex-col-c"}>
                <p>What type of work are you doing?</p>
                <Select name="work" options={props.work} className="basic-multi-select" classNamePrefix="select"
                        onChange={handleSelect}/>
                <Description/>
            </div>
            <div className={"rec-results"}>
                <HelperResults/>
            </div>
        </div>
    )
}

function History(props) {

    const [results, setResults] = useState([])

    let loud = (props.totalDict["loud"] >= 3.75 ? "loud" : (props.totalDict["loud"] >= 2 ? "moderately loud" : (props.totalDict["loud"] >= 1.25 ? "moderately quiet" : "quiet")))
    let light = (props.totalDict["light"] >= 3.75 ? "lots of" : (props.totalDict["light"] >= 2 ? "some" : (props.totalDict["light"] >= 1.25 ? "a little" : "very little")))
    let outlet = (props.totalDict["outlet"] >= 3.75 ? "lots of" : (props.totalDict["outlet"] >= 2 ? "some" : (props.totalDict["outlet"] >= 1.25 ? "a few" : "no")))
    let comfort = (props.totalDict["comfort"] >= 3.75 ? "very comfortable" : (props.totalDict["comfort"] >= 2 ? "comfortable" : (props.totalDict["comfort"] >= 1.25 ? "less comfortable" : "uncomfortable")))
    let table = (props.totalDict["table"] >= 0.75 ? "need" : (props.totalDict["table"] >= 0.5 ? "want" : (props.totalDict["table"] >= 0.25 ? "don't need" : "don't want")))
    let capacity = (props.totalDict["capacity"] >= 60 ? "lots of" : (props.totalDict["capacity"] >= 30 ? "many" : (props.totalDict["capacity"] >= 15 ? "some" : "a few")))

    const handleRequest = useCallback(() => {
        Axios.post(props.apiPath + "/api/post/searchHistory", {
            "comfort": props.totalDict["comfort"],
            "outlet": props.totalDict["outlet"],
            "loud": props.totalDict["loud"],
            "light": props.totalDict["light"],
            "capacity": props.totalDict["capacity"],
            "table": props.totalDict["table"]
        }).then(data => {
            console.log(data)
            props.handler.setDictHelper(props.totalDict)
            props.handler.setHistDataHelper(data.data)
            setResults(data.data)
        });
    }, [props.apiPath, props.handler, props.totalDict]);

    const calcComf = useCallback(response => {
        let comfSum = 0
        let comfNum = 0
        if (response.data[0].table_seat_comfort !== -1) {
            comfSum += response.data[0].table_seat_comfort;
            comfNum += 1;
        }
        if (response.data[0].nontable_seat_comfort !== -1) {
            comfSum = response.data[0].nontable_seat_comfort;
            comfNum += 1;
        }
        if (response.data[0].couch_comfort !== -1) {
            comfSum = response.data[0].couch_comfort;
            comfNum += 1;
        }

        return {comfSum, comfNum};
    }, []);


    const getAllInfo = useCallback(async (allSpots, likesDict, reviewsDict) => {
        let lengthRev = props.userReviews.length;
        let lengthLike = props.userLikes.size;
        let comf = {};
        let rating = 0;

        for (const spot_id of allSpots) {
            const response = await Axios.get(props.apiPath + "/api/get/location", {
                params: {spot_id: spot_id}
            });

            if (props.userLikes.has(response.data[0].spot_id)) {
                likesDict["loud"] += response.data[0].loudness_rating / lengthLike;
                likesDict["light"] += response.data[0].natural_light_rating / lengthLike;
                likesDict["outlet"] += response.data[0].outlets_rating / lengthLike;

                comf = calcComf(response);

                likesDict["comfort"] += comf.comfSum / comf.comfNum / lengthLike;

                likesDict["table"] += response.data[0].tables / lengthLike;
                likesDict["capacity"] += response.data[0].max_capacity / lengthLike;
            }
            for (const findReview of props.userReviews) {
                if (findReview.spot_id === response.data[0].spot_id) {
                    if (findReview.rating === 5) {
                        rating = 6;
                    } else if (findReview.rating === 4) {
                        rating = 5.5;
                    } else if (findReview.rating === 3) {
                        rating = 5;
                    } else if (findReview.rating === 2) {
                        rating = 4.5;
                    } else if (findReview.rating === 1) {
                        rating = 4;
                    }
                    reviewsDict["loud"] += response.data[0].loudness_rating * (rating / 5) / lengthRev;
                    reviewsDict["light"] += response.data[0].natural_light_rating * (rating / 5) / lengthRev;
                    reviewsDict["outlet"] += response.data[0].outlets_rating * (rating / 5) / lengthRev;

                    comf = calcComf(response);

                    reviewsDict["comfort"] += comf.comfSum / comf.comfNum * (rating / 5) / lengthRev;

                    reviewsDict["table"] += response.data[0].tables * (rating / 5) / lengthRev;
                    reviewsDict["capacity"] += response.data[0].max_capacity * (rating / 5) / lengthRev;
                }
            }
        }

        for (const [key, value] of Object.entries(likesDict)) {
            props.totalDict[key] = (value * 0.35) + (reviewsDict[key] * 0.65)
        }

    }, [calcComf, props.apiPath, props.totalDict, props.userLikes, props.userReviews]);


    useEffect(() => {
        if (Object.keys(props.totalDict).length === 0 || props.totalDict["capacity"] === 0) {
            let allSpots = [];
            let likesDict = {"loud": 0, "light": 0, "outlet": 0, "comfort": 0, "table": 0, "capacity": 0}
            let reviewsDict = {"loud": 0, "light": 0, "outlet": 0, "comfort": 0, "table": 0, "capacity": 0}

            for (const like of props.userLikes) {
                allSpots.push(like)
            }

            for (const review of props.userReviews) {
                if (!allSpots.includes(review.spot_id)) {
                    allSpots.push(review.spot_id)
                }
            }

            getAllInfo(allSpots, likesDict, reviewsDict).then(() => {
                handleRequest();
            })

        } else if (props.histData.length > 0) {
            setResults(props.histData)
        }
    }, [getAllInfo, handleRequest, props.histData, props.totalDict, props.userLikes, props.userReviews])

    return (
        <div className={"history-container d-flex-col-c"}>
            <div id={"rec-desc-container"} className={"d-flex-col-c"}>
                <div className={"recommendation-desc d-flex-row-l"}>
                    <p>Based on your previous activity, you usually...</p>
                </div>
                <div className={"history-typewriter1 d-flex-row-l"}>
                    <p>...want a <b>{loud}</b> environment...</p>
                </div>
                <div className={"history-typewriter2 d-flex-row-l"}>
                    <p>...like a location with <b>{light}</b> light...</p>
                </div>
                <div className={"history-typewriter3 d-flex-row-l"}>
                    <p>...want a study spot with <b>{outlet}</b> outlets...</p>
                </div>
                <div className={"history-typewriter4 d-flex-row-l"}>
                    <p>...prefer <b>{comfort}</b> seating...</p>
                </div>
                <div className={"history-typewriter5 d-flex-row-l"}>
                    <p>...<b>{table}</b> a table or writing surface...</p>
                </div>
                <div className={"history-typewriter6 d-flex-row-l"}>
                    <p>...like a study spot with <b>{capacity}</b> people...</p>
                </div>
            </div>

            <div className={"rec-results"}>
                <Results results={results} {...props}/>
            </div>
        </div>
    )
}

function Results(props) {
    const stars = {0: "☆☆☆☆☆", 1: "★☆☆☆☆", 2: "★★☆☆☆", 3: "★★★☆☆", 4: "★★★★☆", 5: "★★★★★"};

    return (
        <div className={"collaborate-container d-flex-col-c gap-20"}>
            {(props.results.length === 0) ?
                <div>Sorry, no study spots match the information gathered from your previous activity.</div>
                :
                props.results.map(result => {
                    const image = "/media/locationsSD/" + result.spot_id + "-00.webp";

                    return (
                        <Link to={`${props.oldpath}/location-${result.spot_id}`} style={{width: "100%"}} key={result.spot_id}><div id={"location-header"} className={"result-item"} key={result.spot_id}>
                            <img src={image} alt="" className={"location-img"} loading={"lazy"}/>
                            <div className={"location-header-info full-length result-item-header"}>
                                <h2>{result.building}</h2>
                                <h3 className={"fw-500"}>{result.location}</h3>
                                <p className={"rating"}>{stars[result.overall_rating]}</p>
                            </div>
                        </div></Link>
                    );
                })
            }
        </div>
    );
}

export default function Recommendation(props) {

    useEffect(() => {
      if (!props.user.isSignedIn) {
        props.handler.handleShowAuthenticate()
      }
    }, [props.user])


    return (
        <div className={"recommendation-container d-flex f-col"}>
            <div className={"recommendation-header d-flex-col-c"}>
                <Link to={props.path}>
                    <div>
                        <h1>Get a Recommendation...</h1>
                    </div>
                </Link>
                <div className={"thick line"}/>
            </div>

            <div className={"recommendation-select-row"}>
                <div id={"op-display"}>
                    <Link to={props.path + "-history"}><div className={"rec-option"}>
                            <h1>👀 History &rarr;</h1>
                            <p>Find a study spot based on your likes and reviews!</p>
                    </div></Link>
                    <Link to={props.path + "-work"}><div className={"rec-option"}>
                            <h1>📖 Work Type &rarr;</h1>
                            <p>Find a study spot based on the type of work you're doing!</p>
                    </div></Link>
                </div>
            </div>

            <Choice {...props}/>
        </div>
    )
}
