import { useEffect, useState } from "react"
import Temp from "./components/Temp";
import UpperBar from "./components/UpperBar";
import DataField from "./Halves/DataField";
import SideBar from "./Halves/SideBar";
import Data from "./components/Data";
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
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingForecast, setIsLoadingForecast] = useState(false);
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
          } = data;
              
          const tempInCelsius = temp - 273.15;
          const feelsLikeInCelsius = feels_like - 273.15;
          const tempMinInCelsius = temp_min - 273.15;
          const tempMaxInCelsius = temp_max - 273.15;
              
          const mainInCelsius = {
            temp: Math.round(tempInCelsius),
            feels_like: Math.round(feelsLikeInCelsius),
            temp_min: Math.round(tempMinInCelsius),
            temp_max: Math.round(tempMaxInCelsius),
          };
      
          const updatedData = {
            ...data,
            main: mainInCelsius,
          };
      
          setCurLocationData(updatedData);
          isLoadingData(false);
          
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


  useEffect(function () {
    navigator.geolocation.getCurrentPosition(function (pos) {
      const { latitude: lat, longitude: lng } = pos.coords;
      
      fetchCity(lat, lng);

    }, function () {
      alert('Please turn on your geolocation')
    })

  }, []);

  useEffect(function () {
    navigator.geolocation.getCurrentPosition(function (pos) {
      const { latitude: lat, longitude: lon } = pos.coords;
      
      async function fetchCity() {
        try {
          setIsLoadingData(true);
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`);
          const data = await res.json();
          
            
          const {
               main: {
                 temp,
                 feels_like,
                 temp_min,
                 temp_max,
               },
          } = data;
              
          const tempInCelsius = temp - 273.15;
          const feelsLikeInCelsius = feels_like - 273.15;
          const tempMinInCelsius = temp_min - 273.15;
          const tempMaxInCelsius = temp_max - 273.15;
              
          const mainInCelsius = {
            temp: Math.round(tempInCelsius),
            feels_like: Math.round(feelsLikeInCelsius),
            temp_min: Math.round(tempMinInCelsius),
            temp_max: Math.round(tempMaxInCelsius),
          };
      
          const updatedData = {
            ...data,
            main: mainInCelsius,
          };
      
          setCurLocationData(updatedData);
          isLoadingData(false);
          
        }
        catch (err) {
          console.log(err);
        }
        finally {
          console.log('fetch successful');
          setIsLoadingData(false);
        }
      }
      fetchCity();

    }, function () {
      alert('Please turn on your geolocation')
    })

  }, []);

  console.log(curLocationData);
  console.log(curForeCast);


  return (
    <div className="global-layout">
      {/* {isLoading ? <p>Loading...</p> : <Test locationData={curLocationData} />} */}
        {/* <SideBar />
        <DataField>
          <UpperBar />
          {isLoadingData && isLoadingForecast ? <p>Loading...</p> : <Data locationData={curLocationData} />}
        </DataField> */}
    </div>
  )
}

export default App

