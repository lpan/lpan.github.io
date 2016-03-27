import React, { PropTypes } from 'react';
import TextTitle from '../../shared/TextTitle';

function Experience(props) {
  return (
    <div>
      <div className="row middle-xs between-xs">
        <TextTitle
          bold
          title={props.job.company}
          size="1.3em"
          margin="small"
        />
        <TextTitle
          title={props.job.time}
          size="1em"
        />
      </div>
      <div className="row middle-xs between-xs">
        <TextTitle
          title={props.job.title}
          size="1em"
          margin="no"
        />
        <TextTitle
          title={props.job.location}
          size="1em"
          margin="no"
        />
      </div>
      <ul style={{ marginTop: '1.5em' }}>
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
