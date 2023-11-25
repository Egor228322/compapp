import { useReducer, useRef, useState } from "react";

function Test() {


    const [rotation, setRotation] = useState(0);
    const [theme, setTheme] = useState

  const handleClick = () => {
    setRotation(prevRotation => prevRotation + 180);
  };


    return (
        <>
            <div><button onClick={handleClick}>Click</button></div>
    <div className="celestials-container" >
      <div className="celestials" style={{ transform: `rotate(${rotation}deg)` }}>
        <div className="sun"></div>
        <div className="moon"></div>
      </div>
            </div>
        </>
  );
}

export default Test
