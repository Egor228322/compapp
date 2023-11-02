import WidgetOption from "./WidgetOption"

function WidgetsMenu() {
    return (
        <div className="widgets-menu">
            <label>Widgets: </label>
            <select name="Widgets">
                {Array.from({ length: 5 }, (_, index) => 1 + index)
                    .map(num => <WidgetOption key={num} index={num} />)}
            </select>
        </div>
    )
}

export default WidgetsMenu;
