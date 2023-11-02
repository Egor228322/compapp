function Entry() {

    const time = new Date();
    const month = `${time.getMonth()}`.padStart(2, '0');
    const day = `${time.getDate()}`.padStart(2, '0');
    const year = `${time.getFullYear()}`.padStart(2, '0');
    const date = `${month}/${day}/${year}`;
    const hours = `${time.getHours()}`.padStart(2, '0');
    const minutes = `${time.getHours()}`.padStart(2, '0');
    const curTime = `${hours}:${minutes}`;
    
    return (
        <div className="entry">
            <p className="date">{date}</p>
            <p className="time">{curTime}</p>
            <p className="location">Wilmington DE, USA</p>
        </div>
    )
}

export default Entry
