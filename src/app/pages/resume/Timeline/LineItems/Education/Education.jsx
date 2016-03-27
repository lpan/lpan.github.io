import React, { PropTypes } from 'react';
import TextTitle from '../../shared/TextTitle';
import ImagePill from '../../shared/ImagePill';

function Education(props) {
  return (
    <div>
      <TextTitle
        margin="small"
        title={props.school.program}
        size="1.3em"
        bold
      />
      <div style={{ marginLeft: '1em' }}>
        <ImagePill name="school">
          <TextTitle
            margin="no"
            title={props.school.school}
            size="1.2em"
          />
        </ImagePill>
        <ImagePill name="time">
          <TextTitle
            margin="no"
            title={props.school.time}
            size="1em"
          />
        </ImagePill>
        <ImagePill name="graduate">
          <TextTitle
            margin="no"
            title={`Expected Graduation: ${props.school.expected}`}
            size="1em"
          />
        </ImagePill>
      </div>
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
