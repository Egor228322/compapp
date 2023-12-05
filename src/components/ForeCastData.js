//A functional component that is 1 of 19 list items displaying the time stamp, condition, and temp
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
            <p className="forecast-temp">{mode === 'metric' ? forecast.C : forecast.F}°</p>
        </li>
    )
}

export default ForeCastData
