import ForeCastDataList from "./ForeCastDataList"

function ForeCast({ forecast, mode }) {

    return (
        <div>
            <ForeCastDataList forecast={forecast} mode={mode} />
        </div>
    )
}

export default ForeCast
