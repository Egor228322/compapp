import Entry from "./Entry"

function History({ history, setLocationData }) {
    console.log(history);
    return (
        <ul className="history">
            {history.length && history.map((el, i) => <Entry key={i} data={el} setLocationData={setLocationData} />)}
        </ul>
    )
}

export default History
