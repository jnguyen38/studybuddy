import ERDiagram from "../media/initial_ER.jpg";
import Select from "react-select";
import {useState} from "react";

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

              <br></br>
              <h2>Features</h2>
              <input type="checkbox" id="table"></input>
              <label for="tables">Table</label>
              <br></br>
              <input type="checkbox" id="couch"></input>
              <label for="couch">Couch</label>
              <br></br>
              <input type="checkbox" id="printer"></input>
              <label for="printer">Printer</label>
              <br></br>
              <br></br>
              <h2>Seat Comfort</h2>
                <div class="ratingSC">
                  <input id="ratingSC1" type="radio" name="ratingSC" value="1"></input>
                  <label for="ratingSC1">1</label>
                  <input id="ratingSC2" type="radio" name="ratingSC" value="2"></input>
                  <label for="ratingSC2">2</label>
                  <input id="ratingSC3" type="radio" name="ratingSC" value="3"></input>
                  <label for="ratingSC3">3</label>
                  <input id="ratingSC4" type="radio" name="ratingSC" value="4"></input>
                  <label for="ratingSC4">4</label>
                  <input id="ratingSC5" type="radio" name="ratingSC" value="5"></input>
                  <label for="ratingSC5">5</label>
                </div>
              <br></br>
              <h2>Group Size</h2>
                <div class="slide-containerGS">
                  <input type="range" min="1" max="20" onChange={(e) => setValueGS(e.target.value)} value={valueGS} class="sliderGS"></input>
                </div>
              <br></br>
              <h2>Natural Light</h2>
                <div class="ratingNL">
                  <input id="ratingNL1" type="radio" name="ratingNL" value="1"></input>
                  <label for="ratingNL1">1</label>
                  <input id="ratingNL2" type="radio" name="ratingNL" value="2"></input>
                  <label for="ratingNL2">2</label>
                  <input id="ratingNL3" type="radio" name="ratingNL" value="3"></input>
                  <label for="ratingNL3">3</label>
                  <input id="ratingNL4" type="radio" name="ratingNL" value="4"></input>
                  <label for="ratingNL4">4</label>
                  <input id="ratingNL5" type="radio" name="ratingNL" value="5"></input>
                  <label for="ratingNL5">5</label>
                </div>
                <input type="radio" id="less" name="less" value="less"></input>
                <label htmlFor="less">Less than</label>

                <input type="radio" id="more" name="more" value="more"></input>
                <label htmlFor="more">Greater than or equal to</label>

              <br></br>
              <br></br>
              <h2>Loudness</h2>
                <div class="ratingL">
                  <input id="ratingL1" type="radio" name="ratingL" value="1"></input>
                  <label for="ratingL1">1</label>
                  <input id="ratingL2" type="radio" name="ratingL" value="2"></input>
                  <label for="ratingL2">2</label>
                  <input id="ratingL3" type="radio" name="ratingL" value="3"></input>
                  <label for="ratingL3">3</label>
                  <input id="ratingL4" type="radio" name="ratingL" value="4"></input>
                  <label for="ratingL4">4</label>
                  <input id="ratingL5" type="radio" name="ratingL" value="5"></input>
                <label for="ratingL5">5</label>
                </div>
              <br></br>
              <h2>Outlets</h2>
                <div class="ratingO">
                  <input id="ratingO1" type="radio" name="ratingO" value="1"></input>
                  <label for="ratingO1">1</label>
                  <input id="ratingO2" type="radio" name="ratingO" value="2"></input>
                  <label for="ratingO2">2</label>
                  <input id="ratingO3" type="radio" name="ratingO" value="3"></input>
                  <label for="ratingO3">3</label>
                  <input id="ratingO4" type="radio" name="ratingO" value="4"></input>
                  <label for="ratingO4">4</label>
                  <input id="ratingO5" type="radio" name="ratingO" value="5"></input>
                  <label for="ratingO5">5</label>
                  </div>
              <br></br>
              <h2>Capacity</h2>
                <div class="slide-containerC">
                  <input type="range" min="1" max="20" onChange={(e) => setValueC(e.target.value)} value={valueC} class="sliderC"></input>
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

