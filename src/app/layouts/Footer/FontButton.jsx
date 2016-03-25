import React, { PropTypes } from 'react';
import Isvg from 'react-inlinesvg';

const linkStyle = {
  marginLeft: '0.5em',
  color: 'black',
  display: 'inline',
};

const svgStyle = {
  display: 'inline',
};

function FontButton(props) {
  return (
    <a style={linkStyle} href={props.link} target="_blank">
      <Isvg style={svgStyle} src={`/icons/${props.name}.svg`} />
    </a>
  );
}

FontButton.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default FontButton;
