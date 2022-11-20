import {useState} from "react";

export default function Collaborate(props) {
    const [state, setState] = useState({
        userBuilding: "",
        numPeople: "",
    });

    function handleSubmit(event) {
        event.preventDefault()
        console.log(event)
    }

    function handleChange(event) {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value,
        });
        console.log(event);
    }

    let friendsNames = [];
    for (let i = 0; i < state.numPeople; i++) {
        friendsNames.push(<input key={i} name={'friendsNames' + i} placeholder="Enter a friend's username" onChange={handleChange}/>);
    }

    let friendsBuildings = [];
    for (let i = 0; i < state.numPeople; i++) {
        friendsBuildings.push(<input key={i} name={'friendsBuildings' + i} placeholder="Enter a building name" onChange={handleChange}/>);
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
                        <input name="userBuilding" value={state.userBuilding} placeholder="Enter a building name" onChange={handleChange}/>
                    </div>
                    <div className={"number-input"}>
                        <p>How many people are you meeting?</p>
                        <input name="numPeople" value={state.numPeople} placeholder="Enter a number" onChange={handleChange}/>
                    </div>
                </div>
                {(state.numPeople > 0) ?
                    <div className={"friends-info"}>
                        <div className={"friends-names"}>
                            <p>What are your friends' usernames?</p>
                            {friendsNames}
                        </div>
                        <div className={"friends-buildings"}>
                            <p>Where are they?</p>
                            {friendsBuildings}
                        </div>
                    </div>
                    :
                    <div/>
                }
                <div className={"submit-button"}>
                    <input type="submit" value="Submit" className={"btn submit-btn"} />
                </div>
            </form>
        </div>
    );
};
