function ForeCastData() {

    const time = new Date();
    const hours = `${time.getHours()}`.padStart(2, '0');
    const minutes = `${time.getMinutes()}`.padStart(2, '0');
    const curTime = `${hours}:${minutes}`;
    
    return (
        <div className="foreCast-data">
            <p className="weather-data">{curTime}</p>
            <p className="weather-data">🌤️</p>
            <p className="weather-data">20 °C</p>
        </div>
    )
}

export default ForeCastData
