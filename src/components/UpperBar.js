import Mode from "./Mode"
import SearchBar from "./SearchBar"
import WidgetsMenu from "./WidgetsMenu"

function UpperBar() {
    return (
        <div className="upper-bar">
            <SearchBar />
            <WidgetsMenu />
            <Mode />
        </div>
    )
}

export default UpperBar
