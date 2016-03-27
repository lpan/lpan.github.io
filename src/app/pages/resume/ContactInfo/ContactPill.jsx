import React, { PropTypes } from 'react';
import info from '../../../../text/personalInfo';

const imgStyle = {
  marginRight: '1em',
};

function ContactPill(props) {
  return (
    <div className="row" style={{ marginTop: '0.5em' }}>
      <img style={imgStyle} src={`/icons/resume/${props.name}.png`} />
      {info[props.name]}
    </div>
  );
}

ContactPill.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ContactPill;
