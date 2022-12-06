import {Link, Navigate} from "react-router-dom";
import info from "../../media/icons/info.svg";
import SHA3 from "sha3";
import Axios from "axios";

export default function SignIn(props) {
    function handleSignUp() {
        window.location.replace("/signup");
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

    return (!props.user.isSignedIn) ? (
        <div className={props.grow ? "modal-form grow-animation d-flex-col-c" : "modal-form d-flex-col-c"} onMouseDown={e => e.stopPropagation()}>
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
                    <p onClick={handleSignUp} className={"underline clickable"}>Sign up here!</p>
                </div>
            </form>
        </div>
    ) : (
        <Navigate to={props.path + "/"}/>
    );
}