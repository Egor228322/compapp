//import hooks from react
import { createContext, useEffect, useState } from "react"

//import all the neccessary components that are rendered in the App component directly
import UpperBar from "./components/UpperBar";
import DataField from "./Halves/DataField";
import SideBar from "./Halves/SideBar";
import FavHisButton from "./components/FavHisMenu";
import History from './components/History';
import Data from "./components/Data";
import Temp from "./components/Temp";
import ForeCast from "./components/ForeCast";
import DataMain from "./components/DataMain";
import Extras from "./components/Extras";
import Celestials from "./components/Celestials";
import SearchBar from "./components/SearchBar";
import Favorites from "./components/Favorites";
import Loader from "./components/Loader";

//import all the additional AJAX, and helper functions
import fetchCity from "./AJAX/curLocationData";
import getForeCast from "./AJAX/curForecastData";
import checkID from "./Helpers/checkID";
import updateHistory from "./Helpers/updateHistory";
import updateFavorites from "./Helpers/updateFavorites";
import ForeCastDaily from "./components/ForeCastDaily";
import getForeCastDaily from "./AJAX/curForeCastDaily";

//API key, pls don't use for malicious intent, cuz I'll find you 
const KEY = '94db76b31b0a5fae229f081992ccef80';

//This is a global Context that dispacthes state across components where it is needed
const ThemeContext = createContext();


//The App functional Component
function App() {

  //State for the App functional component
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

  //Effect hook that runs on mount which fetches all data using the user's current location
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

    //When the component unmounts a cleanup function is returned
    //when the component reloads, or is closed and then reopened, history and favorites are saved(doesn't work for some reason)
    return () => {
      localStorage.setItem('history', JSON.stringify(history));
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

  }, []);

  //Function to add and remove favorites 
  function handleFav(data) {

    console.log(data);
    const { lat, lon } = data.coord;
    const { name, id } = data;

    const newEntry = { lat, lon, name, id };

    const unique = checkID(id, favorites);
    if (typeof unique === "number") {
        updateFavorites(id, setFavorites, favorites);
    }
    else if (favorites.length === 10) {
      return;
    } else {
      return setFavorites(() => [newEntry, ...favorites])
    }
  }

  //Effect hook for when the locationData changes to update current location data
  //when the user selects one of the suggestions in the search bar
  //or when the user selects one of the entries from history or favorites
  useEffect(() => {
    if (!Object.keys(locationData).length) return;

    const { lat, lng, name } = locationData;
    fetchCity(lat, lng, setIsLoadingData, setCurLocationData, KEY, name, locationData);
    getForeCastDaily(lat, lng, setCurForeCastDaily, setIsLoadingForecastDaily, KEY);
    getForeCast(lat, lng, setIsLoadingForecast, setCurForeCast, KEY);
  }, [locationData]);

  //This effect runs when the current location changes after the hook above runs
  //It contains all the logic that sets the history whenever the user makes a selection
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

  //Populate data function renders all of the data located in the central data cotnainer
  //Only renders the data if all of the APIs have returned data else, renders a spinner
  const PopulateData = () => {
    if (!isLoadingData && !isLoadingForecast && !isLoadingForecastDaily && Object.keys(curLocationData).length) {
      return <>
        <Temp locationData={curLocationData} handleFav={handleFav} mode={mode} />
        <Extras locationData={curLocationData} mode={mode} />
        <ForeCastDaily forecast={curForeCastDaily} mode={mode} />
        <ForeCast forecast={curForeCast} mode={mode} />
      </>
    } else {
      return <Loader />
    }
  }


  //The main return statement that contains composed functional components
  //All of the functional components are wrapped within the context provider
  //This saves from prop drilling, giving access to specified state within any component that is inside of it
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
        <Data curLocationData={curLocationData}>
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

//The App functional component is exported to be imported in index.js
//The theme Context can be imported by any component that is inside of the provider
export { App, ThemeContext };

