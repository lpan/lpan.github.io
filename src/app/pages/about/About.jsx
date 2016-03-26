import React from 'react';
import FitTitle from '../../shared/FitTitle/FitTitle';
import LinkButton from '../../shared/LinkButton/LinkButton';
import BackArrow from './BackArrow';

const animateStyle = {
  position: 'absolute',
  width: '100%',
};

function About() {
  return (
    <div style={animateStyle}>
      <FitTitle
        text="Want to Know More About Lawrence?"
        size={1.5}
        fontFamily="Cabin Sketch"
      />
      <div className="row center-xs">
        <div className="row col-md-8 col-xs-10 center-xs around-xs" style={{ marginTop: '2em' }}>
          <LinkButton text="Fun Way" link="/About" />
          <LinkButton text="Boring Way" link="/About" />
        </div>
      </div>
    </div>
  );
}

export default About;
