import { useContext } from "react";
import { ThemeContext } from "../App";

function Entry({ data, setLocationData }) {

    const { theme } = useContext(ThemeContext);
    
    return (
        <li className="entry" style={{ backgroundColor: theme === 'dark' ? 'var(--secondary-backgroundColor-dark)': 'var(--secondary-backgroundColor)'}}
            data-value={`${data.lat}:${data.lon}`}
            onClick={(e) => {
                const value = e.currentTarget.dataset.value;
                const [lat, lng] = value.split(':');
                const coords = { lat, lng, name: data.name }
                setLocationData(coords);
            }}
        >   
            <p className="location">
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="location-icon-entry">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    </span>{data.name}</p>
        </li>
    )
}

export default Entry
