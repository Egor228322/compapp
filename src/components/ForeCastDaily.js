import ForeCastDataDaily from "./ForeCastDataDaily"

function ForeCastDaily({forecast, mode}) {
    return (
        <>
            <ul className="forecast-daily-list">
                {forecast.map((data, i) => <ForeCastDataDaily forecast={data} mode={mode} key={i} />)}
            </ul>
        </>
    )
}

export default ForeCastDaily
