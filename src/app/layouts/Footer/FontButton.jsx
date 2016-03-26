import React, { PropTypes } from 'react';

const linkStyle = {
  color: 'black',
};

const iconStyle = {
  height: '2em',
  width: '2em',
  marginTop: '0.5em',
};

function FontButton(props) {
  return (
    <a style={linkStyle} href={props.link} target="_blank">
      <img style={iconStyle} src={`/icons/${props.name}.png`} />
    </a>
  );
}

FontButton.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default FontButton;
