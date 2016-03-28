import React, { PropTypes } from 'react';

function Summary(props) {
  return (
    <ul>
      {props.text.map((point, i) => <li key={i}>{point}</li>)}
    </ul>
  );
}

Summary.propTypes = {
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Summary;
