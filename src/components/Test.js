function Test({ locationData }) {
    const { main: { temp, feels_like } } = locationData;

    return (
        <div>
            {temp} {feels_like}
        </div>
    )
}

export default Test
