import { useContext, useEffect, useState } from "react";
import Suggestion from "./Suggestion"
import geoCode from "../AJAX/locationList";
import { ThemeContext } from "../App";

//Accepts lots of props
function SearchBar({locationData, locationList, setLocationData, setLocationList, setIsLoadingList, KEY }) {
    
    const { theme } = useContext(ThemeContext);
    
    //Contains state responsible for the input query
    const [query, setQuery] = useState('');


    //Effect runs every time the query is changed
    useEffect(() => {
    //Create an abort controller
    const controller = new AbortController();
    
    //Error handling
    if (!query.length) {
      setLocationList([]);
    } else {
      geoCode(setLocationList, setIsLoadingList, controller, query, KEY);
    }

    //Returns a cleanup function that prevents a race condition
    return () => {
      controller.abort();
    };
    }, [query]);
    
    //Clears the query when a selection is made from the list
    useEffect(function () {
        setQuery('')
    }, [locationData])

    //Returns markup for the input as well as the suggestions list
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
