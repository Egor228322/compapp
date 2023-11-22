
function Data({ children }) {
    return (
        <div className="data-container">
            {children}
            <p className="powered-by">Powered By <span>
                <img className="powered-by-img" src={require(`../icons/powered-by.png`)} alt="openweather_logo"></img>
            </span>
            </p>
        </div>
    )
}

export default Data
