import Entry from "./Entry"

function Favorites({ favorites, setLocationData }) {
    
    if (favorites.length) {
    return (
        <ul className="history">
            {favorites.length ? favorites.map((el, i) => <Entry key={i} data={el} setLocationData={setLocationData} />) : ''}
        </ul>
    );
    } else {
        return <p>There are currently no entries</p>;
    }
}

export default Favorites
