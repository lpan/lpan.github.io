import React from 'react';
import ContactInfo from './ContactInfo/ContactInfo';
import Summary from './Summary/Summary';

const animateStyle = {
  position: 'absolute',
  width: '100%',
};

function Resume() {
  return (
    <div style={animateStyle}>
      <div className="row">
        <div className="col-md-4 col-xs-10" style={{ paddingLeft: '2em' }}>
          <ContactInfo />
          <Summary />
        </div>
      </div>
    </div>
  );
}

export default Resume;
