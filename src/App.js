import { useEffect, useState } from "react"

import UpperBar from "./components/UpperBar";
import DataField from "./Halves/DataField";
import SideBar from "./Halves/SideBar";
import FavHisButton from "./components/FavHisMenu";
import History from './components/History';
import Data from "./components/Data";
import Temp from "./components/Temp";
import ForeCast from "./components/ForeCast";
import Widgets from "./components/Widgets";
import DataMain from "./components/DataMain";

import fetchCity from "./AJAX/curLocationData";
import getForeCast from "./AJAX/curForecastData";
import SearchBar from "./components/SearchBar";
import Mode from "./components/Mode";
import WidgetsMenu from "./components/WidgetsMenu";
import geoCode from "./AJAX/locationList";
import checkHistory from "./Helpers/checkHistory";

const KEY = '94db76b31b0a5fae229f081992ccef80';

function App() {

  const [query, setQuery] = useState('');
  const [curLocationData, setCurLocationData] = useState({});
  const [locationList, setLocationList] = useState([]);
  const [locationData, setLocationData] = useState({});
  const [history, setHistory] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoadingForecast, setIsLoadingForecast] = useState(true);
  const [curForeCast, setCurForeCast] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    if (!query.length) {
      setLocationList([]);
    } else {
      geoCode(setLocationList, setIsLoadingList, controller, query, KEY);
    }

    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude: lat, longitude: lng } = pos.coords;
        fetchCity(lat, lng, setIsLoadingData, setCurLocationData, KEY);
        getForeCast(lat, lng, setIsLoadingForecast, setCurForeCast, KEY);
      } catch (error) {
        alert('Please turn on your geolocation');
      }
    };

    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    if (!query.length
        && !Object.keys(locationData).length) return;

    const { lat, lng, name } = locationData;
    fetchCity(lat, lng, setIsLoadingData, setCurLocationData, KEY, name, locationData);
    getForeCast(lat, lng, setIsLoadingForecast, setCurForeCast, KEY);
    setQuery('');
  }, [locationData]);

  useEffect(function () {
    if (!query.length
      && !Object.keys(locationData).length) return;
    const { coord: { lat, lon }, name, id } = curLocationData;
    console.log(curLocationData)
    
    if (!checkHistory(id, history)) return;

    const his = { lat, lon, name, id };
    setHistory(history => [his, ...history]);

  }, [curLocationData]);

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
        <SideBar>
          <FavHisButton />
          <History history={history} setLocationData={setLocationData}/>
        </SideBar>
        <DataField>
        <UpperBar>
          <SearchBar
            query={query}
            setQuery={setQuery}
            locationList={locationList}
            setLocationData={setLocationData} />
          <Mode />
          <WidgetsMenu />
        </UpperBar>
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

