import React from 'react';
import FontButton from './FontButton';

const contStyle = {
  position: 'absolute',
  bottom: '0',
  right: '2em',
  paddingBottom: '0.5em',
};

function Footer() {
  return (
    <div style={contStyle}>
      <FontButton name="github" link="https://github.com/lorix-lpan" />
      <FontButton name="twitter" link="https://twitter.com/LorixLpan" />
      <FontButton name="linkedin" link="https://www.linkedin.com/in/lawrence-pan-24361a10b" />
    </div>
  );
}

export default Footer;
