import React from 'react';
import { Link } from 'react-router';

function BackArrow() {
  return (
    <Link to="/About">
      <img src="/icons/arrow.png" />
    </Link>
  );
}

export default BackArrow;
