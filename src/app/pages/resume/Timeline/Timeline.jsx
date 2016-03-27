import React from 'react';
import LineItem from './LineItems/LineItem';
import resume from './resume';

function Timeline() {
  return (
    <div>
      <LineItem title="Summary" info={resume.summary} />
      <LineItem title="Experience" info={resume.experience} />
      <LineItem title="Education" info={resume.education} />
      <LineItem title="Awards" info={resume.awards} />
    </div>
  );
}

export default Timeline;
