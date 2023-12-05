
//A styled component that is rendered when current location data is being fetched
function Loader() {
    return (
        <div className="spinner-container">
         <div className="spinner">
            <div className="circle"></div>
            <div className="cutout"></div>
            </div>
        </div>
    )
}

export default Loader
