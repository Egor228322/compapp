import ForeCastDataList from "./ForeCastDataList"

function ForeCast({ forecast }) {
    console.log(forecast)
    return (
        <div>
            <ForeCastDataList forecast={forecast} />
        </div>
    )
}

export default ForeCast
