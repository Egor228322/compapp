import Entry from "./Entry"

function Favorites({favorites, setLocationData}) {
    return (
        <ul className="history">
            {favorites.length ? favorites.map((el, i) => <Entry key={i} data={el} setLocationData={setLocationData} />) : ''}
        </ul>
    )
}

export default Favorites
