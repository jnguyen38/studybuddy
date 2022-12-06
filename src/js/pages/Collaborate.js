import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button, ButtonGroup} from "rsuite";

function Results(props) {

    return (
        <div className={"results-container d-flex-col-c gap-20"}>
            {(props.results.length === 0) ?
                <div></div>
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
    /*
    const [state, setState] = useState({
        userBuilding: "",
    });
     */

    const [count, setCount] = useState(0);
    const [results, setResults] = useState([])
    const [locations, setLocations] = useState([])
    const [usernames, setUsernames] = useState([props.user.username])

    async function handleSubmit(event) {
        event.preventDefault()
        console.log(usernames)
        axios.get(props.apiPath + "/api/get/groupRec", {
            params: {
                groupSize: count + 1,
                whiteboard: event.target.whiteboard.checked,
                computer: event.target.computer.checked,
                tv: event.target.tv.checked,
                printer: event.target.printer.checked,
                food: event.target.food.checked
            }
        }).then(async (data) => {
            let new_data = await Promise.all(data.data.map(async (place) => Object.assign(place, await get_distance_obj(place["building"], locations))))
            axios.get(props.apiPath + "/api/get/groupReviews", {
                params: {
                    users: usernames
                }
            }).then(reviews => {
                console.log(data)
                let priorities = calc_priorities(reviews, data)
                new_data = new_data.map(place => Object.assign(place, calc_score(place)))
                new_data.sort((o1, o2) => (o1["score"] - o2["score"]))
                console.log(new_data)
                setResults(new_data)
            })
        });
    }

    /*
    function handleChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value,
        });
        console.log(event);
    }
     */

    async function get_distance_obj(building, locs) {

        return axios.get(props.apiPath + "/api/get/distances", {
            params: {
                building: building,
                locs: locs,
            }
        }).then(response => {
            let distances = response.data
            return {"distances": distances}
        })
    }

    // Might switch this to map if it needs to be faster
    function calc_priorities(reviews, places) {
        let comfort = []
        let natural_light = []
        let loudness = []
        let outlets = []

        for (let i = 0; i < reviews.length; i++) {
            let place = places.filter(place => place.spot_id === reviews[i].spot_id)[0]
            if (place)
                if (place.table_seat_comfort !== -1)
                    comfort.append(place.table_seat_comfort)
                else if (place.nontable_seat_comfort !== -1)
                    comfort.append(place.nontable_seat_comfort)
                else
                    comfort.append(place.couch_comfort)
                natural_light.append(place.natural_light_rating)
                loudness.append(place.loudness_rating)
                outlets.append(places.outlets_rating)
        }

        let stdevs = {'comfort': Math.std(comfort), 'natural_light_rating': Math.std(natural_light),
            'loudness_rating': Math.std(loudness), 'outlets_rating': Math.std(outlets)}

        return stdevs

    }

    // Can add rating in here eventually
    function calc_score(place) {
        let dists = place["distances"]
        dists.sort((a,b) => b - a)
        let num_locs = place["distances"].length
        let score = 0
        let denom_total = 0
        let score_total = 0
        let matter = Math.ceil(num_locs / 2.0)
        for (let i = 0; i < matter; i++) {
            score_total += (dists[i] * (matter - i))
            denom_total += (matter - i)
        }
        score = score_total / denom_total


        return {"score": score}
    }

    function addAnother(event) {
        setCount(count + 1);
        console.log(count);
    }

    function removeFriend(event) {
        setCount(count - 1);
        console.log(count);
    }

    function getTimeNow(event) {
        var now = new Date();
        return (now.getHours() + ':' + now.getMinutes());
    }

    function fillTimeNow(event) {
        document.getElementById('time-id').value = getTimeNow();
    }

    function fillDateTime(event) {
        fillDateNow(event);
        fillTimeNow(event);
    }

    function getDateNow(event) {
        var today = new Date();
        return ((today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear())
    }

    function fillDateNow(event) {
        document.getElementById('date-id').value = getDateNow();
    }

    function convertPM(event) {
        var timePM = document.getElementById('time-id').value;
        console.log(timePM);
        let pmArray = timePM.split(":");
        let pmHours = parseInt(pmArray[0]) + 12;
        let pmUpdate = pmHours + ":" + pmArray[1];
        console.log(pmUpdate);
        document.getElementById('time-id').value = pmUpdate;
        /*var timePMHours = timePM.getHours() + 12;
        var timePMUpdate = timePMHours + ":" + timePM.getMinutes();
        document.getElementById('time-id').value = timePMUpdate;*/
    }

    function handleLocationChange(index, event) {
        let cur_locs = locations
        cur_locs[index] = event.target.value
        setLocations(cur_locs)
    }

    function handleUsernameChange(index, event) {
        let cur_users = usernames
        cur_users[index] = event.target.value
        setUsernames(cur_users)
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
                            return <input key={index + 1} name={"friendUsername" + index} type="text" placeholder="Enter a username" onChange={handleUsernameChange.bind(this, index + 1)} />;
                        })}
                    </div>
                    <div className={"friend-building-input"}>
                        {Array.from(Array(count)).map((c, index) => {
                            return <input key={index + 1} name={'friendBuilding' + index} type="text" placeholder="Enter a building name" onChange={handleLocationChange.bind(this, index + 1)} />;
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
                <div className={"time-day"}>
                    <p>When are you meeting?</p>
                    <div className={"time-day-inputs"}>
                        <div className={"day-input"}>
                            <p>Date: </p>
                            <input id="date-id" name="day" type="text" placeholder="mm/dd/yyyy"/>
                        </div>
                        <div className={"time-input"}>
                            <p>Time: </p>
                            <input id="time-id" name="time" type="text" placeholder="hh:mm"/>
                            <ButtonGroup className="am-pm-button" variant="contained" aria-label="outlined primary button group">
                                <Button className={"small-button"}>AM</Button>
                                <Button className={"small-button"} onClick={convertPM}>PM</Button>
                            </ButtonGroup>
                        </div>
                        <button onClick={fillDateTime} className={"btn now-time"}>Now 🕒</button>
                    </div>
                </div>
                <div className={"group-features"}>
                    <p>Do you want any of the following?</p>
                    <input type="checkbox" name="whiteboard"/>
                    <label htmlFor="whiteboard">Whiteboard</label><br/>
                    <input type="checkbox" name="computer"/>
                    <label htmlFor="computer">Computer</label><br/>
                    <input type="checkbox" name="tv"/>
                    <label htmlFor="tv">TV</label><br/>
                    <input type="checkbox" name="printer"/>
                    <label htmlFor="printer">Printer</label><br/>
                    <input type="checkbox" name="food"/>
                    <label htmlFor="food">Food Available Nearby</label>
                </div>
                <div className={"submit-button"}>
                    <input type="submit" value="Submit" className={"btn submit-btn"} />
                </div>
            </form>
            <Results results={results} {...props}/>
        </div>
    );
};
