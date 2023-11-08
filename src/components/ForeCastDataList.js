import ForeCastData from "./ForeCastData"


function ForeCastDataList({forecast}) {
    return (
        <div>
            <ul className="foreCast-list">
                {forecast.map((el, i) => <ForeCastData key={el} forecast={forecast[i]} />)}
            </ul>
        </div>
    )
}

export default ForeCastDataList
