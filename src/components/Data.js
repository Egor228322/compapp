import { useContext } from "react"
import { ThemeContext } from "../App"

function Data({ children, curLocationData }) {

    const { theme } = useContext(ThemeContext);

    return (
        <div className="data-container" style={{
            background: theme === 'dark' ?
                `linear-gradient(to bottom, var(--data-secondary-dark), white)`:
                `linear-gradient(to bottom, var(--data-secondary), white)`
                }}>
            {children}
            <a href={`https://openweathermap.org/city/${curLocationData.id}`} target="_blank" rel="noreferrer" className="btn-hyperlink" role="button">Click for More</a>
        </div>
    )
}

export default Data
