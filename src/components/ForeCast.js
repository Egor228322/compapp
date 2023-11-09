import ForeCastDataList from "./ForeCastDataList"

function ForeCast({ forecast }) {

    return (
        <div>
            <ForeCastDataList forecast={forecast} />
        </div>
    )
}

export default ForeCast
