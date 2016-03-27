import React, { PropTypes } from 'react';
import DrawnTag from '../../../shared/DrawnTag/DrawnTag';

function Skill(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      {props.skills.map((skill, i) => <DrawnTag key={i} name={skill} />)}
    </div>
  );
}

Skill.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
};

export default Skill;
