import ForeCastData from "./ForeCastData"


function ForeCastDataList() {
    return (
        <div>
            <ul className="foreCast-list">
                {Array.from({ length: 11 }, (_, i) => i + 1)
                .map(el => <ForeCastData key={el} />)}
            </ul>
        </div>
    )
}

export default ForeCastDataList
