import React from 'react';
import Skill from './Skill';
import { experienced, comfortable } from './skillSum';

function Summary() {
  return (
    <div>
      <Skill skills={experienced} name="Experienced With" />
      <Skill skills={comfortable} name="Comfortable With" />
    </div>
  );
}

export default Summary;
