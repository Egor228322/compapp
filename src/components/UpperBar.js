import { useContext } from "react"
import Button from "./Button"
import { ThemeContext } from "../App"

function UpperBar({ children, setTheme, mode, setMode }) {
    
    const { theme } = useContext(ThemeContext);


    //return the SearchBar as well as two buttons repsonsible for the theme and the units
    //Can change backgorund color based on the theme
    return (
        <div className="upper-bar" style={{backgroundColor : theme === 'dark' ? 'var(--data-secondary-dark)' : 'var(--tertiary-backgroundColor)'}}>
            {children}
            <Button role={theme} data1={'☀️'} data2={'🌑'} onClick={setTheme} />
            <Button role={mode} data1={'imperial'} data2={'metric'} onClick={setMode} />
        </div>
    )
}

export default UpperBar
