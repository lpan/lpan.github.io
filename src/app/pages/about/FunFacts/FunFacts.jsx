import React from 'react';
import BackArrow from '../shared/BackArrow';

const animateStyle = {
  position: 'absolute',
  width: '100%',
};

function FunFacts() {
  return (
    <div style={animateStyle}>
      <BackArrow />
      <p>Coming Soon</p>
    </div>
  );
}

export default FunFacts;
