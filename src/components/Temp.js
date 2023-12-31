
//Functional component that displays the main data
function Temp({ locationData, handleFav, mode }) {

    const { M, I, weather, dt, timezone, name} = locationData;
    const { main, icon } = weather[0];

    let date = new Date(dt + timezone);
    date = date.toUTCString().slice(5, -7);

    //returns all the main temperature data with some icons
    return (
        <div className="temp">
            <div className="main-data-temp">
                <div className="location-temp">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="location-icon">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    </span>
                <h2>
                    {name}
                    </h2>
                </div>
                <p className="temp-date">{date}</p>
                <h1 className="temp-current">
                   <img src={require(`../icons/${icon}.png`)} alt="current weather" className="icon-main"></img>{`${mode === 'metric' ? M.temp : I.temp}°`} 
            </h1>
            </div>
            <div className="fav-btn-container" onClick={() => handleFav(locationData)} role="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="fav-icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
            </div>
            <div className="info-temp">
                <p className="temp-condition">{main}</p>
                <p className="temp-max-min">{mode === 'metric' ? `${M.tempMax} / ${M.tempMin}°` : `${I.tempMax} / ${I.tempMin}°`}</p>
                <p className="temp-feels-like">Feels like: {mode === 'metric' ? `${M.feelsLike}°` : `${I.feelsLike}°`}</p>
            </div>
            </div>
    )
}

export default Temp;



