export default async function getForeCast(lat, lng, setIsLoadingForecast, setForeCast, KEY) {
        try {
          setIsLoadingForecast(true);
          const res = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lng}&appid=${KEY}&cnt=19&units=metric`);
          const data = await res.json();

          const { list, city: { timezone } } = data;
          const mod = list.map(el => {
            let { dt, main: { temp }, weather } = el;
            let { icon, description } = weather[0];
            const date = new Date(dt*1000);
            const hours = `${date.getHours()}`.padStart(2, '0');
            const min = `${date.getMinutes()}`.padStart(2, '0');
            const time = `${hours}:${min}`;

            return {
              time: time,
              C: Math.round(temp),
              F: Math.round((temp * 9 / 5) + 32),
              icon,
              description
            }
          });
          
          setForeCast(mod);
          setIsLoadingForecast(false);
        }
        catch (err) {
          throw new Error('Something went wrong');
        }
        finally {
          setIsLoadingForecast(false);
        }
      }