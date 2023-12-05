import { useContext } from "react";
import { ThemeContext } from "../App"

export default function Button({ role, data1, data2, onClick }) {

    const { theme } = useContext(ThemeContext);

    return (
        <div
            className={`btn-container ${role}`}
            style={{
                backgroundColor: theme === 'dark' ? 'var(--btn-color-dark)' : 'var(--data-secondary)',
            }}>
            <span className="slider" style={{ backgroundColor: theme === 'dark' ? 'var(--btn-slider-color-dark)' : 'var(--btn-slider-color)' }}></span>
            {role === 'fav' || role === 'his' ?
             (<><div 
                className={`btn btn-left ${role === 'fav' ? 'active' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => onClick('fav')}>
                    <span className={`text ${role === 'fav' ? 'white-text' : ''}`}>{data1}</span>
            </div>
            <div 
                className={`btn btn-right ${role === 'his' ? 'active' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => onClick('his')}>
                        <span className={`text ${role === 'his' ? 'white-text' : ''}`}>{data2}</span>
                    </div>
                </>) : role === 'light' || role === 'dark' ? 
                (<><div 
                className={`btn btn-left ${role === 'light' ? 'active' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => onClick('light')}>
                    <span className={`text ${role === 'light' ? 'white-text' : ''}`}>{data1}</span>
            </div>
            <div 
                className={`btn btn-right ${role === 'dark' ? 'active' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => onClick('dark')}>
                        <span className={`text ${role === 'dark' ? 'white-text' : ''}`}>{data2}</span>
                        </div>
                    </>)
                    : (<><div 
                className={`btn btn-left ${role === 'imperial' ? 'active' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => onClick('imperial')}>
                    <span className={`text ${role === 'imperial' ? 'white-text' : ''}`}>{data1}</span>
            </div>
            <div 
                className={`btn btn-right ${role === 'metric' ? 'active' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => onClick('metric')}>
                        <span className={`text ${role === 'metric' ? 'white-text' : ''}`}>{data2}</span>
                        </div>
                    </>)
                 }
            
        </div>
    )
}