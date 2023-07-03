import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFlashing(isFlashing => !isFlashing);
    }, 1000); // Change the duration of the flashing here

    return () => clearInterval(intervalId);
  }, []);

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    fontSize: '48px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '8px',
    color: isFlashing ? '#FF6B6B' : '#FFFFFF', // Change the flashing color and default color here
    fontFamily: 'Helvetica Neue, sans-serif', // Change the font family here
    background: '#121212', // Change the background color here
    padding: '16px 0',
  };

  return <h1 style={headerStyle}>NewsTracker</h1>;
};

export default Header;
