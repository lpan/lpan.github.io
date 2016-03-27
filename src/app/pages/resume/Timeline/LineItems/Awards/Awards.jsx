import React, { PropTypes } from 'react';
import TextTitle from '../../shared/TextTitle';
import ImagePill from '../../shared/ImagePill';

function Award(props) {
  return (
    <div>
      <TextTitle
        title={props.award.awards}
        margin="small"
        size="1.3em"
        bold
      />
      <div style={{ marginLeft: '1em' }}>
        <ImagePill name="contest">
          <TextTitle
            title={props.award.contest}
            margin="no"
            size="1em"
          />
        </ImagePill>
        <ImagePill name="time">
          <TextTitle
            title={props.award.time}
            margin="no"
            size="1em"
          />
        </ImagePill>
      </div>
    </div>
  );
}

Award.propTypes = {
  award: PropTypes.shape({
    contest: PropTypes.string,
    awards: PropTypes.string,
    time: PropTypes.string,
  }).isRequired,
};

export default Award;
