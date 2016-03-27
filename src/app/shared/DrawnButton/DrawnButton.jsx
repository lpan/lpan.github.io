import React, { PropTypes } from 'react';

function DrawnButton(props) {
  return (
    <div className="hand-drawn-button">
      {props.text}
    </div>
  );
}

DrawnButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default DrawnButton;
