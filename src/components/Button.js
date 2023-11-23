import { useState } from "react"

export default function Button({open, setOpen}) {


    return (
        <div className={`btn-container ${open}`}>
            <span className="slider"></span>
            <div 
                className={`btn btn-left ${open === 'fav' ? 'active' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => setOpen('fav')}>
                    <span className={`text ${open === 'fav' ? 'white-text' : ''}`}>Fav</span>
            </div>
            <div 
                className={`btn btn-right ${open === 'his' ? 'active' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => setOpen('his')}>
                    <span className={`text ${open === 'his' ? 'white-text' : ''}`}>His</span>
            </div>
        </div>
    )
}