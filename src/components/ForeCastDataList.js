import ForeCastData from "./ForeCastData"


function ForeCastDataList({forecast, mode}) {
    return (
        <div>
            <ul className="foreCast-list">
                {forecast.map((el, i) => <ForeCastData key={i} forecast={forecast[i]} mode={mode} />)}
            </ul>
        </div>
    )
}

export default ForeCastDataList
