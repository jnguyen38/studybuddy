import ERDiagram from "../media/initial_ER.jpg";
import {useEffect, useState} from "react";

export default function Search() {

  const [valueGS, setValueGS] = useState(0)
  const [valueC, setValueC] = useState(0)

    return (
        <div className={"search-container"}>
          <div className={"search-header"}>
            <h1>Find a study spot...</h1>
          </div>
          <div className={"search-row"}>
            <div className={"filter-column"}>
              <h2>Building</h2>

              <br></br>
              <h2>Features</h2>

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
