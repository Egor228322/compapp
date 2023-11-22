import { useState } from "react";

function Temp({ locationData }) {

  const [mode, setMode] = useState('c');

  const { C, F, weather, dt, timezone, name, id, coord:{lat, lon} } = locationData;
  const condition = weather[0].main;

    let date = new Date(dt + timezone);
    date = date.toUTCString().slice(5, -7);

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
                {`${mode === 'c' ? C.temp : F.temp}°`} 
            </h1>
            </div>
            <div className="info-temp">
                <p className="temp-condition">{condition}</p>
                <p className="temp-max-min">{mode === 'c' ? `${C.tempMax} / ${C.tempMin}°` : `${F.tempMax} / ${F.tempMin}°`}</p>
                <p className="temp-feels-like">Feels like: {mode === 'c' ? `${C.feelsLike}°` : `${F.feelsLike}°`}</p>
            </div>
            </div>
    )
}

export default Temp;



