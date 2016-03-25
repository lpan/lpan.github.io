import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';

const tabStyle = {
  display: 'inline-block',
  marginRight: '1.2em',
  cursor: 'pointer',
  ':hover': {
    textDecoration: 'underline',
  },
};

const linkStyle = {
  color: 'black',
};

function NavTab(props) {
  return (
    <Link style={linkStyle} to={`/${props.name}`}>
      <li style={tabStyle}>{props.name}</li>
    </Link>
  );
}

NavTab.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Radium(NavTab);
