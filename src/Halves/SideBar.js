import { useContext } from 'react';
import { ThemeContext } from '../App';

function SideBar({ children }) {
  
  const { theme } = useContext(ThemeContext);
  console.log(theme);

    return (
      <div className={`sidebar`} style={{ backgroundColor: theme === 'dark' ? 'var(--main-backgroundColor-dark)': 'var(--main-backgroundColor)'}}>
          {children}
        </div>
    )
}

export default SideBar
