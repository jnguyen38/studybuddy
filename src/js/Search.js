import ERDiagram from "../media/initial_ER.jpg";
import Select from "react-select";
import {useState} from "react";

function Ratings(props) {
    return (
        <div className={props.class}>
            <input id={props.class + "1"} type="radio" name={props.class} value="1"></input>
            <label htmlFor={props.class + "1"}>1</label>
            <input id={props.class + "2"} type="radio" name={props.class} value="2"></input>
            <label htmlFor={props.class + "2"}>2</label>
            <input id={props.class + "3"} type="radio" name={props.class} value="3"></input>
            <label htmlFor={props.class + "3"}>3</label>
            <input id={props.class + "4"} type="radio" name={props.class} value="4"></input>
            <label htmlFor={props.class + "4"}>4</label>
            <input id={props.class + "5"} type="radio" name={props.class} value="5"></input>
            <label htmlFor={props.class + "5"}>5</label>
        </div>
    );
}

export default function Search() {

  const [valueGS, setValueGS] = useState(0)
  const [valueC, setValueC] = useState(0)

    const optionList = [
      { value: "hammes-notre-dame-bookstore", label: "Hammes Notre Dame Bookstore" },
      { value: "notre-dame-law-school", label: "Notre Dame Law School" },
      { value: "stinson-remick-hall-of-engineering", label: "Stinson-Remick Hall of Engineering" },
      { value: "hesburgh-center", label: "Hesburgh Center" },
      { value: "stayer-center", label: "Stayer Center" },
      { value: "mendoza-college-of-business", label: "Mendoza College of Business" },
      { value: "debartolo-hall", label: "Debartolo Hall" },
      { value: "fitzpatrick-hall-of-engineering", label: "Fitzpatrick Hall of Engineering" },
      { value: "cushing-hall-of-engineering", label: "Cushing Hall of Engineering" },
      { value: "duncan-student-center", label: "Duncan Student Center" },
      { value: "bond-hall", label: "Bond Hall" },
      { value: "coleman-morse-center", label: "Coleman-Morse Center" },
      { value: "oshaughnessy-hall", label: "O'Shaughnessy Hall" },
      { value: "jordan-hall-of-science", label: "Jordan Hall of Science" },
      { value: "pasquerilla-center", label: "Pasquerilla Center" },
      { value: "mccourtney-hall", label: "McCourtney Hall" },
      { value: "hesburgh-library", label: "Hesburgh Library" },
      { value: "niewland-hall-of-science", label: "Niewland Hall of Science" },
      { value: "lafortune-student-center", label: "LaFortune Student Center" },
    ];

    return (
        <div className={"search-container"}>
          <div className={"search-header"}>
            <h1 style={{textAlign: 'left'}}>Find a study spot...</h1>
          </div>
          <div className={"search-row"}>
            <div className={"filter-column"}>
              <h2>Building</h2>
              <div className="App">
                <div className="dropdown-container" style={{width: '250px'}}>
                  <Select
                      isMulti
                      name="colors"
                      options={optionList}
                      className="basic-multi-select"
                      classNamePrefix="select"
                  />
                </div>
              </div>

              <br/>
              <h2>Features</h2>
              <input type="checkbox" id="table"></input>
              <label htmlFor="tables">Table</label>
              <br/>
              <input type="checkbox" id="couch"></input>
              <label htmlFor="couch">Couch</label>
              <br/>
              <input type="checkbox" id="printer"></input>
              <label htmlFor="printer">Printer</label>
              <br/>
              <br/>
              <h2>Seat Comfort</h2>
                <Ratings class={"ratingSC"}/>
              <br/>
              <h2>Group Size</h2>
                <div className="slide-containerGS">
                  <input type="range" min="1" max="20" onChange={(e) => setValueGS(e.target.value)} value={valueGS} className="sliderGS"></input>
                </div>
              <br/>
              <h2>Natural Light</h2>
              <Ratings class={"ratingNL"}/>
              <input type="radio" id="less" name="less" value="less"></input>
              <label htmlFor="less">Less than</label>

              <input type="radio" id="more" name="more" value="more"></input>
              <label htmlFor="more">Greater than or equal to</label>
              <br></br>
              <br></br>
              <h2>Loudness</h2>
                <Ratings class={"ratingL"}/>
              <br></br>
              <h2>Outlets</h2>
              <Ratings class={"ratingO"}/>
              <br></br>
              <h2>Capacity</h2>
                <div className="slide-containerC">
                  <input type="range" min="1" max="20" onChange={(e) => setValueC(e.target.value)} value={valueC} className="sliderC"></input>
                </div>
            </div>
            <div className={"results-column"}>
              <div className={"results-list"}>

                <img className={"spotimg"} src={ERDiagram} alt=""/>
                <div className={"spotinfo"}>
                  <h1>Spot Name</h1>
                </div>
              </div>
              <br></br>
            </div>
          </div>
        </div>
    );
};

