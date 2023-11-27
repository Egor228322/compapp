import Entry from "./Entry"

function History({ history, setLocationData }) {

   if (history.length) {
    return (
        <ul className="history">
            {history.map((el, i) => <Entry key={i} data={el} setLocationData={setLocationData} />)}
        </ul>
    );
    } else {
        return <p>There are currently no entries</p>;
    }
}

export default History
