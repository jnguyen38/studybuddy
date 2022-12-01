import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import Axios from "axios";
import Select from 'react-select';

function Choice(props) {

  var params = useParams()

  if (params.typerec === "history") {
    if (props.user.isSignedIn) {
      return (<History {...props}/>)
    } else {
      props.handler.handleShowAuthenticate();
    }
  } else if (params.typerec === "work") {
    return (<Work {...props}/>)
  } else {
    return (<div></div>)
  }

}

function Work(props) {

  const optionList = [
    { value: "Essay", label: "Essay" },
    { value: "Problem Set", label: "Problem Set" },
    { value: "Presentation", label: "Presentation" },
    { value: "Reading", label: "Reading" },
    { value: "Exam Prep", label: "Exam Prep" }
  ];

  return (
    <div className={"work-container d-flex-col-c"}>
        <div id={"work-sel-container"} className={"d-flex-col-c"}>
          <p>What type of work are you doing?</p>
          <Select isMulti name="work" options={optionList} className="basic-multi-select" classNamePrefix="select"/>
        </div>
    </div>
  )
}

function History(props) {

    const [results, setResults] = useState([])

    var loud = (props.totalDict["loud"] >= 3.75 ? "loud" : (props.totalDict["loud"] >= 2 ? "moderately loud" : (props.totalDict["loud"] >= 1.25 ? "moderately quiet" : "quiet")))
    var light = (props.totalDict["light"] >= 3.75 ? "lots of" : (props.totalDict["light"] >= 2 ? "some" : (props.totalDict["light"] >= 1.25 ? "a little" : "very little")))
    var outlet = (props.totalDict["outlet"] >= 3.75 ? "lots of" : (props.totalDict["outlet"] >= 2 ? "some" : (props.totalDict["outlet"] >= 1.25 ? "a few" : "no")))
    var comfort = (props.totalDict["comfort"] >= 3.75 ? "very comfortable" : (props.totalDict["comfort"] >= 2 ? "comfortable" : (props.totalDict["comfort"] >= 1.25 ? "less comfortable" : "uncomfortable")))
    var table = (props.totalDict["table"] >= 0.75 ? "need" : (props.totalDict["table"] >= 0.5 ? "want" : (props.totalDict["table"] >= 0.25 ? "don't need" : "don't want")))
    var capacity = (props.totalDict["capacity"] >= 60 ? "lots of" : (props.totalDict["capacity"] >= 30 ? "many" : (props.totalDict["capacity"] >= 15 ? "some" : "a few")))

    useEffect(() => {
      if (Object.keys(props.totalDict).length === 0 || props.totalDict["capacity"] === 0) {

        var allSpots = [];
        var likesDict = {"loud": 0, "light": 0, "outlet": 0, "comfort": 0, "table": 0, "capacity": 0}
        var reviewsDict = {"loud": 0, "light": 0, "outlet": 0, "comfort": 0, "table": 0, "capacity": 0}

        for (const like of props.userLikes) {
            allSpots.push(like)
        }

        for (const review of props.userReviews) {
            if (!allSpots.includes(review.spot_id)) {
                allSpots.push(review.spot_id)
            }
        }

        getAllInfo(allSpots, likesDict, reviewsDict).then(() => {
            handleRequest(props.totalDict);
        })

      } else if (props.histData.length > 0) {
        setResults(props.histData)
      }
    }, [])

    function handleRequest() {
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
    }

    async function getAllInfo(allSpots, likesDict, reviewsDict) {
      var lengthRev = props.userReviews.length;
      var lengthLike = props.userLikes.length;
      for (const spot_id of allSpots) {
        const response = await Axios.get(props.apiPath + "/api/get/spot/" + spot_id)
            if (props.userLikes.includes(response.data[0].spot_id)) {
              likesDict["loud"] += response.data[0].loudness_rating / lengthLike;
              likesDict["light"] += response.data[0].natural_light_rating / lengthLike;
              likesDict["outlet"] += response.data[0].outlets_rating / lengthLike;

              var comfSum = 0
              var comfNum = 0
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

              likesDict["comfort"] += comfSum / comfNum / lengthLike;

              likesDict["table"] += response.data[0].tables / lengthLike;
              likesDict["capacity"] += response.data[0].max_capacity / lengthLike;
            }
            for (const findReview of props.userReviews) {
              if (findReview.spot_id === response.data[0].spot_id) {
                reviewsDict["loud"] += response.data[0].loudness_rating * (findReview.rating/5) / lengthRev;
                reviewsDict["light"] += response.data[0].natural_light_rating * (findReview.rating/5) / lengthRev;
                reviewsDict["outlet"] += response.data[0].outlets_rating * (findReview.rating/5) / lengthRev;

                comfSum = 0
                comfNum = 0
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

                reviewsDict["comfort"] += comfSum / comfNum * (findReview.rating/5) / lengthRev;

                reviewsDict["table"] += response.data[0].tables * (findReview.rating/5) / lengthRev;
                reviewsDict["capacity"] += response.data[0].max_capacity * (findReview.rating/5) / lengthRev;
              }
            }
      }

      for (const [key, value] of Object.entries(likesDict)) {
        props.totalDict[key] = (value * 0.35) + (reviewsDict[key] * 0.65)
      }


    }

    return(
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
    return (
        <div className={"results-container d-flex-col-c gap-20"}>
            {(props.results.length === 0) ?
                <div>Sorry, no study spots match the information gathered from your previous activity.</div>
                :
                props.results.map(result => {
                    const image = "/media/locationsSD/" + result.spot_id + "-00.webp";

                    return (
                        <Link to={`${props.oldpath}/location/${result.spot_id}`} style={{width: "100%"}} key={result.spot_id}><div id={"location-header"} className={"result-item"} key={result.spot_id}>
                            <img src={image} alt="" className={"location-img"} loading={"lazy"}/>
                            <div className={"location-header-info full-length result-item-header"}>
                                <h2>{result.building}</h2>
                                <h3>{result.location}</h3>
                                <p className={"rating"}>★★★★☆</p>
                            </div>
                        </div></Link>
                    );
                })
            }
        </div>
    );
}

export default function Recommendation(props) {

   return (
          <div className={"recommendation-container d-flex-col-c"}>
              <div className={"recommendation-header d-flex-col-c"}>
                  <Link to={props.path}><div>
                      <h1>Get a Recommendation...</h1>
                  </div></Link>
                  <div className={"thick line"}/>
              </div>
              <div className={"recommendation-select-row"}>
                  <div id={"op-display"}>
                      <Link to={props.path + "/history"}><div className={"rec-option"}>
                          <h1>👀 History &rarr;</h1>
                          <p>Find a study spot based on your likes and reviews!</p>
                      </div></Link>
                      <Link to={props.path + "/work"}><div className={"rec-option"}>
                          <h1>📖 Work Type &rarr;</h1>
                          <p>Find a study spot based on the type of work you're doing!</p>
                      </div></Link>
                  </div>
              </div>
              <Choice {...props}/>
          </div>
    )

};
