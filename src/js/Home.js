import {useEffect} from "react";
import Axios from 'axios';


export default function Home() {

    useEffect(() => {
        Axios.get("http://db8.cse.nd.edu:5000/api/get").then((data)=>{
            console.log(data);
        });
    }, []);

    return (
        <div id="home-container">
            <div className={"typewriter"}>
                <h1>
                    Welcome to StudyBuddy.
                    {/*<span>dyBuddy</span>*/}
                    {/*<span>yBuddy</span>*/}
                </h1>
            </div>
        </div>
    );
};
