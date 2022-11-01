import ERDiagram from "../media/initial_ER.jpg";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { filterBy } from "@progress/kendo-data-query";
const allData = [
    {
        id: 1,
        text: "Small",
    },
    {
        id: 2,
        text: "Medium",
    },
    {
        id: 3,
        text: "Large",
    },
];

export default function Search() {
    const [data, setData] = React.useState(allData.slice());
    const filterData = (filter) => {
        const data = allData.slice();
        return filterBy(data, filter);
    };
    const filterChange = (event) => {
        setData(filterData(event.filter));
    };

    return (
        <main id={"overview-container"}>
            <h1>Find a study space</h1>
            <form>
                <label> Select a building </label>
                <br></br>
                <select>
                    <option value = "HammesNotreDameBookstore"> Hammes Notre Dame Bookstore
                    </option>
                    <option value = "NotreDameLawSchool"> Notre Dame Law School
                    </option>
                    <option value = "StinsonRemickHallOfEngineering"> Stinson-Remick Hall of Engineering
                    </option>
                    <option value = "HesburghCenter"> Hesburgh Center
                    </option>
                </select>
            </form>

            <DropDownList
                style={{
                    width: "300px",
                }}
                data={data}
                textField="text"
                filterable={true}
                onFilterChange={filterChange}
            />

        </main>
    )
}
ReactDOM.render(<App />, document.querySelector("my-app"));


