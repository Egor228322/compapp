
function ForeCastData({ forecast }) {
    console.log('Constructed path:', `../icons/${forecast.icon}.png`);
    console.log('forecast.icon value:', forecast.icon);
    
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
            <p className="weather-data">{forecast.temp}</p>
        </div>
    )
}

export default ForeCastData
