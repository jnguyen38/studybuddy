import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
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
    return (
        <div className={"results-container d-flex-col-c gap-20"}>
            {(props.results.length === 0) ?
                <div>Hello</div>
                :
                props.results.map(result => {
                    const image = "./media/locations/" + result.spot_id + "-00.jpg";

                    return (
                        <Link to={`${props.path}/location/${result.spot_id}`} style={{width: "100%"}}>
                            <div id={"location-header"} className={"result-item"} key={result.spot_id}>
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

function recommend(data, locs) {
    // let new_data = data
    get_distance(data, '010100', ["Knott Hall", "Keough Hall"])
    //new_data = new_data.map(place => {
    //    return {...place, get_distance(new_data, new_data["spot_id"], locs)}}
    //})

    return data;
}

function get_distance(data, spot_id, locs) {
    for (let i = 0; i < locs.length; i++) {
        let dest = data.filter(spot => spot.spot_id === spot_id).location
        let url = `${maps_url}origins=${locs[i]}&destinations=${dest}&units=${units}&mode=${mode}&key=${key}`
        /*
        var config = {
            method: 'get',
            url,
            headers: {
                //'Access-Control-Allow-Origin': null,
                //'Access-Control-Allow-Headers': '*',
                //'Access-Control-Allow-Credentials': 'true'
            }
        }
        */
        console.log(`URL is ${url}`)
        axios.get(url)
            .then(function (response) {
                console.log(response)
            });
    }
}

export default function Collaborate(props) {
    const [state, setState] = useState({
        userBuilding: "",
    });

    const [count, setCount] = useState(0);
    const [results, setResults] = useState([])

    function handleSubmit(event) {
        event.preventDefault()
        axios.get( props.apiPath + "/api/get/groupRec", {
            params: {
                groupSize: count + 1
            }
        }).then(data => {
            data = recommend(data.data, count + 1)
            setResults(data)
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

    function addAnother(event) {
        setCount(count + 1);
        console.log(count);
    }

    function removeFriend(event) {
        setCount(count - 1);
        console.log(count);
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
                        <input name="userBuilding" type="text" value={state.userBuilding} placeholder="Enter a building name" onChange={handleChange}/>
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
                            return <input key={index} name={'friendUsername' + index} type="text" placeholder="Enter a username"></input>;
                        })}
                    </div>
                    <div className={"friend-building-input"}>
                        {Array.from(Array(count)).map((c, index) => {
                            return <input key={index} name={'friendBuilding' + index} type="text" placeholder="Enter a building name"></input>;
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
