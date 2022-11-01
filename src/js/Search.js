import ERDiagram from "../media/initial_ER.jpg";

export default function Search() {
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

              <br></br>
              <h2>Group Size</h2>

              <br></br>
              <h2>Natural Light</h2>
                <div className={"rating"}>
                  <input id="rating1" type="radio" name="rating" value="1"></input>
                  <label htmlFor="rating1">1</label>
                  <input id="rating2" type="radio" name="rating" value="2"></input>
                  <label htmlFor="rating2">2</label>
                  <input id="rating3" type="radio" name="rating" value="3"></input>
                  <label htmlFor="rating3">3</label>
                  <input id="rating4" type="radio" name="rating" value="4"></input>
                  <label htmlFor="rating4">4</label>
                  <input id="rating5" type="radio" name="rating" value="5"></input>
                  <label htmlFor="rating5">5</label>
                </div>
              <br></br>
              <h2>Loudness</h2>
              <br></br>
              <h2>Outlets</h2>
              <br></br>
              <h2>Capacity</h2>

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

