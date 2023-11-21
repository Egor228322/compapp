import ForeCastDataDaily from "./ForeCastDataDaily"

function ForeCastDaily({forecast, mode}) {
    return (
        <div className="list-container-daily">
            <ul className="forecast-daily-list">
                {forecast.map((data, i) => <ForeCastDataDaily forecast={data} mode={mode} key={i} />)}
            </ul>
        </div>
    )
}

export default ForeCastDaily
