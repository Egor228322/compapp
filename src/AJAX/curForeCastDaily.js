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

            return {
                dt,
                C: {
                    max,
                    min
                },
                F: {
                    maxInF: tempMaxInFahrenheit,
                    minInF: tempMinInFahrenheit
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
