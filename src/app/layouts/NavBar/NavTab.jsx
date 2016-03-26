import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import Radium from 'radium';

const linkStyle = {
  display: 'inline-block',
  marginRight: '1.2em',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'black',
};

const hoverStyle = {
  ':hover': {
    borderBottom: 'solid 0.2em #4d4d00',
  },
};

function filter(name) {
  return name === 'Home' ? '' : name;
}

function NavTab(props) {
  return (
    <IndexLink
      activeStyle={{ borderBottom: 'solid 0.2em #4d4d00' }}
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
