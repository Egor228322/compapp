import Mode from "./Mode"
import SearchBar from "./SearchBar"
import WidgetsMenu from "./WidgetsMenu"

function UpperBar({query, setQuery}) {
    return (
        <div className="upper-bar">
            <SearchBar query={query} setQuery={setQuery} />
            <WidgetsMenu />
            <Mode />
        </div>
    )
}

export default UpperBar
