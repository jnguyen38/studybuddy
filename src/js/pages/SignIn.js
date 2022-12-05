import {Navigate} from "react-router-dom";

export default function SignIn(props) {


    return (!props.user.isSignedIn) ? (
        <div id={"map-bg"}>

        </div>
    ) : (
        <Navigate to={props.path + "/"}/>
    );
}