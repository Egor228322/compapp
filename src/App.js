import { createContext, useEffect, useState } from "react"

import UpperBar from "./components/UpperBar";
import DataField from "./Halves/DataField";
import SideBar from "./Halves/SideBar";
import FavHisButton from "./components/FavHisMenu";
import History from './components/History';
import Data from "./components/Data";
import Temp from "./components/Temp";
import ForeCast from "./components/ForeCast";
import DataMain from "./components/DataMain";
import Extras from "./components/Widgets";

import fetchCity from "./AJAX/curLocationData";
import getForeCast from "./AJAX/curForecastData";
import SearchBar from "./components/SearchBar";
import checkID from "./Helpers/checkID";
import Favorites from "./components/Favorites";
import updateHistory from "./Helpers/updateHistory";
import updateFavorites from "./Helpers/updateFavorites";
import ForeCastDaily from "./components/ForeCastDaily";
import getForeCastDaily from "./AJAX/curForeCastDaily";
import Celestials from "./components/Celestials";
import Loader from "./components/Loader";


const KEY = '94db76b31b0a5fae229f081992ccef80';

const ThemeContext = createContext();

function App() {

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
  const [mode, setMode] = useState('imperial');
  const [theme, setTheme] = useState('light');
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingForecast, setIsLoadingForecast] = useState(false);
  const [isLoadingForecastDaily, setIsLoadingForecastDaily] = useState(false);

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

    console.log(data);
    const { lat, lon } = data.coord;
    const { name, id } = data;
    console.log(name, lat, lon, id);

    const newEntry = { lat, lon, name, id };
    console.log(newEntry);

    const unique = checkID(id, favorites);
    console.log(id);
    if (typeof unique === "number") {
        updateFavorites(id, setFavorites, favorites);
    }
    else if (favorites.length === 10) {
      return;
    } else {
      return setFavorites(() => [newEntry, ...favorites])
    }

  }

  useEffect(() => {
    if (!Object.keys(locationData).length) return;

    const { lat, lng, name } = locationData;
    fetchCity(lat, lng, setIsLoadingData, setCurLocationData, KEY, name, locationData);
    getForeCastDaily(lat, lng, setCurForeCastDaily, setIsLoadingForecastDaily, KEY);
    getForeCast(lat, lng, setIsLoadingForecast, setCurForeCast, KEY);
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
        <Extras />
        <ForeCastDaily forecast={curForeCastDaily} mode={mode} />
        <ForeCast forecast={curForeCast} mode={mode} />
      </>
    } else {
      return <Loader />
    }
  }

  return (
    <ThemeContext.Provider value={{
      theme: theme,
    }}>
    <div className="global-layout">
      <SideBar>
        <FavHisButton open={open} setOpen={setOpen} />
        {open === 'his' ?
          (<History history={history} setLocationData={setLocationData} />) : 
          (<Favorites favorites={favorites} setLocationData={setLocationData} />)
        }
      </SideBar>
        <DataField>
        <UpperBar theme={theme} setTheme={setTheme} mode={mode} setMode={setMode}>
          <SearchBar
            locationData={locationData}
            locationList={locationList}
            setLocationData={setLocationData}
            setLocationList={setLocationList}
            setIsLoadingList={setIsLoadingList}
            KEY={KEY}
            theme={theme}
            setTheme={setTheme} />
        </UpperBar>
        <Data>
          <Celestials theme={theme}/>
            <DataMain>
              {PopulateData()}
            </DataMain>
          </Data>
        </DataField>
      </div>
    </ThemeContext.Provider>
  )
}

export { App, ThemeContext };

