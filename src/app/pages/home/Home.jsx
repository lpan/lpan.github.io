import React from 'react';
import Radium from 'radium';
import FitText from 'react-fittext';

const titleStyle = {
  textAlign: 'center',
  margin: '1em 0 0 0',
  '@media (max-width: 768px) and (orientation:portrait)': {
    margin: '4.5em 0 0 0',
  },
};

function Home() {
  return (
    <div>
      <FitText>
        <p style={titleStyle}>Hi, I am Lawrence</p>
      </FitText>
      <FitText compressor={5}>
        <p style={titleStyle}>
          I am a Programmer, Problem Solver, and Entrepreneur studying at Marianopolis College
        </p>
      </FitText>
    </div>
  );
}

export default Radium(Home);
