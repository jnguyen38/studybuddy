import {Link} from "react-router-dom";
import Axios from "axios";
import SHA3 from "sha3";
import info from "../../media/icons/info.svg";
import CreatableSelect from 'react-select/creatable';

export function Authenticate(props) {
    if (!props.show) return;

    function handleSignUp() {
        props.handler.closeSettings();
        props.close();
    }

    function handleSignIn(userData) {
        props.handler.signIn(userData.data);
        props.close();
    }

    function handleIncorrectSignIn() {
        document.getElementById("err-incorrect-sign-in").classList.remove("d-none");
        document.getElementById("err-incorrect-sign-in").classList.add("d-flex-row-c");
    }

    function handleSubmit(event) {
        event.preventDefault();

        let hash = new SHA3(512);
        hash.update(event.target.password.value);

        function request(event, lat, long) {
            Axios.put(props.apiPath + "/api/put/signin", {
              "user": event.target.user.value,
              "password": hash.digest("hex").toString(),
              "latitude": lat,
              "longitude": long
            }).then((userData) => {
                if (userData.data.isSignedIn) {
                    handleSignIn(userData);
                } else
                    handleIncorrectSignIn();
            });
        }

        props.handler.getMyLocation().then(data => {
            request(event, data.coords.latitude, data.coords.longitude);
        }, reason => {
            console.log(reason);
            request(event, NaN, NaN);
        });
    }

    return (
        <div className={"modal"} onMouseDown={props.close}>
            <div className={"modal-form d-flex-col-c"} onMouseDown={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit} id={"admin-container"} className={"form-container d-flex f-col"}>
                    <h2>Sign In</h2>
                    <div className={"thin light-blue line"}/>
                    <div id={"err-incorrect-sign-in"} className={"warning d-none"}>
                        <img src={info} alt="" className={"icon warning-icon xxs-icon"}/>
                        <p>Incorrect username or password</p>
                    </div>
                    <input type="text" placeholder="Username" name="user" autoComplete={"username"} required/>
                    <input type="password" placeholder="Password" name="password" autoComplete={"current-password"} required/>
                    <div className={"form-buttons d-flex jc-c"}>
                        <input type="submit" value="Log In" className={"btn submit-btn"}/>
                    </div>
                    <div className={"sign-up d-flex-col-c"}>
                        <p>Don't have an account yet?</p>
                        <p><Link to={props.path + "/signup"} onClick={handleSignUp}>Sign up here!</Link></p>
                    </div>
                </form>
            </div>
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
            <div className={"modal-form d-flex-col-c"} onMouseDown={e => e.stopPropagation()}>
                {(props.user.isAdmin) ? (!props.editSubmitted) ?
                    <form onSubmit={handleSubmit} id={"edit-desc"} className={"form-container d-flex f-col"}>
                        <h2>Edit the {title}</h2>
                        <div className={"light-blue line"}/>
                        <textarea placeholder={`Enter your ${props.query} here...`} name="description" maxLength="100" required/>
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

    const optionList = props.work;

    function handleSubmit(event) {
        event.preventDefault()
        Axios.post(props.apiPath + "/api/post/review", {
            "name": event.target.name.value,
            "description": event.target.description.value,
            "rating": event.target.rating.value,
            "spot_id": props.spot_id,
            "work_type": event.target.work.value,
            "username": props.user.username
        }).then((data) => {
            console.log(data)
            props.close()
        }).then((data) => {
          Axios.get(props.apiPath + "/api/get/likes").then((reviewsData) => {
            props.handler.findReviews(reviewsData.data);
            props.handler.setDictHelper({});
            props.handler.setHistDataHelper([]);
          })
        })

    }

    return (
        <div className={"modal"} onClick={props.close}>
            <div className={"modal-form d-flex-col-c"} onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit} id={"write-review"} className={"form-container d-flex f-col"}>
                    <h2>Write a Review</h2>
                    <div className={"light-blue line"}/>
                    <div className={"d-flex jc-sb full-length"}>
                        <input type="text" value={`${props.user.firstName} ${props.user.lastName}`} name="name" readOnly/>
                        <input type="number" placeholder="Rating" name="rating" min="1" max="5" required/>
                        <CreatableSelect isMulti name="work" options={optionList} className="basic-multi-select" classNamePrefix="select"/>
                    </div>
                    <textarea placeholder="Content" name="description" required/>
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
