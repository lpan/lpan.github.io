import React from 'react';
import BackArrow from '../shared/BackArrow';

const animateStyle = {
  position: 'absolute',
  width: '100%',
};

function Boring() {
  return (
    <div style={animateStyle}>
      <BackArrow />
    </div>
  );
}

export default Boring;
