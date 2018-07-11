import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{max: 85}}
        style={{height: 150, width: 150}}
      >
        <div className="Tilt-inner">
          <img
            style={{paddingTop: '20px', height: '120px'}}
            src={brain}
            alt="Logo"
          />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
