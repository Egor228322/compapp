import { useContext } from "react"
import Button from "./Button"
import { ThemeContext } from "../App"

function UpperBar({ children, setTheme }) {
    
    const { theme } = useContext(ThemeContext);

    return (
        <div className="upper-bar" style={{backgroundColor : theme === 'dark' ? 'var(--data-secondary-dark)' : 'var(--tertiary-backgroundColor)'}}>
            {children}
             <Button role={theme} data1={'light'} data2={'dark'} onClick={setTheme} />
        </div>
    )
}

export default UpperBar
