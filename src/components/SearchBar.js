import Suggestion from "./Suggestion"

function SearchBar({ query, setQuery, locationList }) {

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
                {locationList && locationList.map(data => <Suggestion data={data} />)}
            </ul>
        </div>
    )
}

export default SearchBar
