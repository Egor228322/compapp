import ForeCastData from "./ForeCastData"

function ForeCast({ forecast, mode }) {

    return (
        <div className="list-container">
            <ul className="foreCast-list">
                {forecast.map((el, i) => <ForeCastData key={i} forecast={forecast[i]} mode={mode} />)}
            </ul>
        </div>
    )
}

export default ForeCast
