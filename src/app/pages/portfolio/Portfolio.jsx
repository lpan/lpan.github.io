import React from 'react';
import ProjectCard from './ProjectCard';
import projects from './projects';

function Portfolio() {
  return (
    <div>
      <h1>Portfolio (I am still working on it)</h1>
      {projects.map((project, i) => <ProjectCard key={i} project={project} />)}
    </div>
  );
}

export default Portfolio;
