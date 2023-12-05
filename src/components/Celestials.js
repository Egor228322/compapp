import { useEffect, useState } from "react";

//This is the centerpiece functional component of the application featuring the sun and the moon
function Celestials({ theme }) {
  //States for the rotation degrees and whether the container has been rotated
  const [rotation, setRotation] = useState(0);
  const [rotated, setRotated] = useState(false);

  //every time the theme changes this effect runs, setting a new state for the rotation degrees and for rotated
  useEffect(() => {
    setRotation((prevRotation) => prevRotation + 180);
    setRotated(!rotated);
  }, [theme]);

  return (
    <div className="celestials-container">
      <div className="celestials" style={{ transform: `rotate(${rotation}deg)` }}>
        <div className="sun" style={{ opacity: rotated ? 1 : 0, transition: 'opacity 1s ease-in-out' }}></div>
        <div className="moon" style={{ opacity: !rotated ? 1 : 0, transition: 'opacity 1s ease-in-out' }}></div>
      </div>
    </div>
  );
}

export default Celestials;