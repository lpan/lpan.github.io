import React from 'react';
import Radium from 'radium';

import bio from '../../../../text/bioText';
import BackArrow from '../shared/BackArrow';

const animateStyle = {
  position: 'absolute',
  width: '100%',
};

const paraStyle = {
  fontSize: '1.5em',
  marginTop: '2em',
  textAlign: 'justify',
  '@media (max-width: 1400px)': {
    marginTop: '0em',
  },
  '@media (max-width: 768px) and (orientation:portrait)': {
    marginTop: '0.5em',
  },
};

function ShortBio() {
  return (
    <div style={animateStyle}>
      <BackArrow />
      <div className="row center-xs" style={paraStyle}>
        <p className="col-md-6 col-xs-8">{bio}</p>
      </div>
    </div>
  );
}

export default Radium(ShortBio);
