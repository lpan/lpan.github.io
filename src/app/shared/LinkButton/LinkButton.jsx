import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const linkStyle = {
  textDecoration: 'none',
  color: 'black',
  fontSize: '4vw',
};

function LinkButton(props) {
  return (
    <div className="hand-drawn-button">
      <Link style={linkStyle} to={props.link}>
        {props.text}
      </Link>
    </div>
  );
}

LinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default LinkButton;
