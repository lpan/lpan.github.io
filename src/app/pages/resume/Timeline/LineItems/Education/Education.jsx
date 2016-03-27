import React, { PropTypes } from 'react';
import TextTitle from '../../shared/TextTitle';

function Education(props) {
  return (
    <div>
      <TextTitle
        margin="small"
        title={props.school.program}
        size="1.3em"
        bold
      />
      <TextTitle
        margin="no"
        title={props.school.school}
        size="1.2em"
      />
      <TextTitle
        margin="no"
        title={props.school.time}
        size="1em"
      />
      <TextTitle
        margin="no"
        title={`Expected Graduation: ${props.school.expected}`}
        size="1em"
      />
      <TextTitle
        margin="no"
        title={props.school.location}
        size="1em"
      />
    </div>
  );
}

Education.propTypes = {
  school: PropTypes.shape({
    school: PropTypes.string,
    location: PropTypes.string,
    program: PropTypes.string,
    time: PropTypes.string,
    expected: PropTypes.string,
  }).isRequired,
};

export default Education;
