import Axios from "axios";
import {useEffect, useState} from "react";
import {Ratings} from "./Search";

import building from "../../media/icons/building.svg";
import location from "../../media/icons/location.svg";
import group from "../../media/icons/group.svg";
import person from "../../media/icons/person.svg";
import stairs from "../../media/icons/stairs.svg";

function SectionTitle(props) {
    return (
        <div className={"full-length"}>
            <br/><div className={"thin full-length line"}/>
            <h3>{props.title}</h3>
        </div>
    );
}

function UploadDescription() {
    return (
        <div className={"d-flex-col-l gap-20"}>
            <SectionTitle title={"Space Description"}/>

            <div className={"f-responsive-row"}>
                <div className={"upload-input d-flex"} content={"🛈 The building that your space is located in"}>
                    <img src={building} alt="" className={"icon sm-icon"}/>
                    <input name={"building"} type={"text"} placeholder={"Building Name"} maxLength={50} required/>
                </div>
                <div className={"upload-input d-flex"} content={"🛈 A short name to call your space"}>
                    <img src={location} alt="" className={"icon sm-icon"}/>
                    <input name={"location"} type={"text"} placeholder={"Location Name"} maxLength={50} required/>
                </div>
            </div>

            <div className={"f-responsive-row"}>
                <div className={"upload-input d-flex"} content={"🛈 The largest number of people that can work together in the space"}>
                    <img src={group} alt="" className={"icon sm-icon"}/>
                    <input name={"group"} type={"number"} placeholder={"Max Group Size"} min={1} required/>
                </div>
                <div className={"upload-input d-flex"} content={"🛈 The max number of people that fit in the space"}>
                    <img src={person} alt="" className={"icon sm-icon"}/>
                    <input name={"capacity"} type={"number"} placeholder={"Max Capacity"} min={1} required/>
                </div>
            </div>

            <div className={"f-responsive-row"}>
                <div className={"upload-input d-flex"} content={"🛈 The floor that your space is on"}>
                    <img src={stairs} alt="" className={"icon sm-icon"}/>
                    <input name={"floor"} type={"number"} placeholder={"Floor Number"} min={-2} required/>
                </div>
            </div>

            <div className={"d-flex gap-20 upload-checkbox"}>
                <input name={"tables"} type={"checkbox"}/>
                <p>Are there tables?</p>
            </div>

            <div className={"d-flex gap-20 upload-checkbox"}>
                <input name={"couches"} type={"checkbox"}/>
                <p>Are there couches?</p>
            </div>

            <div className={"d-flex gap-20 upload-checkbox"}>
                <input name={"printer"} type={"checkbox"}/>
                <label htmlFor={"printer"}>Is there a nearby printer?</label>
            </div>

            <textarea name={"description"} placeholder={"Description"} maxLength={512} className={"upload-textarea"} required/>
            <textarea name={"notes"} placeholder={"Other Notes"} maxLength={512} className={"upload-textarea"}/>
        </div>
    );
}

function UploadRatings(props) {
    return (
        <div className={"d-flex-col-l gap-20 mb-40"}>
            <SectionTitle title={"Space Rating"}/>

            <div className={"d-flex-col-l"}>
                <p>Loudness </p>
                <div className={"d-flex jc-sb gap-20"}>
                    <input type={"range"} min={"1"} max={"5"} className={"slider"}
                           onChange={(e) => props.setSliderLoudness(parseInt(e.target.value))} value={props.sliderLoudness}/>
                    <input type={"number"} className={"slider-num"} min={1} max={5} name={"loudness"}
                           onChange={e => props.setSliderLoudness(parseInt(e.target.value))} value={props.sliderLoudness}/>
                </div>
            </div>

            <div className={"f-responsive-row"}>
                <div className={"d-flex-col-l"}>
                    <p>Natural Light Rating</p>
                    <Ratings class={"naturalLight"}/>
                </div>
                <div className={"d-flex-col-l"}>
                    <p>Comfortability Rating</p>
                    <Ratings class={"comfort"}/>
                </div>
            </div>

            <div className={"f-responsive-row"}>
                <div className={"d-flex-col-l"}>
                    <p>Outlet Availability</p>
                    <Ratings class={"outlets"}/>
                </div>
                <div className={"d-flex-col-l"}>
                    <p>Overall Rating</p>
                    <Ratings class={"overall"}/>
                </div>
            </div>
        </div>
    );
}

export default function Upload(props) {
    const [image, setImage] = useState(null);
    const [sliderLoudness, setSliderLoudness] = useState(1)

    function handleSubmit(event) {
        event.preventDefault()
        Axios.post(props.apiPath + "/api/post/upload", {
            image: event.target.image.files[0], loudness: event.target.loudness.value,
            comfort: event.target.comfort.value, naturalLight: event.target.naturalLight.value,
            outlets: event.target.outlets.value, overall: event.target.overall.value,
            building: event.target.building.value, location: event.target.location.value,
            group: event.target.group.value, capacity: event.target.capacity.value,
            floor: event.target.floor.value, tables: event.target.tables.value,
            couches: event.target.couches.value, printer: event.target.printer.value,
            description: event.target.description.value, notes: event.target.notes.value
        }).then(res => {
            console.log(res);
        })
    }

    function handleNewImage(event) {setImage(URL.createObjectURL(event.target.files[0]));}

    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <div id={"upload-container"}>
            <div>
                <h1 className={"title"}>Upload Your Study Space</h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className={"d-flex-col-l gap-20"}>
                    <SectionTitle title={"Upload a Photo"}/>
                    {image && <img src={image} alt="" className={"upload-image"}/>}
                    <input name={"image"} type={"file"} onChange={handleNewImage} required/>
                </div>

                <UploadDescription/>
                <UploadRatings sliderLoudness={sliderLoudness} setSliderLoudness={setSliderLoudness}/>

                <div className={"form-buttons"}>
                    <input type={"submit"} value={"Submit"} className={"submit-btn btn"}/>
                </div>
            </form>
        </div>
    );
}