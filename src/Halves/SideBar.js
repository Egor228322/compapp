import { useContext } from 'react';
import { ThemeContext } from '../App';


//The sidebar functional component is the first half of the application
//it imports the children components that were passed into it in App.js
function SideBar({ children }) {
  
  //Theme is being destructured
  const { theme } = useContext(ThemeContext);


  //returns a div with the children inside of it
  //Changes background color based on the theme
    return (
      <div className={`sidebar`} style={{ backgroundColor: theme === 'dark' ? 'var(--main-backgroundColor-dark)': 'var(--main-backgroundColor)'}}>
          {children}
        </div>
    )
}

export default SideBar
