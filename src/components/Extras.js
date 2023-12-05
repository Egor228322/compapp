
//The extras functional component features additional data that is not related to temperature
function Extras({ locationData, mode }) {
    
    const { I, M, humidity } = locationData;

    return (
        <div className="extras-container">
           <div className="extra-info">{mode === 'metric' ? `${M.pressure} Pa` : `${I.pressure} psi`}</div>
           <div className="extra-info">{mode === 'metric' ? `${M.speed} km/h` : `${I.speed} mph`}</div>
           <div className="extra-info">{mode === 'metric' ? `${M.visibility} km` : `${I.visibility} mi`}</div>
           <div className="extra-info">{humidity}%</div>
        </div>
    )
}

export default Extras
