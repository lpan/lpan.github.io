import React, { PropTypes } from 'react';

const animateStyle = {
  position: 'absolute',
  width: '100%',
};

function AboutIndex(props) {
  return (
    <div style={animateStyle}>
      {props.children}
    </div>
  );
}

AboutIndex.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default AboutIndex;
