import Entry from "./Entry"
import { ThemeContext } from "../App";
import { useContext } from "react";

function Favorites({ favorites, setLocationData }) {

    const { theme } = useContext(ThemeContext);
    
    if (favorites.length) {
    return (
        <ul className="history">
            {favorites.length ? favorites.map((el, i) => <Entry key={i} data={el} setLocationData={setLocationData} />) : ''}
        </ul>
    );
    } else {
        return <p className="error-entries" style={{color : theme === 'dark' && 'var(--entry-color)'}}>There are currently no entries</p>;
    }
}

export default Favorites
