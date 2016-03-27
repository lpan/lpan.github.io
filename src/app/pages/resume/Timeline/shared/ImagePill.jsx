import React, { PropTypes } from 'react';

const imgStyle = {
  marginRight: '1em',
  height: '1em',
  width: '1em',
};

function ImagePill(props) {
  return (
    <div className="row middle-xs" style={{ marginTop: '0.5em' }}>
      <img style={imgStyle} src={`/icons/resume/${props.name}.png`} />
      {props.children}
    </div>
  );
}

ImagePill.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default ImagePill;
