
function ForeCastData({ forecast, mode }) {
    
    return (
        <div className="foreCast-data">
            <p className="weather-data">{forecast.time}</p>
            <figure>
                <img
                    src={require(`../icons/${forecast.icon}.png`)}
                    alt={forecast.description}
                    className='icon-forecast'>
                </img>
            </figure>
            <p className="weather-data">{mode === 'celsius' ? forecast.F : forecast.C}°</p>
        </div>
    )
}

export default ForeCastData
