import Select from "react-select";
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useEffect} from "react";

function FilterTitle(props) {
    return (
        <div className={"filter-title"}>
            <div className={"thin full-length line"} />
            <h4>{props.title}</h4>
        </div>
    );
}

export function Ratings(props) {
    let selectedOption = undefined;

    function formSubmit (val) {
      selectedOption = val;
    }

    return (
        <div className={"rating d-flex"}>
            <input id={props.class + "1"} type="radio" name={props.class} value="1" checked={selectedOption} onChange={(e) => formSubmit(e.target.value)}></input>
            <label htmlFor={props.class + "1"}>.</label>
            <input id={props.class + "2"} type="radio" name={props.class} value="2" checked={selectedOption} onChange={(e) => formSubmit(e.target.value)}></input>
            <label htmlFor={props.class + "2"}>.</label>
            <input id={props.class + "3"} type="radio" name={props.class} value="3" checked={selectedOption} onChange={(e) => formSubmit(e.target.value)}></input>
            <label htmlFor={props.class + "3"}>.</label>
            <input id={props.class + "4"} type="radio" name={props.class} value="4" checked={selectedOption} onChange={(e) => formSubmit(e.target.value)}></input>
            <label htmlFor={props.class + "4"}>.</label>
            <input id={props.class + "5"} type="radio" name={props.class} value="5" checked={selectedOption} onChange={(e) => formSubmit(e.target.value)}></input>
            <label htmlFor={props.class + "5"}>.</label>
        </div>
    );
}

export function Results(props) {
    const stars = {0: "☆☆☆☆☆", 1: "★☆☆☆☆", 2: "★★☆☆☆", 3: "★★★☆☆", 4: "★★★★☆", 5: "★★★★★"};

    return (
        <div className={"results-container gap-10"}>
            {(props.results.length === 0) ?
                <div></div>
                :
                props.results.map(result => {
                    const image = "./media/locationsGallery/" + result.spot_id + "-00.webp";

                    return (
                        <Link to={`${props.path}/location-${result.spot_id}`} key={result.spot_id}>
                            <div className={"result-item"} key={result.spot_id}>
                                <img src={image} alt="" className={"location-img"} loading={"lazy"}/>
                                <div className={"result-header-info full-length result-item-header"}>
                                    <h2>{result.building}</h2>
                                    <h3 className={"fw-500"}>{result.location}</h3>
                                    <p>{stars[result.overall_rating]}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })
            }
        </div>
    );
}

export default function Search(props) {
    const [sliderGroup, setSliderGroup] = useState(1)
    const [sliderCapacity, setSliderCapacity] = useState(1)
    const [sliderLoudness, setSliderLoudness] = useState(undefined)
    const [results, setResults] = useState([])

    const optionList = props.buildings;

    function handleSubmit(event) {
        event.preventDefault()
        axios.post(props.apiPath + "/api/post/search", {
            "building": event.target.buildings.value,
            "seatComfort": event.target.ratingSC.value,
            "outlets": event.target.ratingO.value,
            "loudness": event.target.loudness.value,
            "naturalLight": event.target.ratingNL.value,
            "capacity": event.target.capacity.value,
            "group": event.target.group.value
        }).then(data => {
           console.log(data)
            setResults(data.data)
        });
    }

    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <div className={"search-container"}>
            <div className={"d-flex-col-l"}>
                <h1 className={"title"}>Find a Study Spot</h1><br/>
                <div className={"thin full-length line"}/>
            </div>

            <div className={"search-row"}>
                <form className={"filter-column"} onSubmit={handleSubmit}>
                    <FilterTitle title={"Building"}/>
                    <div className="App">
                        <div className="dropdown-container">
                            <Select name="buildings" options={optionList}
                                    className="basic-multi-select" classNamePrefix="select"/>
                        </div>
                    </div>

                    <FilterTitle title={"Features"}/>
                    <div className={"d-flex-col-l gap-10"}>
                        <div className={"d-flex gap-20 ml-20"}>
                            <input type="checkbox" name="table"/>
                            <label htmlFor="tables">Tables Available</label><br/>
                        </div>
                        <div className={"d-flex gap-20 ml-20"}>
                            <input type="checkbox" name="couch"/>
                            <label htmlFor="couch">Couches Available</label><br/>
                        </div>
                        <div className={"d-flex gap-20 ml-20"}>
                            <input type="checkbox" name="printer"/>
                            <label htmlFor="printer">Printer Nearby</label>
                        </div>
                    </div>

                    <FilterTitle title={"Seat Comfort"}/>
                    <Ratings class={"ratingSC"}/>


                    <FilterTitle title={"Natural Light"}/>
                    <Ratings class={"ratingNL"}/>

                    <FilterTitle title={"Outlets"}/>
                    <Ratings class={"ratingO"}/>

                    <FilterTitle title={"Loudness"}/>
                    <div className={"d-flex jc-sb gap-20"}>
                        <input type="range" min="1" max="5" className="slider"
                               onChange={(e) => setSliderLoudness(parseInt(e.target.value))} value={sliderLoudness}/>
                        <input type="number" className={"slider-num"} min="1" max="5" name="loudness"
                               onChange={e => setSliderLoudness(parseInt(e.target.value))} value={sliderLoudness}/>
                    </div>

                    <FilterTitle title={"Group Size"}/>
                    <div className={"d-flex jc-sb gap-20"}>
                        <input type="range" min="1" max="20" className="slider"
                               onChange={(e) => setSliderGroup(parseInt(e.target.value))} value={sliderGroup}/>
                        <input type="number" className={"slider-num"} min="1" max="20" name="group"
                               onChange={e => setSliderGroup(parseInt(e.target.value))} value={sliderGroup}/>
                    </div>

                    <FilterTitle title={"Capacity"}/>
                    <div className={"d-flex jc-sb gap-20"}>
                        <input type="range" min="1" max="100" className="slider"
                           onChange={(e) => setSliderCapacity(parseInt(e.target.value))} value={sliderCapacity}/>
                        <input type="number" className={"slider-num"} min="1" max="100" name="capacity"
                               onChange={e => setSliderCapacity(parseInt(e.target.value))} value={sliderCapacity}/>
                    </div>

                    <FilterTitle title={""}/><br/>
                    <div className={"form-buttons d-flex-row-c"}>
                        <input type="reset" value="Clear" className={"btn"} onClick={() => {setSliderCapacity(1); setSliderGroup(1); setSliderLoudness(1)}}/>
                        <input type="submit" value="Submit" className={"btn submit-btn"}/>
                    </div>
                </form>
                <Results results={results} {...props}/>
            </div>
        </div>
    );
};
