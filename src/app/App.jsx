import React, { PropTypes } from 'react';
import TransitionGroup from 'react-addons-css-transition-group';
import { StyleRoot } from 'radium';

import NavBar from './layouts/NavBar/NavBar';
import Footer from './layouts/Footer/Footer';

// footer height
const spaceStyle = {
  paddingBottom: '3em',
};

function App(props) {
  return (
    <StyleRoot>
      <NavBar />
      <TransitionGroup
        component="div"
        transitionName="page"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {React.cloneElement(props.children, {
          key: props.location.pathname,
        })}
      </TransitionGroup>
      <div style={spaceStyle} />
      <Footer />
    </StyleRoot>
  );
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default App;
