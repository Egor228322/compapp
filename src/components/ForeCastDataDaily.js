function ForeCastDataDaily({forecast, mode}) {
    return (
        <li className="daily-container">
            <p className="day">{forecast.day}</p>
            <figure className="daily-figure">
                <p>{forecast.main}</p>
                <img
                    src={require(`../icons/${forecast.icon}.png`)}
                    alt={forecast.description}
                    className='daily-icon-forecast'>
                </img>
            </figure>
            <p className="daily-min-max">{mode === 'metric' ?
                `${forecast.C.max}°/${forecast.C.min}°` : 
                `${forecast.F.max}°/${forecast.F.min}°`}
            </p>
        </li>
    )
}

export default ForeCastDataDaily
