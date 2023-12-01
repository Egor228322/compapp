import { useContext, useEffect, useState } from "react";
import Suggestion from "./Suggestion"
import geoCode from "../AJAX/locationList";
import { ThemeContext } from "../App";

function SearchBar({locationData, locationList, setLocationData, setLocationList, setIsLoadingList, KEY }) {
    
    const { theme } = useContext(ThemeContext);

    const [query, setQuery] = useState('');

    useEffect(() => {
    const controller = new AbortController();

    if (!query.length) {
      setLocationList([]);
    } else {
      geoCode(setLocationList, setIsLoadingList, controller, query, KEY);
    }

    return () => {
      controller.abort();
    };
    }, [query]);
    
    useEffect(function () {
        setQuery('')
    }, [locationData])

    return (
        <div className="search">
            <label style={{color : theme === 'dark' ? 'var(--entry-color)' : '' }}>Search by city: </label>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="City name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="input">
                </input>
                <ul className="search-suggestions">
                    {locationList.length ?
                        locationList.map((data, i) => <Suggestion data={data} setLocationData={setLocationData} key={i} />)
                    : <p className="input-error">No input or Invalid input</p>}
                </ul>
            </div>
        </div>
    )
}

export default SearchBar
