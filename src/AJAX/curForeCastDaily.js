export default async function getForeCastDaily(lat, lon, setCurForeCastDaily, setIsLoadingForecastDaily, KEY) { 
    try {
        console.log(lat, lon, KEY);
        setIsLoadingForecastDaily(true);
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&units=metric&appid=${KEY}`);
        const data = await res.json();
        console.log(data);

        const { list } = data;

        const arr = list.map(el => {

            const { dt, temp, weather } = el;
            const { max, min } = temp;
            const { main, icon } = weather[0];

            const tempMinInFahrenheit = Math.round((min * 9 / 5) + 32);
            const tempMaxInFahrenheit = Math.round((max * 9 / 5) + 32);

            let day = new Date(dt * 1000).getDay();
            let curDay = new Date().getDay();

            if (day === curDay) {
                day = 'Today';
            } else {

                switch (day) {
                    case 0:
                        day = 'Sunday';
                        break;
                    case 1:
                        day = 'Monday';
                        break;
                    case 2:
                        day = 'Tuesday';
                        break;
                    case 3:
                        day = 'Wednesday';
                        break;
                    case 4:
                        day = 'Thursday';
                        break;
                    case 5:
                        day = 'Friday';
                        break;
                    case 6:
                        day = 'Saturday';
                        break;
                    default:
                        console.log('');
                }
            }

            return {
                day,
                C: {
                    max: max.toFixed(0),
                    min: min.toFixed(0)
                },
                F: {
                    max: tempMaxInFahrenheit.toFixed(),
                    min: tempMinInFahrenheit.toFixed()
                },
                main,
                icon
            }

        })

        setCurForeCastDaily(arr);
        setIsLoadingForecastDaily(false);

    }
    catch (err) {
        console.log(err);
    }
    finally {
        console.log('daily successful');
        setIsLoadingForecastDaily(false);
    }


}
