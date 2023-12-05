//Import neccessary modules from the react and react-dom/client package
import React from 'react';
import ReactDOM from 'react-dom/client';

//Import all of the CSS files responsible for styling the page.
import './styles/index.css';
import './styles/Data.css'
import './styles/DataField.css'
import './styles/DataMain.css'
import './styles/FavHisButton.css'
import './styles/Favorites.css'
import './styles/ForeCast.css'
import './styles/ForeCastData.css'
import './styles/ForeCastDataList.css'
import './styles/Mode.css'
import './styles/SearchBar.css'
import './styles/SideBar.css'
import './styles/Temp.css'
import './styles/UpperBar.css'
import './styles/Extras.css'
import './styles/Entry.css'
import './styles/ButtonStyles.css'
import './styles/Celestials.css'
import './styles/Spinner.css'
import './styles/Errors.css'
import './styles/Media.css'
import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

