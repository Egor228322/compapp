
function ForeCastData({ forecast, mode }) {
    
    return (
        <li className="foreCast-data">
            <p className="forecast-time">{forecast.time}</p>
            <figure>
                <img
                    src={require(`../icons/${forecast.icon}.png`)}
                    alt={forecast.description}
                    className='icon-forecast'>
                </img>
            </figure>
            <p className="forecast-temp">{mode === 'celsius' ? forecast.F : forecast.C}°</p>
        </li>
    )
}

export default ForeCastData
