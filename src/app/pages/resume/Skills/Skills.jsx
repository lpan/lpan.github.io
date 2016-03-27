import React from 'react';
import SkillList from './SkillList';
import { expert, experienced } from '../../../../text/skills';

function Skills() {
  return (
    <div>
      <SkillList skills={expert} name="Demonstrated Expertise With" />
      <SkillList skills={experienced} name="Experienced With" />
    </div>
  );
}

export default Skills;
