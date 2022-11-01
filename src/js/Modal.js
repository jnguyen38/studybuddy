// import dark from "../media/icons/dark_mode.svg";
// import light from "../media/icons/light_mode.svg";

import {Link} from "react-router-dom";

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

    return (
        <div className={"modal"} onClick={props.close}>
            <div className={"modal-effect"} onClick={e => {e.stopPropagation()}}/>
            <div className={"modal-main"} onClick={e => {e.stopPropagation()}}>
                <h1 className={"modal-title"}>Settings</h1>
                <div className={"line thick yellow"}/>
                <div className={"options-display"}>
                    <h2>UX Mode</h2>
                    {/*<img src={light} alt=""/>*/}
                    {/*<img src={dark} alt=""/>*/}
                    <button onClick={props.changeUXMode} className={"settings-button"}>
                        {(props.UXMode) ? "Set to Dark" : "Set to Light"}
                    </button>
                </div>
                <div className={"line thick yellow"}/>
            </div>
        </div>
    );
}

