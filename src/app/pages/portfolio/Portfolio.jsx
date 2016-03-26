import React from 'react';
import ProjectCard from './ProjectCard';
import projects from './projects';

const animateStyle = {
  position: 'absolute',
  width: '100%',
};

function Portfolio() {
  return (
    <div style={animateStyle}>
      <h1 className="row center-xs">Projects</h1>
      {projects.map((project, i) => <ProjectCard key={i} project={project} />)}
    </div>
  );
}

export default Portfolio;
