import React from 'react';
import routes from './app/routes';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import WrapperComponent from './app/helpers/WrapperComponent';

const history = browserHistory;
const dest = document.getElementById('root');

render((
  <WrapperComponent>
    <Router history={history} routes={routes} />
  </WrapperComponent>
), dest);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.'); // eslint-disable-line
  }
}

if (process.env.CLIENT) {
  render(
    <div>
      <Router history={history} routes={routes} />
    </div>,
    dest
  );
}
