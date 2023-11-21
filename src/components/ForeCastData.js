
function ForeCastData({ forecast, mode }) {
    
    return (
        <div className="foreCast-data">
            <p className="forecast-time">{forecast.time}</p>
            <figure>
                <img
                    src={require(`../icons/${forecast.icon}.png`)}
                    alt={forecast.description}
                    className='icon-forecast'>
                </img>
            </figure>
            <p className="forecast-temp">{mode === 'celsius' ? forecast.F : forecast.C}°</p>
        </div>
    )
}

export default ForeCastData
