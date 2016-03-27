import React, { PropTypes } from 'react';

function Summary(props) {
  return (
    <div>
      {props.text}
    </div>
  );
}

Summary.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Summary;
