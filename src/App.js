import { useEffect, useRef, useState } from "react"

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
import checkID from "./Helpers/checkID";
import Favorites from "./components/Favorites";
import updateHistory from "./Helpers/updateHistory";
import updateFavorites from "./Helpers/updateFavorites";
import ForeCastDaily from "./components/ForeCastDaily";
import getForeCastDaily from "./AJAX/curForeCastDaily";
import Celestials from "./components/Celestials";
import Loader from "./components/Loader";

const KEY = '94db76b31b0a5fae229f081992ccef80';

function App() {

  const [query, setQuery] = useState('');
  const [curLocationData, setCurLocationData] = useState({});
  const [curForeCast, setCurForeCast] = useState([]);
  const [curForeCastDaily, setCurForeCastDaily] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [locationData, setLocationData] = useState({});
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('history')) || []
  });
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || []
  });
  const [open, setOpen] = useState('fav');
  const [mode, setMode] = useState('c');
  const [theme, setTheme] = useState('light');
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingForecast, setIsLoadingForecast] = useState(false);
  const [isLoadingForecastDaily, setIsLoadingForecastDaily] = useState(false);

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
        getForeCastDaily(lat, lng, setCurForeCastDaily, setIsLoadingForecastDaily, KEY);
        getForeCast(lat, lng, setIsLoadingForecast, setCurForeCast, KEY);
      } catch (error) {
        alert('Please turn on your geolocation');
      }
    };

    fetchCurrentLocation();

    return () => {
      localStorage.setItem('history', JSON.stringify(history));
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

  }, []);

  function handleFav(data) {
    const id = checkID(data.id, favorites);
    console.log(id);
    if (typeof id === "number") {
        updateFavorites(id, setFavorites, favorites);
    }
    else if (favorites.length === 10) {
      return;
    } else {
      return setFavorites(() => [data, ...favorites])
    }

  }

  useEffect(() => {
    if (!Object.keys(locationData).length) return;

    const { lat, lng, name } = locationData;
    fetchCity(lat, lng, setIsLoadingData, setCurLocationData, KEY, name, locationData);
    getForeCastDaily(lat, lng, setCurForeCastDaily, setIsLoadingForecastDaily, KEY);
    getForeCast(lat, lng, setIsLoadingForecast, setCurForeCast, KEY);
    setQuery('');
  }, [locationData]);

  useEffect(function () {
    console.log(curForeCastDaily)
  }, [curForeCastDaily])

  useEffect(function () {
    if (!Object.keys(locationData).length) return;
    const { coord: { lat, lon }, name, id } = curLocationData;

    const his = { lat, lon, name, id };
    const index = checkID(id, history);
    if (history.length === 10) {
      if (typeof index !== 'number') {
        updateHistory(his, setHistory, history, index);
      }
      else {
        return;
      }
    } else {
      if (typeof index !== 'number') {
        setHistory(history => [his, ...history]);
      }
      else {
        updateHistory(his, setHistory, history, index)
      }
    }

  }, [curLocationData]);

  useEffect(function () {
    console.log(history);
  }, [history])

  const PopulateData = () => {
    if (!isLoadingData && !isLoadingForecast && !isLoadingForecastDaily && Object.keys(curLocationData).length) {
      return <>
        <Temp locationData={curLocationData} handleFav={handleFav} mode={mode} />
        <Widgets />
        <ForeCastDaily forecast={curForeCastDaily} mode={mode} />
        <ForeCast forecast={curForeCast} mode={mode} />
      </>
    } else {
      return <Loader />
    }
  }

  return (
    <div className="global-layout">
      <SideBar>
        <FavHisButton open={open} setOpen={setOpen} />
        {open === 'his' ?
          (<History history={history} setLocationData={setLocationData} />) : 
          (<Favorites favorites={favorites} setLocationData={setLocationData} />)
        }
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
          <Celestials />
            <DataMain>
              {PopulateData()}
            </DataMain>
          </Data>
        </DataField>
    </div>
  )
}

export default App

