import React, { PropTypes } from 'react';
import Radium from 'radium';
import FitText from 'react-fittext';

const titleStyle = {
  textAlign: 'center',
  margin: '1em 0 0 0',
  '@media (max-width: 768px) and (orientation:portrait)': {
    margin: '4.5em 0 0 0',
  },
};

function FitTitle(props) {
  return (
    <FitText compressor={props.size}>
      <p style={titleStyle}>{props.text}</p>
    </FitText>
  );
}

FitTitle.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default Radium(FitTitle);
