import React from 'react';
import ContactInfo from './ContactInfo/ContactInfo';
import Skills from './Skills/Skills';
import Timeline from './Timeline/Timeline';

const animateStyle = {
  position: 'absolute',
  width: '100%',
  paddingBottom: '2em',
};

function Resume() {
  return (
    <div style={animateStyle}>
      <div className="row between-xs">
        <div className="col-md-3 col-xs-10" style={{ margin: '0 0 2em 2em' }}>
          <ContactInfo />
          <Skills />
        </div>
        <div className="col-md-offset-1 col-md-7 col-xs-10" style={{ margin: '0 0 2em 2em' }}>
          <Timeline />
        </div>
      </div>
    </div>
  );
}

export default Resume;
