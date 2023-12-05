//An asynchronous function that geocodes the location entrered via latitude and longitude
export default async function geoCode(setLocationList, setIsLoadingList, controller, query, KEY) {
      try {
        setIsLoadingList(true);
        const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${KEY}`, { signal: controller.signal });
        const data = await res.json();

        data.map(el => {
          const { lat, lon, country, state, name } = el;

          //Every suggestion has its own unique set of data
          const updatedData = {
            lat,
            lon,
            country,
            state,
            name
          };

          return updatedData;

        })
        
        setLocationList(data);
        setIsLoadingList(false);
      }
      catch (err) {
        console.log('Bad request 💥💥💥')
      }
      finally {
        setIsLoadingList(false);
      }
    }