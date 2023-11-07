import { useState } from "react";

function Temp({ locationData }) {

  const [mode, setMode] = useState('c');

  const { C, F, weather, dt, timezone, name } = locationData;
  const condition = weather[0].main;

    let date = new Date(dt + timezone);
    date = date.toUTCString().slice(5, -7);
    
    /* const hours = `${date.getHours()}`.padStart(2, "0");
    const minutes = `${date.getMinutes()}`.padStart(2, "0");
    const time = `${hours}:${minutes}`;
    const date =  */

    
    function handleChangeMetric() {
      mode === 'c' ? setMode('f') : setMode('c');
    }

    return (
        <div className="temp">
            <div className="main-data-temp">
                <h2><span>📍</span>{name}</h2>
                <p>{date}</p>
            <h1>
                {`${mode === 'c' ? C.temp : F.temp}°`} 
            </h1>
            </div>
            <div className="info-temp">
                <p>{condition}</p>
            <p>{mode === 'c' ? `${C.tempMax} / ${C.tempMin}°` : `${F.tempMax} / ${F.tempMin}°`}</p>
                <p>Feels like: {mode === 'c' ? `${C.feelsLike}°` : `${F.feelsLike}°`}</p>
            </div>
            </div>
    )
}

export default Temp;