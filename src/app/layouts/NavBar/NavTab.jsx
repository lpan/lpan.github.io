import React, { PropTypes } from 'react';
import Radium from 'radium';

const tabStyle = {
  display: 'inline-block',
  marginRight: '1.2em',
  cursor: 'pointer',
  ':hover': {
    textDecoration: 'underline',
  },
};


function NavTab(props) {
  return (
    <li style={tabStyle}>{props.name}</li>
  );
}

NavTab.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Radium(NavTab);
