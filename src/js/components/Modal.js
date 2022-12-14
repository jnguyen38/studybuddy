import {Link} from "react-router-dom";
import Axios from "axios";
import CreatableSelect from 'react-select/creatable';
import SignIn from "../pages/SignIn";

export function AllPhotos(props) {
    if (!props.show) return;

    return (
        <div className={"modal"} onClick={props.close}>
            <div className={"modal-form see-all d-flex f-col"} onClick={e => e.stopPropagation()}>
                <p className={"see-all-title as-fs"}>Photos ( {props.photos.length} )</p>
                <div className={"thin light-blue full-length line"}/><br/>
                <div className={"see-all-display gap-20 full-length"}>
                    {props.photos.map((photo, index) => {
                        const image = "./media/locationsSD/" + photo;
                        return (
                            <div className={"see-all-photo-cont"} key={index}>
                                <img src={image} alt="" className={"see-all-photo fill"}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export function Authenticate(props) {
    if (!props.show) return;

    return (
        <div className={"modal"} onMouseDown={props.close}>
            <SignIn {...props} grow={true}/>
        </div>
    );
}

export function EditModal(props) {
    if (!props.show) return;

    const title = props.query[0].toUpperCase() + props.query.substring(1)

    function handleSubmit(event) {
        event.preventDefault();
        Axios.put(props.apiPath + "/api/put/edit", {
            "description": event.target.description.value,
            "id": props.spot_id,
            "query": props.query
        }).then((data) => {
            console.log(data)
        });
        props.editSubmit();
    }


    return (
        <div className={"modal"} onMouseDown={props.close}>
            <div className={"modal-form grow-animation d-flex-col-c"} onMouseDown={e => e.stopPropagation()}>
                {(props.user.isAdmin) ? (!props.editSubmitted) ?
                    <form onSubmit={handleSubmit} id={"edit-desc"} className={"form-container d-flex f-col"}>
                        <h2>Edit the {title}</h2>
                        <div className={"light-blue line"}/>
                        <textarea placeholder={`Enter your ${props.query} here...`} name="description" maxLength="512" required/>
                        <div className={"form-buttons d-flex jc-fe"}>
                            <input type="reset" value="Clear" className={"btn"}/>
                            <input type="submit" value="Submit" className={"btn submit-btn"}/>
                        </div>
                    </form>
                    :
                    <div>
                        <h1 style={{color:"black"}}>Thank You!</h1>
                    </div>
                    :
                    <div>
                        <h1 style={{color:"black"}}>No, no, no. Naughty, naughty!</h1>
                    </div>
                }
            </div>
        </div>
    );
}

export function RevModal(props) {
    if (!props.show) return;

    function handleSubmit(event) {
        event.preventDefault()

        const data = {"name": event.target.name.value,
            "description": event.target.description.value,
            "rating": event.target.rating.value,
            "spot_id": props.spot_id,
            "work_type": event.target.work.value,
            "username": props.user.username
        }

        Axios.post(props.apiPath + "/api/post/review", data).then((data) => {
            console.log(data)
            props.close()
        }).then(() => {
            window.location.reload()
        });
    }

    return (
        <div className={"modal"} onClick={props.close}>
            <div className={"modal-form grow-animation d-flex-col-c"} onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit} id={"write-review"} className={"form-container d-flex f-col"}>
                    <h2>Write a Review</h2>
                    <div className={"light-blue line"}/>
                    <div className={"d-flex jc-sb full-length f-wrap gap-20"}>
                        <input type="text" value={`${props.user.firstName} ${props.user.lastName}`} name="name" readOnly/>
                        <input type="number" placeholder="Rating" name="rating" min="1" max="5" required/>
                    </div>
                    <CreatableSelect name={"work"} options={props.work} className={"dropdown as-fs"} classNamePrefix={"Select"} placeholder={"Work Type"} required/>
                    <textarea placeholder="Content" name="description" maxLength={300} required/>
                    <div className={"form-buttons d-flex jc-fe"}>
                        <input type="submit" value="Submit" className={"btn submit-btn"}/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export function MenuModal(props) {
    if (!props.show) return;

    return (
        <div className={"modal"} onClick={props.close}>
            <div className={"modal-effect"} onClick={e => {e.stopPropagation()}}/>
            <div className={"modal-main"} onClick={e => {e.stopPropagation()}}>
                <h1 className={"modal-title"}>Menu</h1>
                <div className={"line thick yellow"}/>
                <div className={"options-display"}>
                    <Link to={props.redirect.home}><div className="modal-nav-item" onClick={props.close}>
                        <h2>Home</h2>
                    </div></Link>
                    <Link to={props.redirect.dev}><div className="modal-nav-item" onClick={props.close}>
                        <h2>Devplan</h2>
                    </div></Link>
                    <Link to={props.redirect.overview}><div className="modal-nav-item" onClick={props.close}>
                        <h2>Overview</h2>
                    </div></Link>
                    <div className={"modal-nav-item"} onClick={props.handleSettings}>
                        <h2>Settings</h2>
                    </div>
                </div>
                <div className={"line thick yellow"}/>
            </div>
        </div>
    );
}


export function SettingsModal(props) {
    if (!props.show) return;

    return (
        <div className={"modal"} onClick={props.close}>
            <div className={"modal-effect"} onClick={e => {e.stopPropagation()}}/>
            <div className={"modal-main"} onClick={e => {e.stopPropagation()}}>
                <h1 className={"modal-title"}>Settings</h1>
                <div className={"line thick yellow"}/>
                <div className={"options-display"}>
                    <h2>User</h2>
                    <button onClick={(props.user.isSignedIn) ? props.handler.signOut : props.handler.handleShowAuthenticate} className={"settings-button"}>
                        {(props.user.isSignedIn) ? "Log Out" : "Log In"}
                    </button>
                </div>
                <div className={"line thick yellow"}/>
                <div className={"options-display"}>
                    <h2>UX Mode</h2>
                    <button onClick={props.handler.handleUXMode} className={"settings-button"}>
                        {(props.UXMode) ? "Set to Dark" : "Set to Light"}
                    </button>
                </div>
                <div className={"line thick yellow"}/>
            </div>
        </div>
    );
}
