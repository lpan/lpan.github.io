import React, { PropTypes } from 'react';
import TextTitle from '../../shared/TextTitle';
import ImagePill from '../../shared/ImagePill';

function Experience(props) {
  return (
    <div style={{ marginBottom: '2em' }}>
      <div className="row between-xs middle-xs">
        <div>
          <TextTitle
            bold
            title={props.job.company}
            size="1.3em"
            margin="small"
          />
          <TextTitle
            title={props.job.title}
            size="1em"
            margin="small"
          />
        </div>
        <div>
          <ImagePill name="time">
            <TextTitle
              title={props.job.time}
              size="1em"
              margin="no"
            />
          </ImagePill>
          <ImagePill name="location">
            <TextTitle
              title={props.job.location}
              size="1em"
              margin="no"
            />
          </ImagePill>
        </div>
      </div>
      <ul>
        {props.job.roles.map((role, i) => <li key={i}>{role}</li>)}
      </ul>
    </div>
  );
}

Experience.propTypes = {
  job: PropTypes.shape({
    company: PropTypes.string,
    title: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Experience;
