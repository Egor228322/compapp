import { useEffect, useState } from "react"

import UpperBar from "./components/UpperBar";
import DataField from "./Halves/DataField";
import SideBar from "./Halves/SideBar";
import Data from "./components/Data";
import Temp from "./components/Temp";
import ForeCast from "./components/ForeCast";
import Widgets from "./components/Widgets";
import DataMain from "./components/DataMain";

import fetchCity from "./AJAX/curLocationData";
import getForeCast from "./AJAX/curForecastData";


const KEY = '94db76b31b0a5fae229f081992ccef80';

function App() {

  const [query, setQuery] = useState('');
  const [curLocationData, setCurLocationData] = useState({});
  const [locationList, setLocationList] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoadingForecast, setIsLoadingForecast] = useState(true);
  const [curForeCast, setCurForeCast] = useState([]);

  useEffect(function () {

    const controller = new AbortController();
    
    async function geoCode() {
      try {
        const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${KEY}`, { signal: controller.signal });
        const data = await res.json();
        setLocationList(data);
        console.log(data);
      }
      catch (err) {
        console.log('Bad request 💥💥💥')
      }
      finally {
        console.log("fetch successful");
      }
    }
    if (!query) return;
    geoCode();

    return function () {
       controller.abort();
      }

  }, [query]);

  useEffect(function () {
    console.log(locationList);
  }, [locationList]);


  

  useEffect(function () {
    navigator.geolocation.getCurrentPosition(function (pos) {
      const { latitude: lat, longitude: lng } = pos.coords;
      fetchCity(lat, lng, setIsLoadingData, setCurLocationData, KEY);
      getForeCast(lat, lng, setIsLoadingForecast, setCurForeCast, KEY);
    }, function () {
      alert('Please turn on your geolocation')
    });
  }, []);

  const PopulateData = () => {
    if (Object.keys(curLocationData).length && curForeCast.length) {
      return <>
        <Temp locationData={curLocationData} />
        <ForeCast forecast={curForeCast} />
        <Widgets />
      </>
    } else {
      return <p>Loading...</p>
    }
  }

  return (
    <div className="global-layout">
      {/* {isLoading ? <p>Loading...</p> : <Test locationData={curLocationData} />} */}
        <SideBar />
        <DataField>
        <UpperBar query={query} setQuery={setQuery} />
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

