import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';

import DrawnTag from '../../../shared/DrawnTag/DrawnTag';

const contStyle = {
  border: 'dotted 5px',
  borderRadius: '257px 15px 225px 15px/15px 225px 15px 255px',
  WebkitBorderRadius: '257px 15px 225px 15px/15px 225px 15px 255px',
  MozBorderRadius: '257px 15px 225px 15px/15px 225px 15px 255px',
  textAlign: 'left',
  padding: '0 1em 1em 1em',
  marginBottom: '2em',
};

const linkStyle = {
  color: 'black',
  textDecoration: 'none',
  borderBottom: 'dotted 0.1em black',
};

const imgStyle = {
  height: '1em',
  width: '1em',
  margin: '0.5em 0 0 0.5em',
  cursor: 'pointer',
};

function ProjectCard(props) {
  return (
    <div className="row center-xs">
      <div className="row center-xs col-xs-8">
        <div style={contStyle}>
          <div className="row middle-xs">
            {(() => {
              if (props.project.link) {
                return (
                  <h2>
                    <a style={{ color: 'black' }} href={props.project.link} target="_blank">
                      {props.project.name}
                    </a>
                  </h2>
                );
              } else {
                return (
                  <h2>
                    {props.project.name}
                  </h2>
                );
              }
            })()}
            {(() => {
              if (props.project.active) {
                return (
                  <div>
                    <img data-tip="This project is active" style={imgStyle} src={'/icons/active.png'} />
                    <ReactTooltip place="right" type="light" effect="solid" />
                  </div>
                );
              }
              return '';
            })()}
          </div>
          <p>{props.project.text}</p>
          <p><a style={linkStyle} href={props.project.github} target="_blank">View source</a></p>
          <p>{props.project.date}</p>
          {props.project.tech.map((tag, i) => <DrawnTag key={i} name={tag} />)}
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
    active: PropTypes.bool,
  }).isRequired,
};

export default ProjectCard;
