import ERDiagram from "../media/initial_ER.jpg";

export default function Search() {


    return (
        <div class="search-container">
          <div class="search-header">
            <h1>Find a study spot...</h1>
          </div>
          <div class="search-row">
            <div class="filter-column">
              <h2>Building</h2>

              <br></br>
              <h2>Features</h2>

              <br></br>
              <h2>Seat Comfort</h2>

              <br></br>
              <h2>Group Size</h2>

              <br></br>
              <h2>Natural Light</h2>
                <div class="rating">
                  <input id="rating1" type="radio" name="rating" value="1"></input>
                  <label for="rating1">1</label>
                  <input id="rating2" type="radio" name="rating" value="2"></input>
                  <label for="rating2">2</label>
                  <input id="rating3" type="radio" name="rating" value="3"></input>
                  <label for="rating3">3</label>
                  <input id="rating4" type="radio" name="rating" value="4"></input>
                  <label for="rating4">4</label>
                  <input id="rating5" type="radio" name="rating" value="5"></input>
                  <label for="rating5">5</label>
                </div>
              <br></br>
              <h2>Loudness</h2>
              <br></br>
              <h2>Outlets</h2>
              <br></br>
              <h2>Capacity</h2>

            </div>
            <div class="results-column">
              <div class="results-list">

                <img class="spotimg" src={ERDiagram}/>
                <div class="spotinfo">
                  <h1>Spot Name</h1>
                </div>
              </div>
              <br></br>
            </div>
          </div>
        </div>
    );
};
