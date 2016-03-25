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
    textDecoration: 'underline',
  },
};

const filter = name => name === 'Home' ? '' : name;

function NavTab(props) {
  return (
    <IndexLink
      activeStyle={{ textDecoration: 'underline' }}
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
