import {Link, Navigate} from 'react-router-dom';
import Select from "react-select";
import SHA3 from "sha3";
import info from "../../media/icons/info.svg";
import {useEffect, useState} from "react";
import Axios from "axios";

import study from "../../media/icons/study.svg";
import user from "../../media/icons/user.svg";
import lock from "../../media/icons/lock.svg";
import mail from "../../media/icons/mail.svg";

function Warnings(props) {
    if (!props.usernameTaken && !props.emailTaken && props.passwordsMatch) return;

    return (
        <div className={"warning d-flex-row-c"}>

            <img src={info} alt="" className={"icon warning-icon xxs-icon"}/>

            <div className={"d-flex-col-l"}>
                <div id={"err-password-match"} className={(!props.passwordsMatch) ? "warning d-flex-row-c" : "warning d-none"}><p>Passwords do not match</p></div>
                <div id={"err-username-taken"} className={(props.usernameTaken) ? "warning d-flex-row-c" : "warning d-none"}><p>Username is unavailable</p></div>
                <div id={"err-email-taken"} className={(props.emailTaken) ? "warning d-flex-row-c" : "warning d-none"}><p>Email is unavailable</p></div>
            </div>
        </div>
    );
}

function PersonalInfo(props) {
    return (
        <div className={"d-flex-col-c gap-20"}>
            <h4>Personal Information</h4>
            <div className={"f-responsive-row"}>
                <input type={"text"} placeholder={"First Name"} name={"firstName"} autoComplete={"first-name"} required/>
                <input type={"text"} placeholder={"Last Name"} name={"lastName"} autoComplete={"last-name"} required/>
            </div>
            <div className={"d-flex-row-c full-length"}>
                <img src={study} alt="" className={"icon light-blue-icon xs-icon"}/>
                <Select name={"major"} options={props.majors} className={"dropdown"} classNamePrefix={"Select"} placeholder={"Major"} required/>
            </div>

        </div>
    );
}

function AccountInfo(props) {
    return (
        <div className={"d-flex-col-c gap-20"}>
            <h4>Account Information</h4>
            <Warnings usernameTaken={props.usernameTaken} emailTaken={props.emailTaken} passwordsMatch={props.passwordsMatch}/>

            <div className={"f-responsive-row"}>
                <div className={"d-flex-row-c"}>
                    <img src={user} alt="" className={"icon light-blue-icon xs-icon"}/>
                    <input type={"text"} placeholder={"Username"} name={"username"} onChange={props.handler.handleUsernameChange} required/>
                </div>
                <div className={"d-flex-row-c"}>
                    <img src={mail} alt="" className={"icon light-blue-icon xs-icon"}/>
                    <input type={"text"} placeholder={"Email"} name={"email"} autoComplete={"username"} onChange={props.handler.handleEmailChange} required/>
                </div>
            </div>

            <div className={"f-responsive-row"}>
                <div className={"d-flex-row-c"}>
                    <img src={lock} alt="" className={"icon light-blue-icon xs-icon"}/>
                    <input type={"password"} placeholder={"Password"} name={"password"} autoComplete={"new-password"} value={props.password} onChange={props.handler.handlePasswordChange} required/>
                </div>
                <div className={"d-flex-row-c"}>
                    <img src={lock} alt="" className={"icon light-blue-icon xs-icon"}/>
                    <input type={"password"} placeholder={"Confirm Password"} name={"confirm"} autoComplete={"new-password"} value={props.confirm} onChange={props.handler.handleConfirmChange} required/>
                </div>
            </div>
        </div>
    );
}

export default function SignUp(props) {
    const [usernames, setUsernames] = useState({});
    const [usernameTaken, setUsernameTaken] = useState(false);
    const [emails, setEmails] = useState({});
    const [emailTaken, setEmailTaken] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    useEffect(() => {
        Axios.get(props.apiPath + "/api/get/usernames").then(data => {
            let tempUsernames = new Set();
            for (const username of data.data) tempUsernames.add(username.username);
            setUsernames(tempUsernames);
        });
        Axios.get(props.apiPath + "/api/get/emails").then(data => {
            let tempEmails = new Set();
            for (const email of data.data) tempEmails.add(email.email);
            setEmails(tempEmails);
        });
    }, [props.apiPath]);
    
    useEffect(() => {
        setPasswordsMatch(confirm === password);
    }, [confirm, password]);

    useEffect(() => window.scrollTo(0, 0), []);

    class signUpHandler {
        static handleUsernameChange(event) {setUsernameTaken((usernames.has(event.target.value.toLowerCase())));}
        static handleEmailChange(event) {setEmailTaken((emails.has(event.target.value.toLowerCase())));}
        static handlePasswordChange(event) {setPassword(event.target.value)}
        static handleConfirmChange(event) {setConfirm(event.target.value)}
    }

    function formatName(string) {return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();}

    function handleSubmit(event) {
        event.preventDefault();

        let hash = new SHA3(512);
        hash.update(password);

        if (!usernameTaken && !emailTaken && passwordsMatch) {
            Axios.post(props.apiPath + "/api/post/signup", {
                "first_name": formatName(event.target.firstName.value),
                "last_name": formatName(event.target.lastName.value),
                "username": event.target.username.value.toLowerCase(),
                "password": hash.digest("hex").toString(),
                "email": event.target.email.value.toLowerCase(),
                "major": event.target.major.value,
                "latitude": props.location.latitude,
                "longitude": props.location.longitude
            }).then(() => {
                Axios.put(props.apiPath + "/api/put/signin", {
                    "user": event.target.username.value,
                    "password": hash.digest("hex").toString(),
                    "latitude": props.location.latitude,
                    "longitude": props.location.longitude
                }).then(res => {
                    window.location.reload();
                    if (res.data.isSignedIn) {
                        props.handler.signIn(res.data);
                        props.handler.notifySignIn();
                    } else {
                        props.handler.notifyError();
                    }
                });
            });
        }
    }

    return (!props.user.isSignedIn) ? (
        <div id={"map-bg"}>
            <section id={"sign-up-container"} className={"d-flex-col-c"}>
                <div className={"sign-up-form d-flex-col-c"} onMouseDown={e => e.stopPropagation()}>
                    <form onSubmit={handleSubmit} className={"form-container d-flex-col-c"}>
                        <h2>Create an Account</h2>
                        <div className={"thin light-blue full-length line"}/>

                        <PersonalInfo majors={props.majors}/>

                        <AccountInfo handler={signUpHandler} password={password} confirm={confirm}
                                     usernameTaken={usernameTaken} emailTaken={emailTaken} passwordsMatch={passwordsMatch}/>

                        <div className={"form-buttons d-flex jc-c"}>
                            <input type={"submit"} value={"Sign Up"} className={"btn submit-btn"}/>
                        </div>

                        <div className={"sign-up d-flex-col-c as-c"}>
                            <p>Already have an account?</p>
                            <p><Link to={props.path + "/signin"}>Sign in here!</Link></p>
                        </div>

                    </form>
                </div>
            </section>
        </div>
        ) : (
        <Navigate to={props.path + "/"}/>
    );
}