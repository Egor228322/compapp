import { useReducer, useRef, useState } from "react";

function Celestials() {


    const [rotation, setRotation] = useState(0);
  const [rotated, setRotated] = useState(false);

  const handleClick = () => {
    setRotation(prevRotation => prevRotation + 180);
  };


    return (
    <div className="celestials-container" >
        <div className="celestials" style={{ transform: `rotate(${rotation}deg)` }}>
            <div className="sun" style={{ opacity: rotated ? 0 : 1, transition: 'opacity 1s ease-in-out' }}></div>
            <div className="moon" style={{ opacity: !rotated ? 0 : 1, transition: 'opacity 1s ease-in-out' }}></div>
      </div>
    </div>
  );
}

export default Celestials
