import Entry from "./Entry"

function History() {
    return (
        <ul className="history">
            {Array.from({ length: 3 }, (_, i) => i + 1)
            .map(el => <Entry key={el} />)}
        </ul>
    )
}

export default History
