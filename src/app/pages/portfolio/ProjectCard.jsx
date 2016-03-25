import React, { PropTypes } from 'react';

function ProjectCard(props) {
  return (
    <div>
      <h3>{props.project.name}</h3>
      <p>{props.project.date}</p>
      <p>{props.project.text}</p>
      <p><a href={props.project.link}>Try it out</a></p>
      <p><a href={props.project.github}>View source</a></p>
      {props.project.tech.map((tag, i) => <p key={i}>{tag}</p>)}
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    tech: PropTypes.arrayOf(PropTypes.string).isRequired,
    link: PropTypes.string,
    github: PropTypes.string,
  }).isRequired,
};

export default ProjectCard;
