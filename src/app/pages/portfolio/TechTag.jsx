import React, { PropTypes } from 'react';
import Radium from 'radium';

const contStyle = {
  borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
  border: 'solid 0.2vw black',
  display: 'inline-block',
  cursor: 'pointer',
  marginRight: '0.5em',
  padding: '0 0.3em 0 0.3em',
  ':hover': {
    backgroundColor: 'black',
    color: 'white',
  },
};

function TechTag(props) {
  return (
    <div style={contStyle}>
      {props.name}
    </div>
  );
}

TechTag.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Radium(TechTag);
