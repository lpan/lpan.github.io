import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const linkStyle = {
  textDecoration: 'none',
  color: 'black',
  fontSize: '4vw',
};

function LinkButton(props) {
  return (
    <Link style={linkStyle} to={props.link}>
      <div className="hand-drawn-button">
        {props.text}
      </div>
    </Link>
  );
}

LinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default LinkButton;
