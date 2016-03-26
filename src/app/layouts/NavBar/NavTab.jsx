import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import Radium from 'radium';

const linkStyle = {
  display: 'inline-block',
  marginRight: '1.2em',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'black',
  fontFamily: 'Patrick Hand SC',
};

const hoverStyle = {
  ':hover': {
    borderBottom: 'dotted 0.1em black',
  },
};

function filter(name) {
  return name === 'Home' ? '' : name;
}

function NavTab(props) {
  return (
    <IndexLink
      activeStyle={{ borderBottom: 'dotted 0.1em black' }}
      style={linkStyle}
      to={`/${filter(props.name)}`}
    >
      <span style={hoverStyle}>{props.name}</span>
    </IndexLink>
  );
}

NavTab.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Radium(NavTab);
