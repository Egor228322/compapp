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

import fetchCity from "./AJAX/curLocationData";
import getForeCast from "./AJAX/curForecastData";


const KEY = '94db76b31b0a5fae229f081992ccef80';

function App() {
  const date = new Date();

  const [query, setQuery] = useState('');
  const [curLocationData, setCurLocationData] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoadingForecast, setIsLoadingForecast] = useState(true);
  const [curForeCast, setCurForeCast] = useState([]);

  

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

