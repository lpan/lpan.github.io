import React from 'react';
import FitTitle from '../../shared/FitTitle/FitTitle';

const animateStyle = {
  position: 'absolute',
  width: '100%',
};

function Home() {
  return (
    <div style={animateStyle}>
      <FitTitle
        text="Hi, I am Lawrence"
        fontFamily="Cabin Sketch"
      />
      <FitTitle
        text="I am a Programmer, Problem Solver, and Entrepreneur studying at Marianopolis College"
        size={4.2}
        fontFamily="Patrick Hand SC"
      />
    </div>
  );
}

export default Home;
