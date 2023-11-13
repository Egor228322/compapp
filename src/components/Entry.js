function Entry({data, setLocationData}) {
    const time = new Date();
    const month = `${time.getMonth()}`.padStart(2, '0');
    const day = `${time.getDate()}`.padStart(2, '0');
    const year = `${time.getFullYear()}`.padStart(2, '0');
    const date = `${month}/${day}/${year}`;
    const hours = `${time.getHours()}`.padStart(2, '0');
    const minutes = `${time.getHours()}`.padStart(2, '0');
    const curTime = `${hours}:${minutes}`;
    
    return (
        <li className="entry"
            data-value={`${data.lat}:${data.lon}`}
            onClick={(e) => {
                const value = e.currentTarget.dataset.value;
                const [lat, lng] = value.split(':');
                const coords = { lat, lng, name: data.name }
                setLocationData(coords);
            }}
        >
            <p className="date">{date}</p>
            <p className="time">{curTime}</p>
            <p className="location">{data.name}</p>
        </li>
    )
}

export default Entry
