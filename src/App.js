import { useEffect, useState } from "react"
// import Temp from "./components/Temp";
import UpperBar from "./components/UpperBar";
import DataField from "./Halves/DataField";
import SideBar from "./Halves/SideBar";
import Data from "./components/Data";
import Temp from "./components/Temp";
import ForeCast from "./components/ForeCast";
import Widgets from "./components/Widgets";
import DataMain from "./components/DataMain";
/* import DataField from "./Halves/DataField" */
/* import SideBar from "./Halves/SideBar" */
/* import Test from "./components/Test"; */
/* import UpperBar from "./components/UpperBar"; */
/* import Data from "./components/Data"; */


const KEY = '94db76b31b0a5fae229f081992ccef80';

function App() {
  const date = new Date();

  const [query, setQuery] = useState('');
  const [curLocationData, setCurLocationData] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoadingForecast, setIsLoadingForecast] = useState(true);
  const [curForeCast, setCurForeCast] = useState([]);

  async function fetchCity(lat, lng) {
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

  useEffect(function () {
    navigator.geolocation.getCurrentPosition(function (pos) {
      const { latitude: lat, longitude: lng } = pos.coords;
      
      fetchCity(lat, lng);

    }, function () {
      alert('Please turn on your geolocation')
    })

  }, []);

  const PopulateData = () => {
    console.log(curLocationData)
    if (Object.keys(curLocationData).length) {
      console.log("rendering")
      return <>
        <Temp locationData={curLocationData} />
        <ForeCast />
        <Widgets />
      </>
    } else {
      console.log("sdlkfj")
      return <p>Loading...</p>
    }
  }

  // useEffect(function () {
  //   navigator.geolocation.getCurrentPosition(function (pos) {
  //     const { latitude: lat, longitude: lon } = pos.coords;
      
  //     async function fetchCity() {
  //       try {
  //         setIsLoadingData(true);
  //         const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`);
  //         const data = await res.json();
          
            
  //         const {
  //              main: {
  //                temp,
  //                feels_like,
  //                temp_min,
  //                temp_max,
  //              },
  //         } = data;
              
  //         const tempInCelsius = temp - 273.15;
  //         const feelsLikeInCelsius = feels_like - 273.15;
  //         const tempMinInCelsius = temp_min - 273.15;
  //         const tempMaxInCelsius = temp_max - 273.15;
              
  //         const mainInCelsius = {
  //           temp: Math.round(tempInCelsius),
  //           feels_like: Math.round(feelsLikeInCelsius),
  //           temp_min: Math.round(tempMinInCelsius),
  //           temp_max: Math.round(tempMaxInCelsius),
  //         };
      
  //         const updatedData = {
  //           ...data,
  //           main: mainInCelsius,
  //         };
      
  //         setCurLocationData(updatedData);
  //         isLoadingData(false);
          
  //       }
  //       catch (err) {
  //         console.log(err);
  //       }
  //       finally {
  //         console.log('fetch successful');
  //         setIsLoadingData(false);
  //       }
  //     }
  //     fetchCity();

  //   }, function () {
  //     alert('Please turn on your geolocation')
  //   })

  // }, []);

  console.log(curLocationData);
  console.log(curForeCast);

  return (
    <div className="global-layout">
      {/* {isLoading ? <p>Loading...</p> : <Test locationData={curLocationData} />} */}
        <SideBar />
        <DataField>
        <UpperBar />
          <Data>
            <DataMain>
              {PopulateData()}
            </DataMain>
          </Data>
        </DataField>
    </div>
  )
}

export default App

