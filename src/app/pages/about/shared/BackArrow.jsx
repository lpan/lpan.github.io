import React from 'react';
import { Link } from 'react-router';

const contStyle = {
  position: 'absolute',
  top: '-1em',
  left: '1em',
};

const imgStyle = {
  height: '2em',
  width: '2em',
};

function BackArrow() {
  return (
    <div style={contStyle}>
      <Link to="/About">
        <img style={imgStyle} src="/icons/arrow.png" />
      </Link>
    </div>
  );
}

export default BackArrow;
