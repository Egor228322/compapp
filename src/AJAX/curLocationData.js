export default async function fetchCity(lat, lng, setIsLoadingData, setCurLocationData, KEY) {
        try {
          setIsLoadingData(true);
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${KEY}`);
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
              
          const tempInCelsius = Math.round(temp - 273.15);
          const feelsLikeInCelsius = Math.round(feels_like - 273.15);
          const tempMinInCelsius = Math.round(temp_min - 273.15);
          const tempMaxInCelsius = Math.round(temp_max - 273.15);
          const milliSecondsDt = dt * 1000;
          const milliSecondsTime = timezone * 1000;

          const tempInFahrenheit = Math.round((tempInCelsius * 9 / 5) + 32);
          const feelsLikeInFahrenheit = Math.round((feelsLikeInCelsius * 9 / 5) + 32);
          const tempMinInFahrenheit = Math.round((tempMinInCelsius * 9 / 5) + 32);
          const tempMaxInFahrenheit = Math.round((tempMaxInCelsius * 9 / 5) + 32);
              
          const destructuredData = {
            C: {
              temp: Math.round(tempInCelsius),
              feelsLike: Math.round(feelsLikeInCelsius),
              tempMin: Math.round(tempMinInCelsius),
              tempMax: Math.round(tempMaxInCelsius),
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