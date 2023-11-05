import ForeCast from "./ForeCast"
import Temp from "./Temp"
import Widgets from "./Widgets";

function DataMain({ locationData }) {
    return (
        <div className="data-main">
            <Temp locationData={locationData}/>
            <ForeCast />
            <Widgets />
        </div>
    )
}

export default DataMain;
