
function DataField({ children }) {
    return (
        <div className="data-field">
        {children}
        <p className="powered-by">Powered By <span>
                <img className="powered-by-img" src={require(`../icons/powered-by.png`)} alt="openweather_logo"></img>
            </span>
            </p>
        </div>
    )
}

export default DataField
