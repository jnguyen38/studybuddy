import {Link} from "react-router-dom";
import Axios from "axios";
import SHA3 from "sha3";

function Authenticate(props) {

    function handleSubmit(event) {
        event.preventDefault();
        let hash = new SHA3(512);
        hash.update(event.target.password.value)
        Axios.post(props.basePath + "/api/post/admin", {
           "user": event.target.user.value,
           "password": hash.digest("hex").toString()
        }).then(data => {
            console.log(data)
            console.log(data.data)
            console.log(!!(data.data))
            props.setAdmin(() => data.data)
        }).then(() => {
            console.log(props.admin)
        });
    }

    return (
        <form onSubmit={handleSubmit} id={"admin-container"} className={"form-container d-flex f-col"}>
            <h2>Admin Portal</h2>
            <div className={"light-blue line"}/>
            <input type="text" placeholder="Username" name="user" required/>
            <input type="password" placeholder="Password" name="password" required/>
            <div className={"form-buttons d-flex jc-c"}>
                <input type="submit" value="Log In" className={"btn submit-btn"}/>
            </div>
        </form>
    );
}

export function EditDescModal(props) {
    if (!props.show) return;

    function handleSubmit(event) {
        event.preventDefault();
        Axios.post(props.basePath + "/api/post/editDesc", {
            "description": event.target.description.value,
            "id": props.id
        }).then((data) => {
            console.log(data)
        });
        props.editSubmit();
    }


    return (
        <div className={"modal"} onMouseDown={props.close}>
            <div className={"modal-form d-flex-col-c"} onMouseDown={e => e.stopPropagation()}>
                {props.admin ?
                    (!props.editSubmitted) ?
                        <form onSubmit={handleSubmit} id={"edit-desc"} className={"form-container d-flex f-col"}>
                            <h2>Edit the Description</h2>
                            <div className={"light-blue line"}/>
                            <textarea placeholder="Enter your description here..." name="description" maxLength="100" required/>
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
                    <Authenticate {...props}/>
                }
            </div>
        </div>
    );
}

export function RevModal(props) {
    if (!props.show) return;

    function handleSubmit(event) {
        Axios.post(props.basePath + "/api/post/review", {
            "name": event.target.name.value,
            "content": event.target.content.value,
            "rating": event.target.rating.value,
            "space_id": props.id
        }).then((data) => {
            console.log(data)
        });
    }

    return (
        <div className={"modal"} onClick={props.close}>
            <div className={"modal-form d-flex-col-c"} onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit} id={"write-review"} className={"form-container d-flex f-col"}>
                    <h2>Write a Review</h2>
                    <div className={"light-blue line"}/>
                    <div className={"d-flex jc-sb full-length"}>
                        <input type="text" placeholder="Name" name="name" required/>
                        <input type="number" placeholder="Rating" name="rating" required/>
                    </div>
                    <textarea type="text" placeholder="Content" name="description" required/>
                    <div className={"form-buttons d-flex jc-fe"}>
                        <input type="reset" value="Clear" className={"btn"}/>
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
                    <Link to={props.homeRd}><div className="modal-nav-item" onClick={props.close}>
                        <h2>Home</h2>
                    </div></Link>
                    <Link to={props.devRd}><div className="modal-nav-item" onClick={props.close}>
                        <h2>Devplan</h2>
                    </div></Link>
                    <Link to={props.overviewRd}><div className="modal-nav-item" onClick={props.close}>
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
    function No() {
        console.log("No")
    }

    return (
        <div className={"modal"} onClick={props.close}>
            <div className={"modal-effect"} onClick={e => {e.stopPropagation()}}/>
            <div className={"modal-main"} onClick={e => {e.stopPropagation()}}>
                <h1 className={"modal-title"}>Settings</h1>
                <div className={"line thick yellow"}/>
                <div className={"options-display"}>
                    <h2>UX Mode</h2>
                    <button onClick={props.changeUXMode} className={"settings-button"}>
                        {(props.UXMode) ? "Set to Dark" : "Set to Light"}
                    </button>
                </div>
                <div className={"line thick yellow"}/>
                <div className={"options-display"}>
                    <h2>Admin</h2>
                    <button onClick={(props.admin) ? props.logOutAdmin : No} className={"settings-button"}>
                        {(props.admin) ? "Log Out" : "Log In"}
                    </button>
                </div>
            </div>
        </div>
    );
}

