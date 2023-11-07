import { useState } from "react";

function Temp({ locationData }) {

    console.log(locationData)

  const [mode, setMode] = useState('c');
  const [temp, setTemp] = useState(locationData.main.temp);
  const [feels_like, setFeels_like] = useState(locationData.main.feels_like);
  
    function handleChangeMetric() {
      if (mode === 'c') {
        setTemp(Math.round((temp * 9 / 5) + 32));
        setFeels_like(Math.round((feels_like * 5 / 9) + 32));
      } else {
        setTemp(Math.round((temp - 32) * (5 / 9)));
        setFeels_like(Math.round((feels_like - 32) * (5 / 9)));
      }
      setMode(mode === 'c' ? 'f' : 'c');
    }

    return (
        <div className="temp">
            <div className="main-data-temp">
                <h2><span>📍</span>{locationData.name}</h2>
                <p>Sun, 5 November 14:58</p>
            <h1>
                {`${temp}°`} 
            </h1>
            </div>
            <div className="info-temp">
                <p>{locationData.weather[0].main}</p>
                <p>{locationData.main.temp_max} / {locationData.main.temp_min}°</p>
                <p>Feels like: {`${feels_like}°`}</p>
            </div>
            </div>
    )
}

export default Temp;