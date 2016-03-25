import React from 'react';
import FitTitle from '../../shared/FitTitle/FitTitle';
import LinkButton from '../../shared/LinkButton/LinkButton';

function About() {
  return (
    <div>
      <FitTitle
        text="Want to Know More About Lawrence?"
        size={1.5}
      />
      <div className="row center-xs">
        <div className="row col-md-8 center-xs around-xs" style={{ marginTop: '2em' }}>
          <LinkButton text="Fun Way" link="/About" />
          <LinkButton text="Boring Way" link="/About" />
        </div>
      </div>
    </div>
  );
}

export default About;
