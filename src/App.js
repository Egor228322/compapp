import { useEffect, useState } from "react"
import DataField from "./Halves/DataField"
import SideBar from "./Halves/SideBar"


const KEY = '94db76b31b0a5fae229f081992ccef80';

function App() {

  const [query, setQuery] = useState('');
  const [curLocationData, setCurLocationData] = useState({});
  const [curForeCast, setCurForeCast] = useState();

  useEffect(function () {
    navigator.geolocation.getCurrentPosition(function (pos) {
      const { latitude: lat, longitude: lon } = pos.coords;
      
      async function fetchCity() {
        try {
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${KEY}`);
          const data = await res.json();
          setCurLocationData(data);
          console.log(data);
        }
        catch (err) {
          console.log(err);
        }
        finally {
          console.log('fetching successful!');
        }
      }
      fetchCity();

    }, function () {
      alert('Please turn on your geolocation')
    })

  }, []);


  /* useEffect(function () {
    async function fetchCities() {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&appid=${KEY}`);
        const data = await res.json();
        setLocation(data);
      }
      catch (err) {
        console.log(err);
      }
      finally {

      }
    }
  }, []) */

  return (
    <div className="global-layout">
      <SideBar />
      <DataField />
    </div>
  )
}

export default App

