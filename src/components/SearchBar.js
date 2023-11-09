import Suggestion from "./Suggestion"

function SearchBar({ query, setQuery }) {
    return (
        <div className="search">
            <label>search by city: </label>
            <input
                type="text"
                placeholder="City name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}>
            </input>
            <ul className="search-suggestions">
                {Array.from({ length: 5 }, (_, i) => <Suggestion index={i} key={i}/>)}
            </ul>
        </div>
    )
}

export default SearchBar
