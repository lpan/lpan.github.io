import React, { PropTypes } from 'react';

function TextTitle(props) {
  let margin;

  if (props.margin === 'no') {
    margin = '0 0 0 0';
  } else if (props.margin === 'small') {
    margin = '0.5em 0 0.5em 0';
  } else {
    margin = '1em 0 1em 0';
  }

  const style = {
    fontWeight: props.bold ? 'bold' : 'normal',
    fontSize: props.size,
    margin,
  };

  return (
    <p style={style}>{props.title}</p>
  );
}

TextTitle.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  bold: PropTypes.bool,
  margin: PropTypes.string.isRequired,
};

export default TextTitle;
