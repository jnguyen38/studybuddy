import Select from "react-select";
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function FilterTitle(props) {
    return (
        <div className={"filter-title"}>
            <div className={"thin full-length line"} />
            <h4>{props.title}</h4>
        </div>
    );
}

function Ratings(props) {
    let selectedOption = undefined;

    function formSubmit (val) {
      selectedOption = val;
    }

    return (
        <div className={"rating d-flex"}>
            <input id={props.class + "1"} type="radio" name={props.class} value="1" checked={selectedOption} onChange={(e) => formSubmit(e.target.value)}></input>
            <label htmlFor={props.class + "1"}>1</label>
            <input id={props.class + "2"} type="radio" name={props.class} value="2" checked={selectedOption} onChange={(e) => formSubmit(e.target.value)}></input>
            <label htmlFor={props.class + "2"}>2</label>
            <input id={props.class + "3"} type="radio" name={props.class} value="3" checked={selectedOption} onChange={(e) => formSubmit(e.target.value)}></input>
            <label htmlFor={props.class + "3"}>3</label>
            <input id={props.class + "4"} type="radio" name={props.class} value="4" checked={selectedOption} onChange={(e) => formSubmit(e.target.value)}></input>
            <label htmlFor={props.class + "4"}>4</label>
            <input id={props.class + "5"} type="radio" name={props.class} value="5" checked={selectedOption} onChange={(e) => formSubmit(e.target.value)}></input>
            <label htmlFor={props.class + "5"}>5</label>
        </div>
    );
}

function Results(props) {
    return (
        <div className={"results-container d-flex-col-c gap-20"}>
            {(props.results.length === 0) ?
                <div>Hello</div>
                :
                props.results.map(result => {
                    const image = "./media/locationsSD/" + result.spot_id + "-00.webp";

                    return (
                        <Link to={`${props.path}/location/${result.spot_id}`} style={{width: "100%"}} key={result.spot_id}><div id={"location-header"} className={"result-item"} key={result.spot_id}>
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

export default function Search(props) {
    const [sliderGroup, setSliderGroup] = useState(1)
    const [sliderCapacity, setSliderCapacity] = useState(1)
    const [results, setResults] = useState([])

    const optionList = [
        { value: "Hammes Notre Dame Bookstore", label: "Hammes Notre Dame Bookstore" },
        { value: "Notre Dame Law School", label: "Notre Dame Law School" },
        { value: "Stinson-Remick Hall of Engineering", label: "Stinson-Remick Hall of Engineering" },
        { value: "Hesburgh Center", label: "Hesburgh Center" },
        { value: "Stayer Center", label: "Stayer Center" },
        { value: "Mendoza College of Business", label: "Mendoza College of Business" },
        { value: "DeBartolo Hall", label: "DeBartolo Hall" },
        { value: "Fitzpatrick Hall of Engineering", label: "Fitzpatrick Hall of Engineering" },
        { value: "Cushing Hall of Engineering", label: "Cushing Hall of Engineering" },
        { value: "Duncan Student Center", label: "Duncan Student Center" },
        { value: "Bond Hall", label: "Bond Hall" },
        { value: "Coleman Morse Center", label: "Coleman-Morse Center" },
        { value: "O'Shaughnessy Hall", label: "O'Shaughnessy Hall" },
        { value: "Jordan Hall of Science", label: "Jordan Hall of Science" },
        { value: "Pasquerilla Center", label: "Pasquerilla Center" },
        { value: "McCourtney Hall", label: "McCourtney Hall" },
        { value: "Hesburgh Library", label: "Hesburgh Library" },
        { value: "Nieuwland Hall of Science", label: "Nieuwland Hall of Science" },
        { value: "LaFortune Student Center", label: "LaFortune Student Center" },
    ];

    function handleSubmit(event) {
        event.preventDefault()
        axios.post(props.apiPath + "/api/post/search", {
            "building": event.target.buildings.value,
            "seatComfort": event.target.ratingSC.value,
            "outlets": event.target.ratingO.value,
            "loudness": event.target.ratingL.value,
            "naturalLight": event.target.ratingNL.value,
            "capacity": event.target.capacity.value,
            "group": event.target.group.value
        }).then(data => {
           console.log(data)
            setResults(data.data)
        });
    }

    return (
        <div className={"search-container"}>
            <div className={"search-header d-flex-col-c"}>
                <h1>Find a Study Spot</h1>
                <div className={"thick line"}/>
            </div>

            <div className={"search-row"}>
                <form className={"filter-column"} onSubmit={handleSubmit}>
                    <FilterTitle title={"Building"}/>
                    <div className="App">
                        <div className="dropdown-container">
                            <Select isMulti name="buildings" options={optionList}
                                    className="basic-multi-select" classNamePrefix="select"/>
                        </div>
                    </div>

                    <FilterTitle title={"Features"}/>
                    <div>
                        <input type="checkbox" name="table"/>
                        <label htmlFor="tables">Table</label><br/>
                        <input type="checkbox" name="couch"/>
                        <label htmlFor="couch">Couch</label><br/>
                        <input type="checkbox" name="printer"/>
                        <label htmlFor="printer">Printer</label>
                    </div>

                    <FilterTitle title={"Seat Comfort"}/>
                    <Ratings class={"ratingSC"}/>


                    <FilterTitle title={"Natural Light"}/>
                    <Ratings class={"ratingNL"}/>

                    <FilterTitle title={"Loudness"}/>
                    <Ratings class={"ratingL"}/>

                    <FilterTitle title={"Outlets"}/>
                    <Ratings class={"ratingO"}/>

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
                        <input type="reset" value="Clear" className={"btn"} onClick={() => {setSliderCapacity(1); setSliderGroup(1);}}/>
                        <input type="submit" value="Submit" className={"btn submit-btn"}/>
                    </div>
                </form>
                <Results results={results} {...props}/>
            </div>
        </div>
    );
};
