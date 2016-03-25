import React from 'react';
import NavTab from './NavTab';

const listStyle = {
  listStyleType: 'none',
  margin: '0',
  marginRight: '1em',
  marginTop: '1em',
  padding: '0',
};

function NavBar() {
  return (
    <div className="row end-xs">
      <ul style={listStyle}>
        <NavTab name="Home" />
        <NavTab name="About" />
        <NavTab name="Portfolio" />
        <NavTab name="Resume" />
      </ul>
    </div>
  );
}

export default NavBar;
