import React from 'react';
import SkillList from './SkillList';
import { experienced, comfortable } from './skillSum';

function Skills() {
  return (
    <div>
      <SkillList skills={experienced} name="Experienced With" />
      <SkillList skills={comfortable} name="Comfortable With" />
    </div>
  );
}

export default Skills;
