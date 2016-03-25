import React, { PropTypes } from 'react';
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
      {props.children}
      <div style={spaceStyle} />
      <Footer />
    </StyleRoot>
  );
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
