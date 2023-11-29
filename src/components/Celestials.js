import { useEffect, useState } from "react";

function Celestials({ theme }) {
  const [rotation, setRotation] = useState(0);
  const [rotated, setRotated] = useState(false);

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