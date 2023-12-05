import { useContext } from "react"
import { ThemeContext } from "../App"

function Data({ children, curLocationData }) {

    const { theme } = useContext(ThemeContext);

    //returns jsx for the data container which is bascially the background gradient and the DataMain cocntainer
    //also returns a hyperlink at the bottom which redirects to the open weather website
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
