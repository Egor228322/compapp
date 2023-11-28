import Button from "./Button"

function UpperBar({children, theme, setTheme}) {
    return (
        <div className="upper-bar">
            {children}
             <Button role={theme} data1={'light'} data2={'dark'} onClick={setTheme} />
        </div>
    )
}

export default UpperBar
