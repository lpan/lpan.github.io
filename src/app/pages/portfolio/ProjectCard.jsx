import React, { PropTypes } from 'react';
import TechTag from './TechTag';

const contStyle = {
  border: 'dotted 5px',
  borderRadius: '257px 15px 225px 15px/15px 225px 15px 255px',
  textAlign: 'left',
  padding: '0 1em 1em 1em',
  marginBottom: '2em',
};

const linkStyle = {
  color: 'black',
  textDecoration: 'none',
  borderBottom: 'dotted 0.1em black',
};

function ProjectCard(props) {
  return (
    <div className="row center-xs">
      <div className="row center-xs col-xs-10">
        <div style={contStyle}>
          <h2><a style={{ color: 'black' }} href={props.project.link} target="_blank">{props.project.name}</a></h2>
          <p>{props.project.text}</p>
          <p><a style={linkStyle} href={props.project.github} target="_blank">View source</a></p>
          <p>{props.project.date}</p>
          {props.project.tech.map((tag, i) => <TechTag key={i} name={tag} />)}
        </div>
      </div>
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
