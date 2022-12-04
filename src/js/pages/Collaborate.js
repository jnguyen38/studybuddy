import {useState} from "react";
import axios from "axios";
//import * as Pyscript from "pyscript";
import {Link} from "react-router-dom";
//import {Html, Head, Main, NextScript} from next/document
//import google from '@types/google.maps';
//import {GoogleMap, useJsApiLoader} from '@react-google-maps/api'
//import maps from 'google'
//const cors = require('cors');
//const express = require('express')
//const app = express()
//app.use(cors())

const key = "AIzaSyAT1Fh-IXMLOqzp6tWekPy-0FpplWtITaY" // API Key
const units = "imperial"
const mode = "walking"
const maps_url = "https://maps.googleapis.com/maps/api/distancematrix/json?"
//var service = new google.maps.DistanceMatrixService();

function Results(props) {
    //console.log(Pyscript.range(0, 10))

    return (
        <div className={"results-container d-flex-col-c gap-20"}>
            {(props.results.length === 0) ?
                <div>Hello</div>
                :
                props.results.map(result => {
                    const image = "./media/locationsSD/" + result.spot_id + "-00.webp";

                    return (
                        <Link key={result.spot_id} to={`${props.path}/location/${result.spot_id}`} style={{width: "100%"}}>
                            <div id={"location-header"} className={"result-item"}>
                                <img src={image} alt="" className={"location-img"}/>
                                <div className={"location-header-info full-length result-item-header"}>
                                    <h2>{result.building}</h2>
                                    <h3>{result.location}</h3>
                                </div>
                            </div>
                        </Link>
                    );
                })
            }
        </div>
    );
}


export default function Collaborate(props) {
    const [state, setState] = useState({
        userBuilding: "",
    });

    const [count, setCount] = useState(0);
    const [results, setResults] = useState([])
    const [locations, setLocations] = useState([])
    const [usernames, setUsernames] = useState([])

    async function handleSubmit(event) {
        event.preventDefault()
        axios.get(props.apiPath + "/api/get/groupRec", {
            params: {
                groupSize: count + 1,
                locs: locations
            }
        }).then(data => {
            //data = recommend(data.data, count + 1)
            get_distance_obj("Mendoza College of Business", locations)
            //setResults(data.data)
        });
    }

    function handleChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value,
        });
        console.log(event);
    }

    async function get_distance_obj(building, locs) {

        console.log(locs)
        axios.get(props.apiPath + "/api/get/distances", {
            params: {
                building: building,
                locs: locs
            }
        }).then(response => {
            let distances = response.data
            let distObj = {}
            let longestDist = 0
            for (let j = 0; j < distances.length; j++) {
                if (distances[j] > longestDist)
                    longestDist = distances[j]
                distObj[`dist${j}`] = distances[j]
                if (j === (locs.length - 1))
                    distObj["longestDist"] = longestDist
            }
            console.log(distObj)
            return distObj
        })
    }

    function addAnother(event) {
        setCount(count + 1);
        console.log(count);
    }

    function removeFriend(event) {
        setCount(count - 1);
        console.log(count);
    }

    function handleLocationChange(index, event) {
        let cur_locs = locations
        cur_locs[index] = event.target.value
        setLocations(cur_locs)
    }

    return (
        <div className={"collab-container"}>
            <div className={"collab-header d-flex-col-c"}>
                <h1>Find a Central Study Location</h1>
                <div className={"thick line"}/>
            </div>
            <form className={"filter-row"} onSubmit={handleSubmit}>
                <div className={"initial-questions"}>
                    <div className={"self-input"}>
                        <p>Where are you?</p>
                        <input key = "0" name="userBuilding" type="text" placeholder="Enter a building name" onChange={handleLocationChange.bind(this, 0)}/>
                    </div>
                </div>
                <div className={"friends-info"}>
                    {(count > 0) ?
                        <div className={"display-friends"}>
                            <div className={"friends-names"}>
                                <p>What are your friends' usernames?</p>
                            </div>
                            <div className={"friends-buildings"}>
                                <p>Where are they?</p>
                            </div>
                        </div>
                        :
                        <div/>
                    }
                    <div className={"friend-user-input"}>
                        {Array.from(Array(count)).map((c, index) => {
                            return <input key={index + 1} name={"friendUsername" + index} type="text" placeholder="Enter a username"></input>;
                        })}
                    </div>
                    <div className={"friend-building-input"}>
                        {Array.from(Array(count)).map((c, index) => {
                            return <input key={index + 1} name={'friendBuilding' + index} type="text" placeholder="Enter a building name" onChange={handleLocationChange.bind(this, index + 1)}></input>;
                        })}
                    </div>
                    {(count > 0) ?
                        <div className={"note"}>
                            <p>Note: If your friend does not have an existing username, please enter any name.</p>
                        </div>
                        :
                        <div/>
                    }
                </div>
                <div className={"another-button"}>
                    {(count > 0) ?
                        <button onClick={addAnother} className={"btn another-btn"}>Add another friend!</button>
                        :
                        <button onClick={addAnother} className={"btn another-btn"}>Add a friend!</button>
                    }
                    {(count > 0) ?
                        <button onClick={removeFriend} className={"btn delete-btn"}>Remove friend</button>
                        :
                        <div/>
                    }
                </div>
                <div className={"submit-button"}>
                    <input type="submit" value="Submit" className={"btn submit-btn"} />
                </div>
            </form>
            <Results results={results} {...props}/>
        </div>
    );
};
