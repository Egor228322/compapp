export default async function getForeCast(lat, lng, setIsLoadingForecast, setCurForeCast, KEY) {
        try {
          setIsLoadingForecast(true);
          const res = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lng}&appid=${KEY}&cnt=19&units=metric`);
          const data = await res.json();

          const { list, city: { timezone } } = data;
          const mod = list.map(el => {
            let { dt, main: { temp }, weather } = el;
            let { icon } = weather[0];
            const data = new Date((dt * 1000) + (timezone * 1000));
            const hours = `${data.getHours()}`.padStart(2, '0');
            const min = `${data.getMinutes()}`.padStart(2, '0');
            const time = `${hours}:${min}`;
            return {
              time: time,
              temp: Math.round(temp),
              icon
            }
          });
          
          setCurForeCast(mod);
          setIsLoadingForecast(false);
        }
        catch (err) {
          throw new Error('Something went wrong');
        }
        finally {
          setIsLoadingForecast(false);
        }
      }