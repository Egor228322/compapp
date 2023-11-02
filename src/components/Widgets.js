import Widget from "./Widget"

function Widgets() {
    return (
        <div className="widgets">
            <ul className="widgets-list">
                {Array.from({ length: 3 }, (_, i) => i + 1)
                .map(el => <Widget key={el} />)}
            </ul>
        </div>
    )
}

export default Widgets
