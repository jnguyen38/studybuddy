import dark from "../media/icons/dark_mode.svg";
import light from "../media/icons/light_mode.svg";

export default function SettingsModal(props) {
    if (!props.show) return;

    return (
        <div className={"modal"} onClick={props.close}>
            <div className={"modal-main"}>
                <h1 className={"modal-title"}>Settings</h1>
                <div className={"line thick"}/>
                <div className={"options-display"}>
                    <h2>Set Mode:</h2>
                    {/*<img src={light} alt=""/>*/}
                    {/*<img src={dark} alt=""/>*/}
                    <button onClick={props.changeUXMode} className={"settings-button"}>
                        {(props.UXMode) ? "Dark" : "Light"}
                    </button>
                </div>
            </div>
        </div>
    );
}