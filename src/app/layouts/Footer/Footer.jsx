import React from 'react';
import FontButton from './FontButton';

const contStyle = {
  listStyleType: 'none',
  position: 'fixed',
  right: '0',
  bottom: '0',
  marginRight: '1.5em',
};

function Footer() {
  return (
    <ul style={contStyle}>
      <li><FontButton name="github" link="https://github.com/lorix-lpan" /></li>
      <li><FontButton name="twitter" link="https://twitter.com/LorixLpan" /></li>
      <li><FontButton name="linkedin" link="https://www.linkedin.com/in/lawrence-pan-24361a10b" /></li>
    </ul>
  );
}

export default Footer;
