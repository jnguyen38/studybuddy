import React, {useState} from "react";
import ReactAvatarEditor from "react-avatar-editor";
import FormControl from "rsuite/FormControl";

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

class UploadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            sliderGroup: 1,
            preview: null,
            width: 500,
            height: 330,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleNewImage = (e) => {
        this.setState({ image: e.target.files[0] });
    };

    setSliderGroup = (e) => {
        this.setState(parseInt(e.target.value))
    }

    async handleSubmit(e) {
        if (this.editor) {
            const img = this.editor.getImageScaledToCanvas().toDataURL();
        }
    }

    render() {
        return (
            <div className={"upload-container"}>
                <div className={"upload-header"}>
                    <h1>Upload a new study space</h1>
                </div>
                <div className={"upload-body"}>
                    <div className={"space-left"}>
                        <div className={"space-information-intro"}>
                            <div className={"building-input"}>
                                <label>Building: </label>
                                <input name="building" type="text" placeholder="Enter a building name"/>
                            </div>
                            <div className={"location-input"}>
                                <label>Location: </label>
                                <input name="location" type="text" placeholder="Enter a short description"/>
                            </div>
                            <div className={"floor-input"}>
                                <label>Floor: </label>
                                <input name="floor" type="text" placeholder="Enter a number"/>
                            </div>
                        </div>
                        <h3>Upload a photo here</h3>
                        <div>
                            <ReactAvatarEditor
                                width={this.state.width}
                                height={this.state.height}
                                image={this.state.image}
                                color={[255, 255, 255, 0.6]}
                                className="editor-canvas"
                            />
                        </div>
                        <br />
                        <label>
                            <input
                                name="upload-img-input"
                                type="file"
                                onChange={this.handleNewImage}
                            />
                        </label>
                        <div className={"description-input"}>
                            <h3>Enter a description of the space</h3>
                            <textarea></textarea>
                        </div>
                        <div className={"notes-input"}>
                            <h3>Add any amenities/notes</h3>
                            <textarea></textarea>
                        </div>
                    </div>
                    <div className={"extra-information"}>
                        <div className={"people-input"}>
                            <div className={"max-group-input"}>
                                <label>Maximum Group Size:  </label>
                                <input name="maxGroup" type="text" placeholder="Enter a number"/>
                            </div>
                            <div className={"max-capacity-input"}>
                                <label>Maximum Capacity: </label>
                                <input name="maxCapacity" type="text" placeholder="Enter a number"/>
                            </div>
                        </div>
                        <div className={"features-input"}>
                            <p>Are there any of the following?</p>
                            <div>
                                <input type="checkbox" name="table"/>
                                <label htmlFor="tables">Table</label><br/>
                                <input type="checkbox" name="couch"/>
                                <label htmlFor="couch">Couch</label><br/>
                                <input type="checkbox" name="printer"/>
                                <label htmlFor="printer">Printer</label>
                            </div>
                        </div>
                        <div className={"loud-input"}>
                            <p>How loud is it?</p>
                            <input type="range" min="0" max="5" className="slider" onChange={this.setSliderGroup} value={this.sliderGroup}/>
                            <input type="number" className={"slider-num"} min="0" max="5" name="group" onChange={this.setSliderGroup} value={this.sliderGroup}/>
                        </div>
                        <div className={"seats-input"}>
                            <p>How comfortable are the seats?</p>
                            <Ratings class={"ratingSeats"}/>
                        </div>
                        <div className={"light-input"}>
                            <p>How much natural light is there?</p>
                            <Ratings class={"ratingLight"}/>
                        </div>
                        <div className={"outlets-input"}>
                            <p>How many outlets are there?</p>
                            <Ratings class={"ratingOutlets"}/>
                        </div>
                        <div className={"rating-input"}>
                            <p>How would you rate this space?</p>
                            <Ratings class={"ratingOverall"}/>
                        </div>
                        <div>
                            <input type="submit" value="Submit" className={"btn submit-btn"}/>
                        </div>
                    </div>
                </div>
            </div>
        )}}
export default UploadImage;