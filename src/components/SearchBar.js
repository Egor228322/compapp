import Suggestion from "./Suggestion"

function SearchBar({ query, setQuery, locationList, setLocationData }) {

    return (
        <div className="search">
            <label>search by city: </label>
            <input
                type="text"
                placeholder="City name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input">
            </input>
            <ul className="search-suggestions">
                {locationList && locationList.map((data, i) => <Suggestion data={data} setLocationData={setLocationData} key={i}/>)}
            </ul>
        </div>
    )
}

export default SearchBar
