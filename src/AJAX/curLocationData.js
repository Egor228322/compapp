//This is a pure async function that fetches data for the current location.
//In additiion it formats the json into objects with only the properties which are needed
export default async function fetchCity(lat, lng, setIsLoadingData, setLocationData, KEY, customName = '', locationData = '') {
      try {
        console.log(lat, lng);
          setIsLoadingData(true);
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${KEY}&units=metric`);
          const data = await res.json();
          console.log(data);
            
          let {
               main: {
                 temp,
                 feels_like,
                 temp_min,
                 temp_max,
                 humidity,
                 pressure
            },
            wind: {
              speed
            },
            weather,
            visibility,
            dt,
            timezone,
            name,
            id,
            coord
          } = data;
              
          const milliSecondsDt = dt * 1000;
          const milliSecondsTime = timezone * 1000;
          speed = speed * (3600 / 1000);
          pressure = pressure * 100;
          
          const tempInFahrenheit = Math.round((temp * 9 / 5) + 32);
          const feelsLikeInFahrenheit = Math.round((feels_like * 9 / 5) + 32);
          const tempMinInFahrenheit = Math.round((temp_min * 9 / 5) + 32);
          const tempMaxInFahrenheit = Math.round((temp_max * 9 / 5) + 32);
        

          if (Object.keys(locationData).length) {
            console.log(customName);
            name = customName;
          }
            
        const destructuredData = {
            //Destructured data has two sets of data with the metric and imperial units
            M: {
              temp: Math.round(temp),
              feelsLike: Math.round(feels_like),
              tempMin: Math.round(temp_min),
              tempMax: Math.round(temp_max),
              speed: speed.toFixed(2),
              pressure: pressure.toFixed(),
              visibility: (visibility / 1000)
            },
            I: {
              temp: tempInFahrenheit,
              feelsLike: feelsLikeInFahrenheit,
              tempMin: tempMinInFahrenheit,
              tempMax: tempMaxInFahrenheit,
              speed: (speed / 1.6).toFixed(2),
              pressure: (pressure * 0.00014503773801).toFixed(),
              visibility: ((visibility / 1000) / 1.6).toFixed()
            },
            humidity,
            weather,
            dt: milliSecondsDt,
            timezone: milliSecondsTime,
            name,
            id,
            coord
          };
      
          setLocationData(destructuredData);
          setIsLoadingData(false);
        }
        catch (err) {
          throw new Error('bad request')
        }
        finally {
          setIsLoadingData(false);
        }
      }