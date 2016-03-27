import React, { PropTypes } from 'react';
import TextTitle from '../../shared/TextTitle';

function Award(props) {
  return (
    <div>
      <div className="row">
        <TextTitle
          title={props.award.awards}
          margin="small"
          size="1.3em"
          bold
        />
      </div>
      <div className="row">
        <TextTitle
          title={props.award.contest}
          margin="no"
          size="1em"
        />
      </div>
      <div className="row">
        <TextTitle
          title={props.award.time}
          margin="no"
          size="1em"
        />
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
