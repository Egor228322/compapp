
//Accepts data fromt the geocode API
function Suggestion({ data, setLocationData }) {

    //Returns jsx for the possible locations with the same names
    return (
        //List item contains a data-value attribute that stores the lat, lng so that it can be passed to the setLocationData function in App.js
        <li
            className="search-item"
            data-value={`${data.lat}:${data.lon}:${data.name}`}
            onClick={(e) => {
                const value = e.currentTarget.dataset.value;
                const [lat, lng, name] = value.split(':');
                const coords = { lat, lng, name };
                setLocationData(coords);
            }}>
            <span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="search-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </span>{`${data.name} ${data.state ? `, ${data.state}` : ''}, ${data.country}`}
        </li>
    )
}

export default Suggestion
