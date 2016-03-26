import React from 'react';
import Radium from 'radium';

import boringText from './bioText.js';
import BackArrow from '../shared/BackArrow';

const animateStyle = {
  position: 'absolute',
  width: '100%',
};

const paraStyle = {
  marginTop: '2em',
  fontSize: '1.5em',
  textAlign: 'justify',
  '@media (max-width: 768px) and (orientation:portrait)': {
    marginTop: '0.5em',
  },
};

function ShortBio() {
  return (
    <div style={animateStyle}>
      <BackArrow />
      <div className="row center-xs" style={paraStyle}>
        <p className="col-md-6 col-xs-8">{boringText}</p>
      </div>
    </div>
  );
}

export default Radium(ShortBio);
