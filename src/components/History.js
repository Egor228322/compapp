import Entry from "./Entry"
import { ThemeContext } from "../App";
import { useContext } from "react";

function History({ history, setLocationData }) {

    const { theme } = useContext(ThemeContext);

   if (history.length) {
    return (
        <ul className="history">
            {history.map((el, i) => <Entry key={i} data={el} setLocationData={setLocationData} />)}
        </ul>
    );
    } else {
       return <p className="error-entries" style={{color : theme === 'dark' && 'var(--entry-color)'}}><span>There are currently no History entries.</span>
                    <span>Search and Select a location.</span></p>;
    }
}

export default History
