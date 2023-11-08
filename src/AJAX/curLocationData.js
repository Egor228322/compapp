export default async function fetchCity(lat, lng, setIsLoadingData, setCurLocationData, KEY) {
        try {
          setIsLoadingData(true);
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${KEY}&units=metric`);
          const data = await res.json();
            
          const {
               main: {
                 temp,
                 feels_like,
                 temp_min,
                 temp_max,
            },
            weather,
            dt,
            timezone,
            name,
            coords
          } = data;
              
          const milliSecondsDt = dt * 1000;
          const milliSecondsTime = timezone * 1000;

          const tempInFahrenheit = Math.round((temp * 9 / 5) + 32);
          const feelsLikeInFahrenheit = Math.round((feels_like * 9 / 5) + 32);
          const tempMinInFahrenheit = Math.round((temp_min * 9 / 5) + 32);
          const tempMaxInFahrenheit = Math.round((temp_max * 9 / 5) + 32);
              
          const destructuredData = {
            C: {
              temp: Math.round(temp),
              feelsLike: Math.round(feels_like),
              tempMin: Math.round(temp_min),
              tempMax: Math.round(temp_max)
            },
            F: {
              temp: tempInFahrenheit,
              feelsLike: feelsLikeInFahrenheit,
              tempMin: tempMinInFahrenheit,
              tempMax: tempMaxInFahrenheit,
            },
            weather,
            dt: milliSecondsDt,
            timezone: milliSecondsTime,
            name,
            coords
          };
      
          setCurLocationData(destructuredData);
          setIsLoadingData(false);
          
        }
        catch (err) {
          console.log(err);
        }
        finally {
          console.log('fetch successful');
          setIsLoadingData(false);
        }
      }