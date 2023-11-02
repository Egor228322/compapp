import ForeCast from "./ForeCast"
import Temp from "./Temp"
import Widgets from "./Widgets";

function DataMain() {
    return (
        <div className="data-main">
            <Temp />
            <ForeCast />
            <Widgets />
        </div>
    )
}

export default DataMain;
