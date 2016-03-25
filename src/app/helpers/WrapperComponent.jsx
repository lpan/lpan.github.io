import React, { PropTypes } from 'react';
import Radium from 'radium';

function WrapperComponent(props) {
  return (
    <div>
      {React.cloneElement(props.children, {
        radiumConfig: props.radiumConfig,
      })}
    </div>
  );
}

WrapperComponent.propTypes = {
  children: PropTypes.object.isRequired,
  radiumConfig: PropTypes.object,
};

export default Radium(WrapperComponent);
