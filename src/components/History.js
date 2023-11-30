import Entry from "./Entry"

function History({ history, setLocationData }) {


   if (history.length) {
    return (
        <ul className="history">
            {history.map((el, i) => <Entry key={i} data={el} setLocationData={setLocationData} />)}
        </ul>
    );
    } else {
       return <p className="error-entries"><span>There are currently no History entries.</span>
                    <span>Search and Select a location.</span></p>;
    }
}

export default History
