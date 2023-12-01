import { useContext } from "react"
import { ThemeContext } from "../App"

function Data({ children }) {

    const { theme } = useContext(ThemeContext);

    return (
        <div className="data-container" style={{
            background: theme === 'dark' ?
                `linear-gradient(to bottom, var(--data-secondary-dark), white)`:
                `linear-gradient(to bottom, var(--data-secondary), white)`
                }}>
            {children}
        </div>
    )
}

export default Data
