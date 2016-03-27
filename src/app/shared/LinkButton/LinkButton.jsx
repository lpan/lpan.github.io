import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import DrawnButton from '../DrawnButton/DrawnButton';

const linkStyle = {
  textDecoration: 'none',
  color: 'black',
  fontSize: '1.5em',
};

function LinkButton(props) {
  return (
    <Link style={linkStyle} to={props.link}>
      <DrawnButton text={props.text} />
    </Link>
  );
}

LinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default LinkButton;
