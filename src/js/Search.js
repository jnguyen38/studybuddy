import ERDiagram from "../media/initial_ER.jpg";

export default function Search() {
    return (
        <main id={"overview-container"}>
            <h1>Find a study space</h1>
            <form>
                <label> Select a building </label>
                <select>
                    <option value = "BMW"> BMW
                    </option>
                    <option value = "Mercedes"> Mercedes
                    </option>
                    <option value = "Audi"> Audi
                    </option>
                    <option value = "Skoda"> Skoda
                    </option>
                </select>
            </form>

        </main>
    );
}


